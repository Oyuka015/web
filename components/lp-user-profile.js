import langStore from "./lang-store.js";

class LpUserProfile extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.loadUserInfo();
    this.addEditListener();

    this.addEventListener("profile-updated", () => {
      this.loadUserInfo();
    });

    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.addEditListener();
      this.loadUserInfo();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = `
      <section class="user-info">
        <article class="profile">
          <img src="assets/img/image.png" alt="user-profile-picture" id="userAvatar">
          <p id="userName">User</p>
          <button class="edit-profile-btn" id="editProfileBtn">
            <i class="ci-Edit_02"></i>
            ${t("accEdit")}
          </button>
        </article> 
        <ul class="dash">
          <li id="orderCount">0 <span>${t("accOrders")}</span></li>
          <li id="savedCount">0 <span>${t("accSaved")}</span></li>
          <li id="voucherCount">0 <span>${t("accVouchers")}</span></li>
        </ul> 
      </section>

      <style>
        .user-info {
          margin-bottom: 28px;
        }

        .profile {
          text-align: center;
          padding: 32px 24px;
          background: linear-gradient(135deg, var(--color-white-0) 0%, var(--color-white-0_5) 100%);
          border-radius: 20px;
          box-shadow: 0 4px 20px var(--shadow-color);
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
          padding-left: 5rem;
        }

        .profile::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, var(--color-orange-lightest) 0%, transparent 70%);
          opacity: 0.1;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }

        .profile img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 16px;
          border: 4px solid var(--color-orange);
          box-shadow: 0 8px 24px rgba(255, 128, 0, 0.25);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .profile img:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(255, 128, 0, 0.35);
        }

        .profile p {
          font-size: 15px;
          font-weight: 100;
          color: var(--color-dark-1);
          margin: 0 0 4px 0;
          position: relative;
          z-index: 1;
          letter-spacing: 0.3px;
        }

        .edit-profile-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 24px;
          margin: 16px;
          border: 2px solid var(--color-orange);
          background: transparent;
          color: var(--color-orange);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 300;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .edit-profile-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, var(--color-orange), var(--color-orange-darker));
          transition: left 0.3s ease;
          z-index: -1;
        }

        .edit-profile-btn:hover::before {
          left: 0;
        }

        .edit-profile-btn:hover {
          color: var(--color-white-0);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 128, 0, 0.4);
          border-color: var(--color-orange-darker);
        }

        .edit-profile-btn:active {
          transform: translateY(0);
        }

        .edit-profile-btn i {
          font-size: 17px;
          transition: transform 0.3s ease;
        }

        .edit-profile-btn:hover i {
          transform: rotate(15deg);
        }

        .dash {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dash li {
          text-align: center;
          padding: 24px 16px;
          background: var(--color-white-0);
          border-radius: 16px;
          box-shadow: 0 2px 12px var(--shadow-color);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .dash li::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-orange), var(--color-orange-lighter));
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .dash li:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px var(--shadow-color);
        }

        .dash li:hover::before {
          transform: scaleX(1);
        }

        .dash li:nth-child(1) { animation: slideUp 0.4s ease-out 0.1s both; }
        .dash li:nth-child(2) { animation: slideUp 0.4s ease-out 0.2s both; }
        .dash li:nth-child(3) { animation: slideUp 0.4s ease-out 0.3s both; }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dash li::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 1px;
          background: linear-gradient(135deg, var(--color-orange-lightest), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dash li:hover::after {
          opacity: 1;
        }

        .dash li > *:first-child {
          font-size: 28px;
          font-weight: 600;
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
          display: block;
        }

        .dash li span {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-dark-4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .profile {
            padding: 28px 20px;
          }

          .profile img {
            width: 95px;
            height: 95px;
          }

          .profile p {
            font-size: 20px;
          }

          .edit-profile-btn {
            padding: 10px 20px;
            font-size: 13px;
          }

          .dash {
            gap: 12px;
          }

          .dash li {
            padding: 20px 12px;
          }

          .dash li > *:first-child {
            font-size: 24px;
          }

          .dash li span {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .dash {
            grid-template-columns: 1fr;
          }

          .dash li {
            padding: 18px;
          }
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
    if (nameEl) {
      nameEl.textContent =
        localStorage.getItem("userName") || langStore.t("accUser");
    }

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
      if (nameEl) {
        nameEl.textContent =
          localStorage.getItem("userName") || langStore.t("accUser");
      }
      alert(langStore.t("accServerError"));
    }
  }

  addEditListener() {
    const editBtn = this.querySelector("#editProfileBtn");
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent("edit-profile", {
            bubbles: true,
            composed: true,
          }),
        );
      });
    }
  }
}

window.customElements.define("lp-user-profile", LpUserProfile);
