import langStore from "./lang-store.js";

class LpFaqSection extends HTMLElement {
  constructor() {
    super();
    this.faqOpen = false;
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.addFaqListener();

    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.addFaqListener();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = /*html */ `
      <li class="faq-parent">
        <a href="#" class="menu-link toggle-faq" id="faqToggle">
          <article class="item-content">
            <span class="info-icon">
              <i class="ci-Square_Help"></i>
            </span>
            <span class="menu-text">${t("accFaq")}</span>
            <i class="ci-Chevron_Right_MD arrow" id="faqChevron"></i>
          </article>
        </a>

        <section class="faq-dropdown" id="faqDropdown">
          <article class="faq-item">
            <h4>${t("accFaq1Q")}</h4>
            <p>${t("accFaq1A")}</p>
          </article>
          <article class="faq-item">
            <h4>${t("accFaq2Q")}</h4>
            <p>${t("accFaq2A")}</p>
          </article>
          <article class="faq-item">
            <h4>${t("accFaq3Q")}</h4>
            <p>${t("accFaq3A")}</p>
          </article>
          <article class="faq-item">
            <h4>${t("accFaq4Q")}</h4>
            <p>${t("accFaq4A")}</p>
          </article>
          <article class="faq-item">
            <h4>${t("accFaq5Q")}</h4>
            <p>${t("accFaq5A")}</p>
          </article>
        </section>
      </li>

      <style>
        .faq-parent {
          border-bottom: 1px solid var(--color-white-1);
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

        .menu-link:hover .info-icon {
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          color: var(--color-white-0);
          transform: scale(1.05) rotate(-5deg);
          box-shadow: 0 4px 12px rgba(255, 128, 0, 0.3);
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
        }

        #faqChevron.open {
          transform: rotate(90deg);
          color: var(--color-orange);
        }

        .faq-dropdown {
          background: linear-gradient(135deg, var(--color-white-0_5) 0%, var(--color-white-0) 100%);
          padding: 0;
          display: none;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-top: 1px solid var(--color-white-1);
        }

        .faq-dropdown[style*="display: block"] {
          padding: 20px 20px 16px;
          max-height: 2000px;
        }

        .faq-item {
          padding: 18px 0;
          border-bottom: 1px solid var(--color-white-1);
          transition: all 0.3s ease;
          animation: fadeIn 0.4s ease-out both;
        }

        .faq-item:nth-child(1) { animation-delay: 0.05s; }
        .faq-item:nth-child(2) { animation-delay: 0.1s; }
        .faq-item:nth-child(3) { animation-delay: 0.15s; }
        .faq-item:nth-child(4) { animation-delay: 0.2s; }
        .faq-item:nth-child(5) { animation-delay: 0.25s; }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .faq-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .faq-item:hover {
          transform: translateX(4px);
        }

        .faq-item h4 {
          margin: 0 0 10px;
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark-1);
          letter-spacing: 0.2px;
          line-height: 1.5;
          display: flex;
          align-items: start;
          gap: 10px;
        }

        .faq-item h4::before {
          content: '';
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          background: linear-gradient(135deg, var(--color-orange), var(--color-orange-darker));
          border-radius: 50%;
          margin-top: 6px;
          box-shadow: 0 0 8px rgba(255, 128, 0, 0.4);
        }

        .faq-item p {
          margin: 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-dark-4);
          padding-left: 16px;
        }

        .menu-link:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: -2px;
          border-radius: 8px;
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

          .menu-text {
            font-size: 14px;
          }

          .arrow {
            font-size: 18px;
          }

          .faq-dropdown[style*="display: block"] {
            padding: 16px 18px 12px;
          }

          .faq-item {
            padding: 16px 0;
          }

          .faq-item h4 {
            font-size: 13px;
          }

          .faq-item p {
            font-size: 12.5px;
          }
        }
      </style>
    `;
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
}

window.customElements.define("lp-faq-section", LpFaqSection);
