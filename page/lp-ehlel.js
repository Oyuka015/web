class LpEhlel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupNavigation();
  }

  setupNavigation() {
    const ctaButton = this.querySelector(".cta-button");
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        window.location.hash = "#/home";
      });
    }
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }
        body{
          margin: 0;
          padding: 0;
        }
        .hero-container {
          position: relative;
          width: 100vw;
          height: 100vh;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('assets/img/london-pop-hero.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          animation: zoomIn 20s ease-in-out infinite alternate;
        }

        .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 2rem;
          max-width: 90%;
          animation: fadeInUp 1s ease-out;
        }

        .logo-text {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          color: var(--color-white-0);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
          text-shadow: 
            0 0 20px rgba(255, 165, 0, 0.5),
            0 0 40px rgba(255, 165, 0, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.5);
          font-family: var(--font-family-orbitron);
          animation: glow 2s ease-in-out infinite alternate;
        }

        .tagline {
          font-size: clamp(1rem, 2.5vw, 1.5rem);
          color: var(--color-white-0);
          margin-bottom: 3rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          opacity: 0.95;
        }

        .cta-button {
          background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-darker) 100%);
          color: var(--color-white-0);
          border: none;
          padding: 1.2rem 3rem;
          font-size: clamp(1rem, 2vw, 1.2rem);
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 
            0 8px 20px rgba(255, 165, 0, 0.4),
            0 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 
            0 12px 30px rgba(255, 165, 0, 0.6),
            0 6px 15px rgba(0, 0, 0, 0.4);
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:active {
          transform: translateY(-1px);
        }

        @keyframes zoomIn {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          from {
            text-shadow: 
              0 0 20px rgba(255, 165, 0, 0.5),
              0 0 40px rgba(255, 165, 0, 0.3),
              0 4px 8px rgba(0, 0, 0, 0.5);
          }
          to {
            text-shadow: 
              0 0 30px rgba(255, 165, 0, 0.8),
              0 0 60px rgba(255, 165, 0, 0.5),
              0 4px 8px rgba(0, 0, 0, 0.5);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 165, 0, 0.1);
          z-index: 2;
          animation: float 6s ease-in-out infinite;
        }

        .circle-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 150px;
          height: 150px;
          bottom: 15%;
          right: 15%;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.5;
          }
        }
        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
          }

          .logo-text {
            margin-bottom: 0.5rem;
          }

          .tagline {
            margin-bottom: 2rem;
            font-size: 1rem;
          }

          .cta-button {
            padding: 1rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 1rem;
          }

          .cta-button {
            padding: 0.9rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      </style>

      <section class="hero-container">
        <div class="hero-background"></div>
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
        
        <div class="hero-content">
          <h1 class="logo-text">London Pop</h1>
          <p class="tagline">Тавтай морилно уу • Welcome • Добро пожаловать</p>
          <button class="cta-button">Эхлэх</button>
        </div>
      </section>
    `;
  }
}

window.customElements.define("lp-ehlel", LpEhlel);
