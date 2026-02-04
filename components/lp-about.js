import langStore from "../components/lang-store.js";

class LpAbout extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.initMap();

    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.initMap();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = /*html */ `
      <lp-header></lp-header>
      
      <main class="about-page">
        <section class="hero-section">
          <article class="hero-content">
            <h1>LondonPOP pub&restaurant</h1>
            <p class="hero-subtitle">${t("aboutSubtitle")}</p>
            <a href="#/home" class="hero-cta">Нүүр хэсэгрүү очих</a>
          </article>
        </section>

        <section id="about-section" class="about-section">
          <article class="section-content">
            <header class="section-header">
              <i class="ci-Info_Circle"></i>
              <h2>${t("aboutUs")}</h2>
            </header>
            <p class="about-text">
              ${t("aboutDescription")}
            </p>
          </article>
        </section>


        <section class="contact-section">
          <header class="section-header">
            <i class="ci-Phone"></i>
            <h2>${t("contactUs")}</h2>
          </header>
          
          <article class="contact-grid">
            <article class="contact-item">
              <i class="ci-Location"></i>
              <h4>${t("address") || "Хаяг"}</h4>
              <p>Улаанбаатар хот, Чингэлтэй дүүрэг, 2-р хороо<br>WV8X+8MW, CHD - 2 khoroo, Ulaanbaatar 15172</p>
            </article>

            <article class="contact-item">
              <i class="ci-Phone"></i>
              <h4>${t("phone")}</h4>
              <a href="tel:+97680820094">+976 80820094</a><br>
              <a href="tel:+97660108758">+976 60108758</a>
            </article>

            <article class="contact-item">
              <i class="ci-Mail"></i>
              <h4>${t("email")}</h4>
              <a href="mailto:info@londonpop.mn">info@londonpop.mn</a><br>
              <a href="mailto:support@londonpop.mn">support@londonpop.mn</a>
            </article>

            <article class="contact-item">
              <i class="ci-Clock"></i>
              <h4>${t("workingHours") || "Ажлын цаг"}</h4>
              <p>Даваа - Баасан: 12:00 - 00:00<br>Бямба - Ням: 15:00 - 00:00</p>
            </article>
          </article>
        </section>

        <section class="location-section">
          <header class="section-header">
            <i class="ci-Map"></i>
            <h2>${t("ourLocation") || "Манай байршил"}</h2>
          </header>
          <article class="map-container" id="mapContainer">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5348.12177033163!2d106.89483761787417!3d47.915859367108155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693e1c540c879%3A0x153272514799313f!2sLondon%20pop!5e0!3m2!1sen!2smn!4v1770197132991!5m2!1sen!2smn"
              width="100%"
              height="100%"
              style="border:0; border-radius: 16px;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </article>
        </section>

        <section class="team-section">
          <header class="section-header">
            <i class="ci-Users"></i>
            <h2>${t("ourTeam")}</h2>
          </header>
          
          <article class="team-grid">
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/ceo.jpg" alt="${t("ceo")} Б. Баяржавхлан" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Баяржавхлан</h4>
              <p class="position">${t("ceo")}</p>
              <nav class="social-links">
                <a href="https://www.facebook.com/batsukh.bayarjavkhlan/" aria-label="Facebook profile of Б. Баяржавхлан">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/ceo.jpg" alt="${t("ceo")} Б. Анужин" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Анужин</h4>
              <p class="position">${t("ceo")}</p>
              <nav class="social-links">
                <a href="#" aria-label="Facebook profile of Б. Анужин">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn profile of Б. Анужин"><i class="ci-Brand_Linkedin"></i></a>
              </nav>
            </article>

            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/chef.jpg" alt="${t("headChef")} Б. Чимэг" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Чимэг</h4>
              <p class="position">${t("headChef")}</p>
              <nav class="social-links">
                <a href="#" aria-label="Facebook profile of Б. Чимэг">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>

            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/manager.jpg" alt="${t("manager")} Б.Анужин" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б.Анужин</h4>
              <p class="position">${t("manager")}</p>
              <nav class="social-links">
                <a href="#" aria-label="Facebook profile of Б.Анужин">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>

            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/marketing.jpg" alt="${t("marketing")} Б.Баяржавхлан" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б.Баяржавхлан</h4>
              <p class="position">${t("marketing")}</p>
              <nav class="social-links">
                <a href="#" aria-label="Facebook profile of Б.Баяржавхлан">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/marketing.jpg" alt="Software Engineer Б.Оюунбаяр" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б.Оюунбаяр</h4>
              <p class="position">Software Engineer</p>
              <nav class="social-links">
                <a href="#" aria-label="Facebook profile of Б.Оюунбаяр">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/ceo.jpg" alt="${t("ceo")} Б. Баяржавхлан" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Баяржавхлан</h4>
              <p class="position">Мужаан</p>
              <nav class="social-links">
                <a href="https://www.facebook.com/batsukh.bayarjavkhlan/" aria-label="Facebook profile of Б. Баяржавхлан">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/ceo.jpg" alt="${t("ceo")} Б. Баяржавхлан" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Анужин</h4>
              <p class="position">Цэвэрлэгч</p>
              <nav class="social-links">
                <a href="https://www.facebook.com/batsukh.bayarjavkhlan/" aria-label="Facebook profile of Б. Баяржавхлан">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
            <article class="team-member">
              <figure class="member-photo">
                <img loading="lazy" src="assets/img/team/ceo.jpg" alt="${t("ceo")} Б. Баяржавхлан" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Б. Баяржавхлан</h4>
              <p class="position">Хамгаалагч</p>
              <nav class="social-links">
                <a href="https://www.facebook.com/batsukh.bayarjavkhlan/" aria-label="Facebook profile of Б. Баяржавхлан">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                  </svg>
                </a>
              </nav>
            </article>
          </article>
        </section>

        <section class="partners-section">
          <header class="section-header">
            <i class="ci-Handshake"></i>
            <h2>${t("ourPartners")}</h2>
          </header>
          
          <article class="partners-grid">
            <article class="partner-card">
              <figure class="partner-logo">
                <img loading="lazy" src="assets/img/partners/partner1.png" alt="Khan Bank logo" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>APU</h4>
            </article>

            <article class="partner-card">
              <figure class="partner-logo">
                <img loading="lazy" src="assets/img/partners/partner2.png" alt="Mobicom logo" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Gem international</h4>
            </article>

            <article class="partner-card">
              <figure class="partner-logo">
                <img loading="lazy" src="assets/img/partners/partner3.png" alt="Unitel logo" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>MCS</h4>
            </article>

            <article class="partner-card">
              <figure class="partner-logo">
                <img loading="lazy" src="assets/img/partners/partner4.png" alt="Social Pay logo" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>Toki</h4>
            </article>

            <article class="partner-card">
              <figure class="partner-logo">
                <img loading="lazy" src="assets/img/partners/partner5.png" alt="Storepay logo" onerror="this.src='assets/img/image.png'">
              </figure>
              <h4>APU Holding</h4>
            </article>
            

           
        </section>

        <section class="stats-section">
          <article class="stats-grid">
            <article class="stat-item">
              <i class="ci-Users"></i>
              <h3>10,000+</h3>
              <p>${t("happyCustomers") || "Сэтгэл хангалуун үйлчлүүлэгч"}</p>
            </article>


            <article class="stat-item">
              <i class="ci-Calendar"></i>
              <h3>15+</h3>
              <p>${t("yearsExperience")}</p>
            </article>
          </article>
        </section>

      </main>

      <style>
        .about-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 0 6rem;
        }

        .hero-section {
        margin-top: 5rem;
        margin-bottom: 4rem;
        background-image: url("../assets/img/london-pop-hero.png");
        background-size: cover;  
        background-position: center;   
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        }

        .hero-section::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45); 
        }

        .hero-content {
        position: relative;
        color: #fff;
        text-align: center;
}


        .hero-section h1 {
          font-size: 52px;
          font-weight: 800;
          color: var(--color-white-0);
          margin: 0 0 16px;
          letter-spacing: 1.2px;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .hero-subtitle {
          font-size: 22px;
          color: var(--color-white-0);
          margin: 0 0 24px;
          opacity: 0.95;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: inline-block;
          background: var(--color-white-0);
          color: var(--color-orange);
          padding: 12px 32px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          background: var(--color-white-0_5);
        }

        /* Section Styles */
        .about-section,
        .contact-section,
        .location-section,
        .team-section,
        .partners-section,
        .stats-section {
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .about-section.visible,
        .contact-section.visible,
        .location-section.visible,
        .team-section.visible,
        .partners-section.visible,
        .stats-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .section-header i {
          font-size: 36px;
          color: var(--color-orange);
          background: rgba(var(--color-orange), 0.1);
          padding: 12px;
          border-radius: 50%;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: var(--color-dark-1);
          margin: 0;
          letter-spacing: 0.5px;
        }

        /* About Section */
        .section-content {
          background: var(--color-white-0);
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 24px var(--shadow-color);
        }

        .about-text {
          font-size: 17px;
          line-height: 1.8;
          color: var(--color-dark-2);
          margin: 0;
        }

        /* Mission & Vision */
        .mission-vision {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .mission-box,
        .vision-box {
          background: var(--color-white-0);
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 24px var(--shadow-color);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          position: relative;
          overflow: hidden;
        }

        .mission-box::before,
        .vision-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--color-orange), var(--color-orange-lighter));
          transform: scaleX(0);
          transition: transform 0.4s ease;
          transform-origin: left;
        }

        .mission-box:hover,
        .vision-box:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 40px var(--shadow-color);
        }

        .mission-box:hover::before,
        .vision-box:hover::before {
          transform: scaleX(1);
        }

        .mission-box i,
        .vision-box i {
          font-size: 52px;
          color: var(--color-orange);
          margin-bottom: 20px;
        }

        .mission-box h3,
        .vision-box h3 {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-dark-1);
          margin: 0 0 16px;
        }

        .mission-box p,
        .vision-box p {
          font-size: 16px;
          line-height: 1.7;
          color: var(--color-dark-4);
          margin: 0;
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }

        .contact-item {
          background: var(--color-white-0);
          padding: 32px;
          border-radius: 20px;
          box-shadow: 0 4px 24px var(--shadow-color);
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          text-align: center;
        }

        .contact-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px var(--shadow-color);
        }

        .contact-item i {
          font-size: 44px;
          color: var(--color-orange);
          margin-bottom: 16px;
        }

        .contact-item h4 {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-dark-1);
          margin: 0 0 12px;
        }

        .contact-item p,
        .contact-item a {
          font-size: 15px;
          line-height: 1.6;
          color: var(--color-dark-4);
          margin: 4px 0;
          text-decoration: none;
          display: block;
          transition: color 0.3s ease;
        }

        .contact-item a:hover {
          color: var(--color-orange);
        }

        /* Map */
        .map-container {
          width: 100%;
          height: 500px;
          background: var(--color-white-1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px var(--shadow-color);
          transition: box-shadow 0.3s ease;
        }

        .map-container:hover {
          box-shadow: 0 8px 32px var(--shadow-color);
        }

        /* Team Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
        }

        .team-member {
          background: var(--color-white-0);
          padding: 32px;
          border-radius: 24px;
          box-shadow: 0 4px 24px var(--shadow-color);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .team-member:hover {
          transform: translateY(-12px);
          box-shadow: 0 16px 40px var(--shadow-color);
        }

        .member-photo {
          width: 140px;
          height: 140px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid var(--color-orange);
          box-shadow: 0 8px 28px rgba(255, 128, 0, 0.3);
          transition: transform 0.3s ease;
        }

        .team-member:hover .member-photo {
          transform: scale(1.05);
        }

        .member-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .team-member:hover img {
          transform: scale(1.1);
        }

        .team-member h4 {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-dark-1);
          margin: 0 0 6px;
        }

        .position {
          font-size: 15px;
          color: var(--color-dark-4);
          margin: 0 0 20px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-white-0_5);
          border-radius: 50%;
          color: var(--color-orange);
          transition: all 0.3s ease;
          font-size: 20px;
        }

        .social-links a:hover {
          background: var(--color-orange);
          color: var(--color-white-0);
          transform: rotate(360deg) scale(1.15);
        }

        /* Partners Grid */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 28px;
        }

        .partner-card {
          background: var(--color-white-0);
          padding: 28px;
          border-radius: 20px;
          box-shadow: 0 4px 24px var(--shadow-color);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .partner-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px var(--shadow-color);
        }

        .partner-logo {
          width: 90px;
          height: 90px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-white-0_5);
          border-radius: 16px;
          padding: 16px;
          transition: background 0.3s ease;
        }

        .partner-card:hover .partner-logo {
          background: rgba(var(--color-orange), 0.1);
        }

        .partner-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(0.3);
          transition: filter 0.3s ease;
        }

        .partner-card:hover img {
          filter: grayscale(0);
        }

        .partner-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-dark-1);
          margin: 0;
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, var(--color-orange) 0%, var(--color-orange-darker) 100%);
          border-radius: 24px;
          padding: 56px 40px;
          box-shadow: 0 8px 32px rgba(255, 128, 0, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
        }

        .stat-item {
          text-align: center;
          color: var(--color-white-0);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: scale(1.05);
        }

        .stat-item i {
          font-size: 52px;
          margin-bottom: 16px;
          opacity: 0.95;
        }

        .stat-item h3 {
          font-size: 48px;
          font-weight: 800;
          margin: 0 0 12px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        .stat-item p {
          font-size: 16px;
          margin: 0;
          opacity: 0.95;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-section h1 {
            font-size: 44px;
          }

          .hero-subtitle {
            font-size: 20px;
          }

          .section-header h2 {
            font-size: 32px;
          }

          .mission-vision {
            gap: 24px;
          }

          .stats-grid {
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 64px 24px;
          }

          .hero-section h1 {
            font-size: 40px;
          }

          .hero-subtitle {
            font-size: 18px;
          }

          .section-header h2 {
            font-size: 28px;
          }

          .mission-vision {
            grid-template-columns: 1fr;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }

          .partners-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .map-container {
            height: 400px;
          }

          .section-content {
            padding: 32px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 48px 16px;
          }

          .hero-section h1 {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .section-header h2 {
            font-size: 24px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .map-container {
            height: 300px;
          }

          .team-member {
            padding: 24px;
          }

          .partner-card {
            padding: 20px;
          }
        }
      </style>
    `;

    // Add intersection observer for fade-in animations
    const sections = this.querySelectorAll('.about-section, .contact-section, .location-section, .team-section, .partners-section, .stats-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  initMap() {
    console.log("Map initialized");
  }
}

window.customElements.define("lp-about", LpAbout);
