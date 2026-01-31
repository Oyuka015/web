class LpRoute extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.path = this.getAttribute("path");
    this.component = this.getAttribute("component");
  }
}

customElements.define("lp-route", LpRoute);