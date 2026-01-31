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

                <ul class="acc-info">
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-File_Blank"></i>
                        </div>
                        <p>${t("accMyOrders")}</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-Heart_01"></i>
                        </div>
                        <p>${t("accFavorites")}</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-Gift"></i>
                        </div>
                        <p>${t("accMyVouchers")}</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                </ul> 
 
                <ul class="help-info">
                    <li>
                        <a href="#" id="faqToggle">
                            <div class="info-icon">
                                <i class="ci-Square_Help"></i>
                            </div>
                            <p>${t("accFaq")}</p>
                            <span><i class="ci-Chevron_Right_MD" id="faqChevron"></i></span>
                        </a>
                        <div class="faq-dropdown" id="faqDropdown" style="display: none;">
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
                </ul> 
                <ul class="logout-info">
                    <li><a href="#/logout" id="logoutBtn">
                        <div class="info-icon">
                            <i class="ci-Square_Help"></i>
                        </div>
                        <p>${t("accLogout")}</p>
                    </a></li>
                </ul> 
            </section>
            
            <style>
                .faq-dropdown {
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    margin-top: 10px;
                    transition: all 0.3s ease;
                }
                
                .faq-item {
                    padding: 12px 0;
                    border-bottom: 1px solid #e0e0e0;
                }
                
                .faq-item:last-child {
                    border-bottom: none;
                }
                
                .faq-item h4 {
                    margin: 0 0 8px 0;
                    color: #333;
                    font-size: 14px;
                    font-weight: 600;
                }
                
                .faq-item p {
                    margin: 0;
                    color: #666;
                    font-size: 13px;
                    line-height: 1.5;
                }
                
                #faqChevron {
                    transition: transform 0.3s ease;
                }
                
                #faqChevron.open {
                    transform: rotate(90deg);
                }
            </style>
        `;
  }

  async loadUserInfo() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.hash = "#/login";
      return;
    }

    const nameEl = this.querySelector("#userName");
    if (nameEl)
      nameEl.textContent = localStorage.getItem("userName") || langStore.t("accUser");

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

      this.querySelector("#userName").textContent = user.name || langStore.t("accUser");
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
        nameEl.textContent = localStorage.getItem("userName") || langStore.t("accUser");
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

window.customElements.define("lp-acc", LpAcc);
