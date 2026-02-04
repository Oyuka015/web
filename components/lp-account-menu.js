import langStore from "./lang-store.js";

class LpAccountMenu extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.addLogoutListener();

    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.addLogoutListener();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = /*html */ `
      <section class="account-menu">
        <ul class="acc-info">
          <lp-language-switcher></lp-language-switcher>
          <lp-theme-toggle></lp-theme-toggle>

          <li>
            <a href="#/orders" class="menu-link">
              <article class="item-content">
                <span class="info-icon">
                  <i class="ci-File_Blank"></i>
                </span>
                <span class="menu-text">${t("accMyOrders")}</span>
                <i class="ci-Chevron_Right_MD arrow"></i>
              </article>
            </a>
          </li>

          <li>
            <a href="#/save" class="menu-link">
              <article class="item-content">
                <span class="info-icon">
                  <i class="ci-Heart_01"></i>
                </span>
                <span class="menu-text">${t("accFavorites")}</span>
                <i class="ci-Chevron_Right_MD arrow"></i>
              </article>
            </a>
          </li>

          <li>
            <a href="#/vouchers" class="menu-link">
              <article class="item-content">
                <span class="info-icon">
                  <i class="ci-Gift"></i>
                </span>
                <span class="menu-text">${t("accMyVouchers")}</span>
                <i class="ci-Chevron_Right_MD arrow"></i>
              </article>
            </a>
          </li>

          <li>
            <a href="#/about" class="menu-link">
              <article class="item-content">
                <span class="info-icon">
                  <i class="ci-Users"></i>
                </span>
                <span class="menu-text">${t("aboutUs") || "Бидний тухай"}</span>
                <i class="ci-Chevron_Right_MD arrow"></i>
              </article>
            </a>
          </li>

          <lp-faq-section></lp-faq-section>

          <li class="logout-item">
            <a href="#/logout" class="menu-link" id="logoutBtn">
              <article class="item-content">
                <span class="info-icon">
                  <i class="ci-Log_Out"></i>
                </span>
                <span class="menu-text">${t("accLogout")}</span>
              </article>
            </a>
          </li>
        </ul>
      </section>

      <style>
        .account-menu {
          padding: 0;
          max-width: 600px;
          margin: 0 auto 6rem;
        }

        .acc-info {
          list-style: none;
          margin: 0;
          padding: 0;
          background: var(--color-white-0);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px var(--shadow-color);
          border: 1px solid var(--color-white-1);
        }

        .acc-info > li {
          border-bottom: 1px solid var(--color-white-1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .acc-info > li:last-child {
          border-bottom: none;
        }

        .acc-info > li:hover {
          background: linear-gradient(90deg, var(--color-white-0_5) 0%, var(--color-white-0) 100%);
        }

        .menu-link {
          display: block;
          color: var(--color-dark-1);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .menu-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: linear-gradient(180deg, var(--color-orange), var(--color-orange-darker));
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 8px 8px 0;
        }

        .menu-link:hover::before {
          width: 5px;
        }

        .menu-link:active {
          background: var(--color-white-1);
        }

        .item-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          min-height: 64px;
          position: relative;
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
          position: relative;
        }

        .info-icon::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          padding: 2px;
          background: linear-gradient(135deg, var(--color-orange-lighter), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .menu-link:hover .info-icon {
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          color: var(--color-white-0);
          transform: scale(1.05) rotate(-5deg);
          box-shadow: 0 4px 12px rgba(255, 128, 0, 0.3);
        }

        .menu-link:hover .info-icon::after {
          opacity: 1;
        }

        .menu-text {
          flex: 1;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-dark-1);
          letter-spacing: 0.2px;
          transition: color 0.3s ease;
        }

        .menu-link:hover .menu-text {
          color: var(--color-orange-darker);
        }

        .arrow {
          flex: 0 0 24px;
          font-size: 20px;
          color: var(--color-dark-5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-link:hover .arrow {
          color: var(--color-orange);
          transform: translateX(6px) scale(1.1);
        }

        .logout-item {
          background: linear-gradient(135deg, rgba(255, 0, 107, 0.03), transparent);
        }

        .logout-item:hover {
          background: linear-gradient(135deg, rgba(255, 0, 107, 0.08), transparent);
        }

        .logout-item .info-icon {
          background: linear-gradient(135deg, var(--color-warning-red), var(--color-warning-red-dark));
          color: var(--color-warning-red-darkest);
        }

        .logout-item .menu-link:hover .info-icon {
          background: var(--color-warning-red-darkest);
          color: var(--color-white-0);
        }

        .logout-item .menu-link:hover .menu-text {
          color: var(--color-warning-red-darkest);
        }

        .menu-link:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: -2px;
          border-radius: 8px;
        }

        /* Fade in animation */
        .acc-info > li {
          animation: fadeInUp 0.4s ease-out both;
        }

        .acc-info > li:nth-child(1) { animation-delay: 0.05s; }
        .acc-info > li:nth-child(2) { animation-delay: 0.1s; }
        .acc-info > li:nth-child(3) { animation-delay: 0.15s; }
        .acc-info > li:nth-child(4) { animation-delay: 0.2s; }
        .acc-info > li:nth-child(5) { animation-delay: 0.25s; }
        .acc-info > li:nth-child(6) { animation-delay: 0.3s; }
        .acc-info > li:nth-child(7) { animation-delay: 0.35s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .account-menu {
            margin-bottom: 5rem;
          }

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

          .menu-text {
            font-size: 14px;
          }

          .arrow {
            font-size: 18px;
          }
        }
      </style>
    `;
  }

  addLogoutListener() {
    const logoutBtn = this.querySelector("#logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        alert(langStore.t("accLogoutSuccess"));
        window.location.hash = "#/";
      });
    }
  }
}

window.customElements.define("lp-account-menu", LpAccountMenu);
