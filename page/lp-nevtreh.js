import langStore from "../components/lang-store.js";

class LpNevtreh extends HTMLElement {
  constructor() {
    super();
    this.isLoginMode = true;
    this.apiUrl = "http://localhost:3000/api/auth";
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.langUnsubscribe = langStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.render();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = langStore.t("loginWait");

    try {
      const endpoint = this.isLoginMode ? "/login" : "/register";

      const body = this.isLoginMode
        ? { email: data.email, password: data.password }
        : {
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone || null,
            address: data.address || null,
          };

      const res = await fetch(`${this.apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Алдаа гарлаа");

      if (this.isLoginMode) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("isLoggedIn", "true");

        const redirectTo = localStorage.getItem("redirectAfterLogin") || "#/";
        localStorage.removeItem("redirectAfterLogin");

        alert(langStore.t("loginWelcome") + result.user.name + "!");
        window.location.hash = redirectTo;
      } else {
        alert(langStore.t("loginRegisterSuccess"));
        this.toggleMode();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = originalText;
    }
  }

  render() {
    this.innerHTML = `
    <style>
      :root {
        --primary: #ff6200;
        --primary-dark: #e55a00;
        --text-dark: #1f2937;
        --text-muted: #6b7280;
        --bg: #f8fafc;
        --border: #e2e8f0;
        --shadow-sm: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        --shadow-md: 0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        --radius: 12px;
      }
      .auth-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 140px);
        padding: 20px 16px;
        background: var(--bg);
      }
      .auth-card {
        width: 100%;
        max-width: 420px;
        padding: 2.5rem 2rem;
        background: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow-md);
        transition: transform 0.2s ease, box-shadow 0.25s ease;
      }
      .auth-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 35px -10px rgba(0,0,0,0.12);
      }
      .auth-header {
        text-align: center;
        margin-bottom: 2.25rem;
      }
      .auth-header h2 {
        color: var(--text-dark);
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0;
        letter-spacing: -0.4px;
      }
      .form-group {
        margin-bottom: 1.4rem;
      }
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
        font-size: 0.95rem;
        font-weight: 600;
      }
      .form-group input {
        width: 100%;
        padding: 0.9rem 1rem;
        font-size: 1rem;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        box-sizing: border-box;
        transition: all 0.2s ease;
        background: #ffffff;
      }
      .form-group input:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(255, 98, 0, 0.12);
      }
      .form-group input::placeholder {
        color: #a0aec0;
        opacity: 1;
      }
      .submit-btn {
        width: 100%;
        padding: 1rem;
        margin-top: 1.25rem;
        background: var(--primary);
        color: white;
        font-size: 1.05rem;
        font-weight: 600;
        border: none;
        border-radius: var(--radius);
        cursor: pointer;
        transition: all 0.22s ease;
      }
      .submit-btn:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
      }
      .submit-btn:active {
        transform: translateY(0);
      }
      .submit-btn:disabled {
        background: #cbd5e1;
        cursor: not-allowed;
        transform: none;
      }
      .switch-mode {
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.95rem;
        color: var(--text-muted);
      }
      .switch-mode button {
        background: none;
        border: none;
        color: var(--primary);
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        margin-left: 0.35rem;
        transition: color 0.2s ease;
      }

      .switch-mode button:hover {
        color: var(--primary-dark);
        text-decoration: underline;
      }

      @media (max-width: 480px) {
        .auth-card {
          padding: 2rem 1.5rem;
          box-shadow: var(--shadow-sm);
          border-radius: 0;
          min-height: 100vh;
        }

        .auth-header h2 {
          font-size: 1.55rem;
        }
      }
    </style>

    <section class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>${this.isLoginMode ? langStore.t("loginTitle") : langStore.t("registerTitle")}</h2>
        </div>

        <form id="authForm">
          ${
            !this.isLoginMode
              ? `
          <div class="form-group">
            <label>${langStore.t("loginFullName")}</label>
            <input type="text" name="name" placeholder="${langStore.t("loginNamePlaceholder")}" required autocomplete="name">
          </div>

          <div class="form-group">
            <label>${langStore.t("loginPhone")}</label>
            <input type="tel" name="phone" placeholder="+976 98765432"  title="дугаараа зөв, бүтэн оруулна уу">
          </div>

          <div class="form-group">
            <label>${langStore.t("loginAddress")}</label>
            <input type="text" name="address" placeholder="${langStore.t("loginAddressPlaceholder")}" required autocomplete="street-address">
          </div>
          `
              : ""
          }

          <div class="form-group">
            <label>${langStore.t("loginEmail")}</label>
            <input type="email" name="email" placeholder="email@example.com" required autocomplete="email">
          </div>

          <div class="form-group">
            <label>${langStore.t("loginPassword")}</label>
            <input type="password" name="password" minlength="6" placeholder="••••••••" required autocomplete="current-password">
          </div>

          <button type="submit" class="submit-btn">
            ${this.isLoginMode ? langStore.t("loginTitle") : langStore.t("registerTitle")}
          </button>
        </form>

        <div class="switch-mode">
          ${this.isLoginMode ? langStore.t("loginNoAccount") : langStore.t("loginHaveAccount")}
          <button type="button" id="toggleBtn">
            ${this.isLoginMode ? langStore.t("loginRegisterLink") : langStore.t("loginLoginLink")}
          </button>
        </div>
      </div>
  </section>

    `;

    this.querySelector("#authForm").onsubmit = (e) => this.handleSubmit(e);
    this.querySelector("#toggleBtn").onclick = () => this.toggleMode();
  }
}

window.customElements.define("lp-nevtreh", LpNevtreh);
