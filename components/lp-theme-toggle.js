class LpThemeToggle extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addListener();
  }

  render() {
    const isDark = localStorage.getItem("theme") === "dark";

    this.innerHTML = /*html*/ `
      <li class="dark-mode-item">
        <article class="item-content">
          <span class="info-icon">
            <i class="ci-Moon"></i>
          </span>

          <span class="theme-label">Dark mode</span>

          <nav class="theme-switcher">
            <button
              type="button"
              class="theme-btn ${!isDark ? "active" : ""}"
              data-theme="light"
              aria-label="Light mode"
            >
              <i class="ci-Sun"></i>
            </button>

            <button
              type="button"
              class="theme-btn ${isDark ? "active" : ""}"
              data-theme="dark"
              aria-label="Dark mode"
            >
              <i class="ci-Moon"></i>
            </button>
          </nav>
        </article>
      </li>

      <style>
        .dark-mode-item {
          border-bottom: 1px solid var(--color-white-1);
        }

        .item-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          min-height: 64px;
        }

        .info-icon {
          flex: 0 0 44px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--color-orange);
          background: linear-gradient(
            135deg,
            rgba(255, 128, 0, 0.1),
            rgba(255, 128, 0, 0.05)
          );
          border-radius: 12px;
        }

        .theme-label {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-1);
        }

        .theme-switcher {
          display: flex;
          background: var(--color-white-1);
          border-radius: 12px;
          padding: 5px;
          gap: 6px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
        }

        .theme-btn {
          padding: 10px 18px;
          border: none;
          background: transparent;
          font-size: 15px;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--color-dark-4);
          min-width: 54px;
          position: relative;
        }

        .theme-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9px;
          background: linear-gradient(
            135deg,
            var(--color-orange),
            var(--color-orange-darker)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .theme-btn i {
          position: relative;
          z-index: 1;
        }

        .theme-btn:hover:not(.active) {
          background: var(--color-white-0);
          color: var(--color-dark-2);
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .theme-btn.active {
          background: linear-gradient(
            135deg,
            var(--color-orange),
            var(--color-orange-darker)
          );
          box-shadow: 0 4px 12px rgba(255, 128, 0, 0.4);
          color: var(--color-white-0);
          transform: scale(1.05);
        }

        .theme-btn.active::before {
          opacity: 1;
        }
      </style>
    `;
  }

  addListener() {
    this.querySelectorAll("[data-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;

        document.body.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);

        this.render();
        this.addListener();
      });
    });
  }
}

customElements.define("lp-theme-toggle", LpThemeToggle);
