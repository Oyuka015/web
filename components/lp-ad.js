class LpAd extends HTMLElement {
  constructor() {
    super();
    this.current = 0;
    this.timer = null;
  }

  connectedCallback() {
    if (this.initialized) return;
    this.initialized = true;

    this.render();
    this.start();
  }

  disconnectedCallback() {
    clearInterval(this.timer);
    this.initialized = false;
  }

  render() {
    this.innerHTML = /*html*/`
      <style>
        .lp-ad-wrapper {
          width: 100%; 
          max-width: 1200px;
          margin: 20px auto 30px;
          padding: 0 12px;
          box-sizing: border-box;
        }
        .lp-ad {
          position: relative;
          width: 100%;
          height: 220px;     
          border-radius: 14px;
          overflow: hidden;
          background: #f3f3f3;
        }
        .lp-ad img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity .8s ease;
        }
        .lp-ad img.active {
          opacity: 1;
        }
        @media (max-width: 640px) {
          .lp-ad {
            height: 200px;
          }
        }
      </style>
      <div class="lp-ad-wrapper">
        <div class="lp-ad">
          <img src="/assets/img/advert.png" class="active" alt="banner-zurag">
          <img src="/assets/img/image.png" alt="banner-zurag">
        </div>
      </div>
    `;
    this.slides = this.querySelectorAll(".lp-ad img");
  }

  start() {
    if (this.slides.length <= 1) return;

    this.timer = setInterval(() => {
      this.slides[this.current].classList.remove("active");
      this.current = (this.current + 1) % this.slides.length;
      this.slides[this.current].classList.add("active");
    }, 5000);
  }
}

if (!customElements.get("lp-ad")) {
  customElements.define("lp-ad", LpAd);
}
