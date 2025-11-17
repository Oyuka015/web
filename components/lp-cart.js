class LpCart extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    document.addEventListener("add-count", () => {
      let count = parseInt(this.getAttribute("count")) || 0;
      count += 1;
      this.setAttribute("count", count);
      this.render();
    });
    document.addEventListener("remove-count", () => {
      let count = parseInt(this.getAttribute("count")) || 0;
      if (count > 0) {
        count -= 1;
      }
      this.setAttribute("count", count);
      this.render();
    });
   
  }

  render() {
    const count = this.getAttribute("count") || "0";
    this.innerHTML = `
         <h2>Сагс :${count}</h2>
        `;
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {}

  adoptedCallback() {}
}

window.customElements.define("lp-cart", LpCart);
