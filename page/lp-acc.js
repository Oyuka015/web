import langStore from "../components/lang-store.js";

class LpAcc extends HTMLElement {
  constructor() {
    super();
    this.faqOpen = false;
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.loadUserInfo();
    this.addLogoutListener();
    this.addFaqListener();
    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.addLogoutListener();
      this.addFaqListener();
      this.loadUserInfo();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    const lang = langStore.getLang();
    this.innerHTML = `
      <lp-header></lp-header> 
      <section class="acc-main">
    
        <div class="user-info">
          <div class="profile">
            <img src="assets/img/image.png" alt="user-profile-picture" id="userAvatar">
            <p id="userName">User</p>
            <button>${t("accEdit")}</button>
          </div> 
          <ul class="dash">
            <li id="orderCount">0 <span>${t("accOrders")}</span></li>
            <li id="savedCount">0 <span>${t("accSaved")}</span></li>
            <li id="voucherCount">0 <span>${t("accVouchers")}</span></li>
          </ul> 
        </div>

        <section class="account-menu">
          <ul class="acc-info">
            <li class="language-item">
              <div class="item-content">
                <div class="info-icon">
                  <i class="ci-Globe"></i>
                </div>
                <div class="language-label">Language</div>
                <div class="lang-switcher">
                  <button type="button" class="lang-btn ${lang === "mn" ? "active" : ""}" data-lang="mn">MN</button>
                  <button type="button" class="lang-btn ${lang === "en" ? "active" : ""}" data-lang="en">EN</button>
                </div>
              </div>
            </li>


            <li class="dark-mode-item">
              <div class="item-content">
                <div class="info-icon">
                  <i class="ci-Moon"></i>
                </div>
                <div class="language-label">Dark mode</div>
                <button type="button" class="theme-toggle-btn" id="darkModeToggle" aria-label="Toggle dark mode">
                  <i class="${localStorage.getItem("theme") === "dark" ? "ci-Sun" : "ci-Moon"}"></i>
                </button>
              </div>
            </li>


            <li>
              <a href="#" class="menu-link">
                <div class="item-content">
                  <div class="info-icon">
                    <i class="ci-File_Blank"></i>
                  </div>
                  <div class="menu-text">${t("accMyOrders")}</div>
                  <i class="ci-Chevron_Right_MD arrow"></i>
                </div>
              </a>
            </li>

            <li>
              <a href="#" class="menu-link">
                <div class="item-content">
                  <div class="info-icon">
                    <i class="ci-Heart_01"></i>
                  </div>
                  <div class="menu-text">${t("accFavorites")}</div>
                  <i class="ci-Chevron_Right_MD arrow"></i>
                </div>
              </a>
            </li>

            <li>
              <a href="#" class="menu-link">
                <div class="item-content">
                  <div class="info-icon">
                    <i class="ci-Gift"></i>
                  </div>
                  <div class="menu-text">${t("accMyVouchers")}</div>
                  <i class="ci-Chevron_Right_MD arrow"></i>
                </div>
              </a>
            </li>

            <li class="faq-parent">
              <a href="#" class="menu-link toggle-faq" id="faqToggle">
                <div class="item-content">
                  <div class="info-icon">
                    <i class="ci-Square_Help"></i>
                  </div>
                  <div class="menu-text">${t("accFaq")}</div>
                  <i class="ci-Chevron_Right_MD arrow" id="faqChevron"></i>
                </div>
              </a>

              <div class="faq-dropdown" id="faqDropdown">
                <div class="faq-item">
                  <h4>${t("accFaq1Q")}</h4>
                  <p>${t("accFaq1A")}</p>
                </div>
                <div class="faq-item">
                  <h4>${t("accFaq2Q")}</h4>
                  <p>${t("accFaq2A")}</p>
                </div>
                <div class="faq-item">
                  <h4>${t("accFaq3Q")}</h4>
                  <p>${t("accFaq3A")}</p>
                </div>
                <div class="faq-item">
                  <h4>${t("accFaq4Q")}</h4>
                  <p>${t("accFaq4A")}</p>
                </div>
                <div class="faq-item">
                  <h4>${t("accFaq5Q")}</h4>
                  <p>${t("accFaq5A")}</p>
                </div>
              </div>
            </li>

            <li class="logout-item">
              <a href="#/logout" class="menu-link" id="logoutBtn">
                <div class="item-content">
                  <div class="info-icon">
                    <i class="ci-Log_Out"></i>
                  </div>
                  <div class="menu-text">${t("accLogout")}</div>
                </div>
              </a>
            </li>
          </ul>
        </section>


        <style>
         .account-menu {
          padding: 20px 0;
          max-width: 600px;
          margin: 0 auto;
        }
        .acc-info {
          list-style: none;
          margin: 0 0 5rem 0;
          padding: 0;
          background: var(--color-white-0);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }
        .acc-info > li {
          border-bottom: 1px solid var(--color-white-1);
          transition: background 0.2s ease;
        }
        .acc-info > li:last-child {
          border-bottom: none;
        }

        .acc-info > li:hover {
          background: var(--color-white-0_5);
        }

        .item-content {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          min-height: 56px;
        }

        .menu-link {
          display: block;
          color: var(--color-dark-1);
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }

        .menu-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: linear-gradient(
            90deg,
            var(--color-orange),
            var(--color-orange-darker)
          );
          transition: width 0.3s ease;
        }

        .menu-link:hover::before {
          width: 4px;
        }

        .menu-link:active {
          background: var(--color-white-1);
        }

        .info-icon {
          flex: 0 0 32px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: var(--color-orange);
          background: #f5f5ff;
          border-radius: 50%;
          padding: 15px;
          transition: all 0.2s ease;
        }


        .menu-text,
        .language-label {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          color: var(--color-dark-1);
        }

        .arrow {
          flex: 0 0 20px;
          font-size: 18px;
          color: var(--color-dark-5);
          transition: all 0.25s ease;
        }

        .menu-link:hover .arrow {
          color: var(--color-orange);
          transform: translateX(4px);
        }

        #faqChevron.open {
          transform: rotate(90deg);
          color: var(--color-orange);
        }

        .lang-switcher {
          display: flex;
          background: var(--color-white-1);
          border-radius: 10px;
          padding: 4px;
          gap: 4px;
        }

        .lang-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--color-dark-4);
          min-width: 50px;
        }

        .lang-btn:hover:not(.active) {
          background: var(--color-white-0);
          color: var(--color-dark-2);
        }

        .lang-btn.active {
          background: linear-gradient(
            135deg,
            var(--color-orange),
            var(--color-orange-darker)
          );
          box-shadow: 0 2px 8px rgba(255, 128, 0, 0.35);
          color: var(--color-white-0);
        }

        .faq-dropdown {
          background: var(--color-white-0_5);
          padding: 0;
          display: none;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .faq-dropdown[style*="display: block"] {
          padding: 16px 18px;
          max-height: 1000px;
        }

        .faq-item {
          padding: 14px 0;
          border-bottom: 1px solid var(--color-white-1);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-item h4 {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-dark-2);
        }

        .faq-item h4::before {
          content: '●';
          color: var(--color-orange);
          font-size: 10px;
          margin-right: 6px;
        }

        .faq-item p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.5;
          color: var(--color-dark-4);
          padding-left: 18px;
        }
        @media (max-width: 768px) {
          .item-content {
            padding: 14px 16px;
            gap: 12px;
          }

          .menu-text,
          .language-label {
            font-size: 14px;
          }

          .faq-item h4 {
            font-size: 13px;
          }

          .faq-item p {
            font-size: 12.5px;
          }
        }

        .menu-link:focus,
        .lang-btn:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: 2px;
        }

        .theme-toggle-btn {
          margin-left: auto;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: var(--color-white-1);
          color: var(--color-orange);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .theme-toggle-btn:hover {
          background: var(--color-white-2);
          color: var(--color-orange-darker);
        }
        .theme-toggle-btn:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: 2px;
        }

        </style>
      </section>
    `;

    this.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        langStore.setLanguage(btn.getAttribute("data-lang"));
      });
    });

    const darkModeBtn = this.querySelector("#darkModeToggle");
    if (darkModeBtn) {
      darkModeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleDarkMode();
        this.render();
      });
    }
  }

  async loadUserInfo() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const nameEl = this.querySelector("#userName");
    if (nameEl)
      nameEl.textContent =
        localStorage.getItem("userName") || langStore.t("accUser");

    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "false");
        window.location.hash = "#/login";
        return;
      }

      if (!res.ok) {
        const msg =
          (await res.json().catch(() => ({}))).error || "Сервер алдаатай";
        if (this.querySelector("#userName")) {
          this.querySelector("#userName").textContent =
            localStorage.getItem("userName") || langStore.t("accUser");
        }
        alert(langStore.t("accLoadError") + msg + langStore.t("accRetry"));
        return;
      }

      const user = await res.json();

      this.querySelector("#userName").textContent =
        user.name || langStore.t("accUser");
      this.querySelector("#orderCount").innerHTML =
        `${user.order_count ?? 0} <span>${langStore.t("accOrders")}</span>`;
      this.querySelector("#savedCount").innerHTML =
        `${user.saved_count ?? 0} <span>${langStore.t("accSaved")}</span>`;
      this.querySelector("#voucherCount").innerHTML =
        `${user.voucher_count ?? 0} <span>${langStore.t("accVouchers")}</span>`;

      if (user.avatar) {
        const avatarEl = this.querySelector("#userAvatar");
        if (avatarEl) avatarEl.src = user.avatar;
      }
    } catch (err) {
      console.error("Мэдээлэл авахад алдаа гарлаа:", err);
      if (nameEl)
        nameEl.textContent =
          localStorage.getItem("userName") || langStore.t("accUser");
      alert(langStore.t("accServerError"));
    }
  }

  addFaqListener() {
    const faqToggle = this.querySelector("#faqToggle");
    const faqDropdown = this.querySelector("#faqDropdown");
    const faqChevron = this.querySelector("#faqChevron");

    if (faqToggle && faqDropdown) {
      faqToggle.addEventListener("click", (e) => {
        e.preventDefault();
        this.faqOpen = !this.faqOpen;

        if (this.faqOpen) {
          faqDropdown.style.display = "block";
          faqChevron.classList.add("open");
        } else {
          faqDropdown.style.display = "none";
          faqChevron.classList.remove("open");
        }
      });
    }
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
const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light",
  );
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

window.customElements.define("lp-acc", LpAcc);
