class LpThemeToggle extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addToggleListener();
  }

  render() {
    const isDark = localStorage.getItem("theme") === "dark";
    this.innerHTML = `
      <li class="dark-mode-item">
        <article class="item-content">
          <span class="info-icon">
            <i class="ci-Moon"></i>
          </span>
          <span class="theme-label">Dark mode</span>
          <button type="button" class="theme-toggle-btn" id="darkModeToggle" aria-label="Toggle dark mode">
            <i class="${isDark ? "ci-Sun" : "ci-Moon"}"></i>
          </button>
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
          background: linear-gradient(135deg, rgba(255, 128, 0, 0.1), rgba(255, 128, 0, 0.05));
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .theme-label {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-1);
          letter-spacing: 0.2px;
        }

        .theme-toggle-btn {
          margin-left: auto;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-white-1), var(--color-white-2));
          color: var(--color-orange);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .theme-toggle-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-orange-lighter), var(--color-orange));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .theme-toggle-btn i {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .theme-toggle-btn:hover {
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          color: var(--color-white-0);
          transform: scale(1.08) rotate(15deg);
          box-shadow: 0 4px 16px rgba(255, 128, 0, 0.4);
        }

        .theme-toggle-btn:hover::before {
          opacity: 1;
        }

        .theme-toggle-btn:hover i {
          transform: rotate(-15deg);
        }

        .theme-toggle-btn:active {
          transform: scale(0.95) rotate(0deg);
        }

        .theme-toggle-btn:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: 3px;
        }

        @media (max-width: 768px) {
          .item-content {
            padding: 16px 18px;
            gap: 14px;
            min-height: 60px;
          }

          .info-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .theme-label {
            font-size: 14px;
          }

          .theme-toggle-btn {
            width: 46px;
            height: 46px;
            font-size: 22px;
          }
        }
      </style>
    `;
  }

  addToggleListener() {
    const darkModeBtn = this.querySelector("#darkModeToggle");
    if (darkModeBtn) {
      darkModeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleDarkMode();
        this.render();
        this.addToggleListener();
      });
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light",
    );
  }
}

window.customElements.define("lp-theme-toggle", LpThemeToggle);
