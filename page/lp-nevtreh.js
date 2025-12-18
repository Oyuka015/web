class LpNevtreh extends HTMLElement {
  constructor() {
    super();
    this.isLoginMode = true;
  }

  connectedCallback() {
    this.render();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.render();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(`${this.isLoginMode ? "Login" : "Register"} Data:`, data);
    alert(`${this.isLoginMode ? "Нэвтрэх" : "Бүртгүүлэх"} хүсэлт илгээгдлээ!`);
  }

  render() {
    this.innerHTML = /*css */ `
        <style>
        .auth-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 150px); 
            padding: 20px;
        }

        .auth-card {
            background-color: var(--color-white-0);
            padding: 2.5rem 2rem;
            border-radius: 20px; 
            box-shadow: 0 15px 35px var(--shadow-color);
            width: 100%;
            max-width: 420px; 
            font-family: var(--font-family-nunito);
            transition: transform 0.3s ease;
        }

        @media (max-width: 480px) {
            .auth-card {
                padding: 1.5rem;
                box-shadow: none; 
                border: 1px solid var(--color-white-1_5);
            }
            
            .auth-header h2 {
                font-size: 24px;
            }
        }
        .auth-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .auth-header h2 {
            color: var(--text-color-accent);
            font-size: var(--font-size-title);
            font-weight: 800;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .form-group {
            margin-bottom: 1.25rem;
            position: relative;
        }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 700;
            color: var(--text-color-muted);
            margin-bottom: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-group input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid var(--color-white-1_5); /* Хүрээг тод болгов */
            border-radius: 12px;
            font-size: var(--font-size-default);
            box-sizing: border-box;
            transition: all 0.2s ease-in-out;
            background-color: var(--color-white-1);
        }
        .form-group input:focus {
            outline: none;
            border-color: var(--color-orange);
            background-color: var(--color-white-0);
            box-shadow: 0 0 0 4px rgba(255, 102, 0, 0.1);
        }
        .submit-btn {
            width: 100%;
            padding: 16px;
            background-color: var(--bg-color-accent);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            margin-top: 1rem;
            box-shadow: 0 4px 12px rgba(255, 102, 0, 0.2);
        }
        .submit-btn:hover {
            background-color: var(--color-orange-darker);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(255, 102, 0, 0.3);
        }
        .submit-btn:active {
            transform: translateY(0);
        }
        .switch-mode {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 14px;
            color: var(--text-color-muted);
            padding-top: 1rem;
            border-top: 1px solid var(--color-white-1_5);
        }
        .switch-mode span {
            color: var(--color-orange);
            cursor: pointer;
            font-weight: 700;
            margin-left: 5px;
            transition: color 0.2s;
        }
        .switch-mode span:hover {
            color: var(--color-orange-darkest);
            text-decoration: underline;
        }
    </style>

        <div class="auth-card">
            <div class="auth-header">
                <h2>${this.isLoginMode ? "Нэвтрэх" : "Бүртгүүлэх"}</h2>
            </div>
            
            <form id="authForm">
                ${
                  !this.isLoginMode
                    ? `
                <div class="form-group">
                    <label>Нэр</label>
                    <input type="text" name="username" placeholder="Таны нэр" required>
                </div>
                `
                    : ""
                }
                
                <div class="form-group">
                    <label>И-мэйл хаяг</label>
                    <input type="email" name="email" placeholder="email@example.com" required>
                </div>
                
                <div class="form-group">
                    <label>Нууц үг</label>
                    <input type="password" name="password" placeholder="********" required>
                </div>

                <button type="submit" class="submit-btn">
                    ${this.isLoginMode ? "Нэвтрэх" : "Бүртгүүлэх"}
                </button>
            </form>

            <div class="switch-mode">
                ${this.isLoginMode ? "Бүртгэлгүй юу?" : "Бүртгэлтэй юу?"} 
                <span id="toggleBtn">${
                  this.isLoginMode ? "Бүртгүүлэх" : "Нэвтрэх"
                }</span>
            </div>
        </div>
        `;

    this.querySelector("#authForm").addEventListener("submit", (e) =>
      this.handleSubmit(e)
    );
    this.querySelector("#toggleBtn").addEventListener("click", () =>
      this.toggleMode()
    );
  }

  disconnectedCallback() {
    console.log("LpNevtreh removed");
  }
}

window.customElements.define("lp-nevtreh", LpNevtreh);
