import cartStore from "./cart-store.js";

class LpCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener("click", this.handleClick);
    this.unsubscribe = cartStore.subscribe((items) => this.updateView(items));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.handleClick);
    if (typeof this.unsubscribe === "function") {
      this.unsubscribe();
    }
  }

  formatCurrency(amount) {
    const numeric = Number(amount) || 0;
    return `${numeric.toLocaleString("mn-MN")}₮`;
  }

  handleClick = (event) => {
    const action = event.target.getAttribute("data-action");

    if (!action) {
      return;
    }

    if (action === "clear") {
      cartStore.clear();
      return;
    }

    if (action === "checkout") {
      this.dispatchEvent(
        new CustomEvent("cart:checkout", {
          bubbles: true,
          composed: true,
          detail: { items: cartStore.getItems(), total: cartStore.getTotal() },
        })
      );
      return;
    }

    const itemElement = event.target.closest("[data-item-id]");
    const itemId = itemElement?.dataset.itemId;

    if (!itemId) {
      return;
    }

    switch (action) {
      case "increase":
        cartStore.updateQuantity(itemId, 1);
        break;
      case "decrease":
        cartStore.updateQuantity(itemId, -1);
        break;
      case "remove":
        cartStore.removeItem(itemId);
        break;
      default:
        break;
    }
  };

  render() {
    const css = /*css*/ `
      <style>
        :host {
          display: block;
          margin-top: 3rem;
          color: var(--text-color-default,rgb(220, 216, 216));
          font-family: var(--font-family-primary, "Inter", sans-serif);
        }

        .cart {
          background: var(--color-white-0, #fff);
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-title {
          margin: 0;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .cart-count {
          font-size: 0.95rem;
          color: var(--text-color-muted, #666);
        }

        .cart-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 12px;
          border-radius: 16px;
          background: var(--color-white-1, #f9f9f9);
        }

        .cart-item img {
          width: 72px;
          height: 72px;
          border-radius: 12px;
          object-fit: cover;
        }

        .item-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .item-title {
          font-weight: 600;
        }

        .item-meta {
          display: flex;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-color-muted, #666);
        }

        .quantity-controls {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          border-radius: 999px;
          padding: 4px 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .quantity-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: var(--bg-color-accent, #ff7a00);
          color: white;
          font-size: 18px;
          cursor: pointer;
        }

        .quantity {
          min-width: 20px;
          text-align: center;
          font-weight: 600;
        }

        .item-total {
          font-weight: 700;
          font-size: 1.05rem;
        }

        .remove-btn {
          border: none;
          background: transparent;
          color: #bbb;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 4px;
        }

        .remove-btn:hover {
          color: var(--danger-color, #ff5a5a);
        }

        .cart-empty {
          text-align: center;
          padding: 50px 20px;
          color: var(--text-color-muted, #777);
        }

        .cart-summary {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
        }

        .summary-total {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .primary-btn {
          border: none;
          border-radius: 16px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 600;
          background: var(--bg-color-accent, #ff7a00);
          color: white;
          cursor: pointer;
        }

        .primary-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .secondary-btn {
          border: none;
          background: transparent;
          color: var(--text-color-muted, #666);
          cursor: pointer;
          text-decoration: underline;
          font-size: 0.95rem;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = /*html*/ `
      ${css}
      <section class="cart">
        <header class="cart-header">
          <h2 class="cart-title">Таны сагс</h2>
          <span class="cart-count" data-cart-count>0 хоол</span>
        </header>

        <div class="cart-list" data-cart-list></div>

        <footer class="cart-summary">
          <div class="summary-row">
            <span>Нийт</span>
            <span class="summary-total" data-cart-total>0₮</span>
          </div>
          <button class="primary-btn" data-action="checkout" disabled>Төлбөр төлөх</button>
          <button class="secondary-btn" data-action="clear" disabled>Сагсыг хоослох</button>
        </footer>
      </section>
    `;

    this.listElement = this.shadowRoot.querySelector("[data-cart-list]");
    this.totalElement = this.shadowRoot.querySelector("[data-cart-total]");
    this.countElement = this.shadowRoot.querySelector("[data-cart-count]");
    this.checkoutButton = this.shadowRoot.querySelector('[data-action="checkout"]');
    this.clearButton = this.shadowRoot.querySelector('[data-action="clear"]');

    this.updateView(cartStore.getItems());
  }

  updateView(items) {
    if (!this.listElement) {
      return;
    }

    if (!items.length) {
      this.listElement.innerHTML = `
        <div class="cart-empty">
          <p>Таны сагс хоосон байна.</p>
          <p>Амттай хоолнуудаас сонгоод нэмээрэй 🍲</p>
        </div>
      `;
      this.totalElement.textContent = "0₮";
      this.countElement.textContent = "0 хоол";
      this.checkoutButton.disabled = true;
      this.clearButton.disabled = true;
      return;
    }

    const markup = items
      .map(
        (item) => `
        <article class="cart-item" data-item-id="${item.id}">
          <img src="${item.image}" alt="${item.title}">
          <div class="item-body">
            <div class="item-title">${item.title}</div>
            <div class="item-meta">
              <span>${this.formatCurrency(item.price)}</span>
              <span>× ${item.quantity}</span>
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease" aria-label="Хасах">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn" data-action="increase" aria-label="Нэмэх">+</button>
            </div>
          </div>
          <div class="item-total">${this.formatCurrency(
            item.price * item.quantity
          )}</div>
          <button class="remove-btn" data-action="remove" aria-label="Устгах">✕</button>
        </article>
      `
      )
      .join("");

    this.listElement.innerHTML = markup;
    this.totalElement.textContent = this.formatCurrency(cartStore.getTotal());
    this.countElement.textContent = `${items.length} хоол`;
    this.checkoutButton.disabled = false;
    this.clearButton.disabled = false;
  }
}

window.customElements.define("lp-cart", LpCart);