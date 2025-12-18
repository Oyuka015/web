class LpHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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
          </div>
        `;
    const backBtn = this.shadowRoot.querySelector(".left .back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        window.location.hash = "#/";
      });
    }
    this.updateTitle();
    window.addEventListener("hashchange", () => this.updateTitle());
  }

  updateTitle() {
    const path = window.location.hash.slice(1) || "/";
    let title = "";
    if (path === "/cart") title = "Сагс";
    else if (path === "/save") title = "Таалагдсан";
    else if (path === "/acc") title = "Хувийн мэдээлэл";
    this.shadowRoot.getElementById("page-title").textContent = title;
  }
}
customElements.define("lp-header", LpHeader);
