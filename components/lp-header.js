import langStore from "./lang-store.js";

class LpHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = langStore.subscribe(() => this.render());
    const backBtn = this.shadowRoot.querySelector(".left .back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.hash = "#/";
      });
    }
    window.addEventListener("hashchange", () => this.updateTitle());
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
    window.removeEventListener("hashchange", () => this.updateTitle());
  }

  render() {
    const t = (key) => langStore.t(key);
    const lang = langStore.getLang();
    const css = /*css*/ `
      <link rel="stylesheet" href="../css/coolicons.css">
      <style>
            :host {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 70px;
              background: var(--color-white-transparent);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
              display: flex;
              align-items: center;
              padding: 0 20px;
              z-index: 1000;
            }
            .header-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
            }
            .left {
              display: flex;
              align-items: center;
              gap: 20px;
              font-size: 37px;
              position: relative;
              transition: all 0.2s ease;
              cursor: pointer;
              color: var(--text-color-default);
            }
            .left:hover {
              color: var(--bg-color-accent);
              transform: scale(1.1);
            }
            .lang-switcher {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 14px;
              font-weight: 600;
            }
            .lang-switcher button {
              background: none;
              border: 1px solid var(--text-color-muted, #999);
              padding: 6px 12px;
              border-radius: 8px;
              cursor: pointer;
              color: var(--text-color-default);
              transition: all 0.2s;
            }
            .lang-switcher button.active {
              background: var(--bg-color-accent);
              border-color: var(--bg-color-accent);
              color: white;
            }
            .lang-switcher button:hover:not(.active) {
              border-color: var(--bg-color-accent);
              color: var(--bg-color-accent);
            }
          </style>`;
    this.shadowRoot.innerHTML = /*html*/ `
          ${css}
          <div class="header-content">
            <div class="left">
              <a class="back-btn">
                <i class="ci-Chevron_Left_MD"></i>
              </a>
            </div>
            <h3 id="page-title"></h3>
            <div class="lang-switcher">
              <button type="button" data-lang="mn" class="${lang === "mn" ? "active" : ""}">MN</button>
              <button type="button" data-lang="en" class="${lang === "en" ? "active" : ""}">EN</button>
            </div>
          </div>
        `;
    this.shadowRoot.querySelectorAll(".lang-switcher button").forEach((btn) => {
      btn.addEventListener("click", () => {
        langStore.setLanguage(btn.getAttribute("data-lang"));
      });
    });
    this.updateTitle();
  }

  updateTitle() {
    const path = window.location.hash.slice(1) || "/";
    let title = "";
    if (path === "/cart") title = langStore.t("headerCart");
    else if (path === "/save") title = langStore.t("headerSave");
    else if (path === "/acc") title = langStore.t("headerProfile");
    const el = this.shadowRoot.getElementById("page-title");
    if (el) el.textContent = title;
  }
}
customElements.define("lp-header", LpHeader);
