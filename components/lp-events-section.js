import langStore from "./lang-store.js";

class LpEventsSection extends HTMLElement {
  constructor() {
    super();
    this.open = false;
  }

  connectedCallback() {
    this.render();
    this.addListener();
  }

  render() {
    const t = (key) => langStore.t(key);

    this.innerHTML = /*html*/ `
    <li class="faq-parent">
      <a href="#" class="menu-link" id="eventsToggle">
        <article class="item-content">
          <span class="info-icon">
            <i class="ci-Calendar"></i>
          </span>
          <span class="menu-text">${t("events")}</span>
          <i class="ci-Chevron_Right_MD arrow" id="eventsChevron"></i>
        </article>
      </a>

      <section class="faq-dropdown" id="eventsDropdown">
        <article class="faq-item">
          <h4>${t("eventPrivateTitle")}</h4>
          <p>${t("eventPrivateDesc")}</p>
        </article>

        <article class="faq-item">
          <h4>${t("eventCsgoTitle")}</h4>
          <p>${t("eventCsgoDesc")}</p>
        </article>

        <article class="faq-item">
          <h4>${t("eventNbaTitle")}</h4>
          <p>${t("eventNbaDesc")}</p>
        </article>

        <article class="faq-item">
          <h4>${t("eventBeerTitle")}</h4>
          <p>${t("eventBeerDesc")}</p>
        </article>
      </section>
    </li>
  `;
  }

  addListener() {
    const toggle = this.querySelector("#eventsToggle");
    const dropdown = this.querySelector("#eventsDropdown");
    const chevron = this.querySelector("#eventsChevron");

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.open = !this.open;

      if (this.open) {
        dropdown.style.display = "block";
        chevron.classList.add("open");
      } else {
        dropdown.style.display = "none";
        chevron.classList.remove("open");
      }
    });
  }
}

customElements.define("lp-events-section", LpEventsSection);
