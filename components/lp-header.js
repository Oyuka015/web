class LpHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              height: 70px;
              background: var(--color-white-0);
              box-shadow: 0 4px 12px rgba(0,0,0,0.08);
              z-index: 1000;
              display: flex;
              align-items: center;
              padding: 0 20px;
              font-size: var(--font-size-default);
            }

            .header-content {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              max-width: 1200px;
              margin: 0 auto;
            }

            .left, .right {
              display: flex;
              align-items: center;
              gap: 20px;
            }

            .back-btn, .icon-btn {
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
              color: var(--text-color-default);
              position: relative;
              transition: all 0.2s ease;
            }

            .back-btn:hover, .icon-btn:hover {
              color: var(--bg-color-accent);
              transform: scale(1.1);
            }

            .icon-btn {
              position: relative;
            }

            .badge {
              position: absolute;
              top: -8px;
              right: -8px;
              background: var(--bg-color-accent);
              color: white;
              font-size: 10px;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
            }

            .logo {
              font-size: var(--font-size-title);
              font-weight: 700;
              color: var(--text-color-accent);
              letter-spacing: -1px;
            }
          </style>

          <div class="header-content">
            <div class="left">
              <button class="back-btn">←</button>
              <div class="logo">London Pop</div>
            </div>
            <div class="right">
              <button class="icon-btn" id="notification">
                🔔
              </button>
            </div>
          </div>
        `;

    this.shadowRoot
      .querySelector("#notification")
      .addEventListener("click", () => {
        alert("Танд 3 шинэ мэдэгдэл ирсэн!");
      });

    this.shadowRoot.querySelector(".back-btn").addEventListener("click", () => {
      history.back();
    });
  }
}
customElements.define("lp-header", LpHeader);

