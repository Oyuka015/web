import langStore from "./lang-store.js";

class LpHomeHeader extends HTMLElement {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = langStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    const lang = langStore.getLang();
    this.innerHTML = `
            <section>
                <a href="#">
                    <i class="ci-Map_Pin"></i>
                    <p><span>${t("homeChangeAddress")}</span> <br> ${t("homeAddressSample")}</p>
                </a>
                <div class="lang-switcher" style="display:flex;align-items:center;gap:6px;font-size:14px;font-weight:600;">
                    <button type="button" data-lang="mn" style="padding:6px 12px;border-radius:8px;cursor:pointer;border:1px solid #ccc;background:${lang === "mn" ? "var(--bg-color-accent,#ff6200)" : "transparent"};color:${lang === "mn" ? "white" : "inherit"}; border-color:${lang === "mn" ? "var(--bg-color-accent)" : "#ccc"};" class="lang-btn-mn">MN</button>
                    <button type="button" data-lang="en" style="padding:6px 12px;border-radius:8px;cursor:pointer;border:1px solid #ccc;background:${lang === "en" ? "var(--bg-color-accent,#ff6200)" : "transparent"};color:${lang === "en" ? "white" : "inherit"}; border-color:${lang === "en" ? "var(--bg-color-accent)" : "#ccc"};" class="lang-btn-en">EN</button>
                </div>
                <button><i class="ci-Bell"></i></button>
            </section>
        `;
    this.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        langStore.setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }
  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

window.customElements.define("lp-home-header", LpHomeHeader);
