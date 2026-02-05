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

    this.innerHTML = /*html*/`
      <li class="faq-parent">
        <a href="#" class="menu-link" id="eventsToggle">
          <article class="item-content">
            <span class="info-icon">
              <i class="ci-Calendar"></i>
            </span>
            <span class="menu-text">${t("events") || "Events"}</span>
            <i class="ci-Chevron_Right_MD arrow" id="eventsChevron"></i>
          </article>
        </a>

        <section class="faq-dropdown" id="eventsDropdown">
        <article class="faq-item">
            <h4>Хувь хүн болон байгууллагатай хамтарч үйл ажиллагаа, баярын захиалга авч байна.</h4>
            <p>Та утсаар холбогдож захиалга өгнө үү. Утас 60108758 </p>
          </article>
          <article class="faq-item">
            <h4>HLTV IEM Krakow 2026 live дамжуулалт</h4>
            <p>Mongolz vs Furia 20:00</p>
          </article>

          <article class="faq-item">
            <h4>NBA Game Night</h4>
            <p>Watch live matches with friends</p>
          </article>

          <article class="faq-item">
            <h4>Sengur beer 3+1</h4>
            <p>Баасан гараг болгон</p>
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
