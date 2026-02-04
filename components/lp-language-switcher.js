import langStore from "./lang-store.js";

class LpLanguageSwitcher extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const lang = langStore.getLang();
    this.innerHTML = `
      <li class="language-item">
        <article class="item-content">
          <span class="info-icon">
            <i class="ci-Globe"></i>
          </span>
          <span class="language-label">Language</span>
          <nav class="lang-switcher">
            <button type="button" class="lang-btn ${lang === "mn" ? "active" : ""}" data-lang="mn">MN</button>
            <button type="button" class="lang-btn ${lang === "en" ? "active" : ""}" data-lang="en">EN</button>
          </nav>
        </article>
      </li>

      <style>
        .language-item {
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

        .language-label {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-1);
          letter-spacing: 0.2px;
        }

        .lang-switcher {
          display: flex;
          background: var(--color-white-1);
          border-radius: 12px;
          padding: 5px;
          gap: 6px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
        }

        .lang-btn {
          padding: 9px 18px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 700;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          color: var(--color-dark-4);
          min-width: 54px;
          letter-spacing: 0.5px;
          position: relative;
        }

        .lang-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lang-btn:hover:not(.active) {
          background: var(--color-white-0);
          color: var(--color-dark-2);
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .lang-btn.active {
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          box-shadow: 0 4px 12px rgba(255, 128, 0, 0.4);
          color: var(--color-white-0);
          transform: scale(1.05);
        }

        .lang-btn.active::before {
          opacity: 1;
        }

        .lang-btn:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: 2px;
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

          .language-label {
            font-size: 14px;
          }

          .lang-btn {
            padding: 8px 16px;
            font-size: 12px;
            min-width: 50px;
          }
        }
      </style>
    `;

    this.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        langStore.setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }
}

window.customElements.define("lp-language-switcher", LpLanguageSwitcher);
