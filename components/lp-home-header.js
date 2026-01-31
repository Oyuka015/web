import langStore from "./lang-store.js";

class LpHomeHeader extends HTMLElement {
  constructor() {
    super();
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = langStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = `
            <section>
                <a href="#">
                    <i class="ci-Map_Pin"></i>
                    <p><span>${t("homeChangeAddress")}</span> <br> ${t("homeAddressSample")}</p>
                </a>
                <button><i class="ci-Bell"></i></button>
            </section>
        `;
  }
  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }
}

window.customElements.define("lp-home-header", LpHomeHeader);
