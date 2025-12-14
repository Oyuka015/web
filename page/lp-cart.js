import cartStore from "../components/cart-store.js";

class LpCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribe = null;
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = cartStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const items = cartStore.getItems();
    const total = cartStore.getTotal();
    const itemCount = cartStore.getItemCount();

    const css = /*css*/ `
      <link rel="stylesheet" href="../css/coolicons.css">
      <style>
        :host {
          display: block;
          padding-bottom: 100px;
          padding-top: 70px;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 4px;
        }

        .cart-title {
          font-size: var(--font-size-title);
          font-weight: 700;
          color: var(--text-color-default);
        }

        .item-count {
          font-size: var(--font-size-default);
          color: var(--text-color-muted);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-color-muted);
        }

        .empty-state i {
          font-size: 60px;
          margin-bottom: 20px;
          display: block;
        }

        .empty-state h3 {
          font-size: var(--font-size-subtitle);
          margin-bottom: 10px;
          color: var(--text-color-default);
        }

        .empty-state p {
          font-size: var(--font-size-default);
          margin-bottom: 30px;
        }

        .empty-state a {
          display: inline-block;
          background: var(--bg-color-accent);
          color: white;
          padding: 12px 24px;
          border-radius: 15px;
          text-decoration: none;
          font-weight: 600;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 30px;
        }

        .cart-item {
          display: flex;
          gap: 12px;
          background: white;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .item-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .item-title {
          font-size: var(--font-size-subtitle);
          font-weight: 700;
          color: var(--text-color-default);
          margin: 0;
        }

        .item-price {
          font-size: var(--font-size-default);
          color: var(--text-color-accent);
          font-weight: 600;
        }

        .item-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--color-white-1);
          border-radius: 25px;
          padding: 4px 8px;
        }

        .qty-btn {
          background: none;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
          font-weight: 600;
          color: var(--text-color-default);
          transition: all 0.2s ease;
        }

        .qty-btn:hover {
          background: var(--color-white-2);
        }

        .qty-btn:active {
          transform: scale(0.95);
        }

        .quantity {
          font-size: var(--font-size-default);
          font-weight: 600;
          min-width: 24px;
          text-align: center;
        }

        .remove-btn {
          background: none;
          border: none;
          color: var(--text-color-muted);
          cursor: pointer;
          font-size: 20px;
          padding: 8px;
          transition: color 0.2s ease;
        }

        .remove-btn:hover {
          color: #e74c3c;
        }

        .cart-summary {
          position: fixed;
          bottom: 80px;
          left: 0;
          right: 0;
          background: white;
          padding: 20px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
          z-index: 999;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .summary-label {
          font-size: var(--font-size-default);
          color: var(--text-color-muted);
        }

        .summary-total {
          font-size: var(--font-size-big);
          font-weight: 800;
          color: var(--text-color-default);
        }

        .checkout-btn {
          width: 100%;
          background: var(--bg-color-accent);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 15px;
          font-size: var(--font-size-subtitle);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checkout-btn:hover {
          background: var(--color-orange-darker);
          transform: translateY(-2px);
        }

        .checkout-btn:active {
          transform: translateY(0);
        }

        .checkout-btn:disabled {
          background: var(--color-white-2);
          color: var(--text-color-muted);
          cursor: not-allowed;
        }
        
      </style>
    `;

    if (items.length === 0) {
      this.shadowRoot.innerHTML = /*html*/ `
        ${css}
        <lp-header></lp-header>
        <div class="cart-header">
          <h2 class="cart-title">Сагс</h2>
        </div>
        <div class="empty-state">
          <i class="ci-Shopping_Bag_02"></i>
          <h3>Сагс хоосон байна</h3>
          <p>Хоол нэмэхийн тулд нүүр хуудас руу буцна уу</p>
          <a href="#/">Хоол сонгох</a>
        </div>
      `;
      return;
    }

    const itemsHtml = items
      .map(
      (item) => /*html*/ `
      <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="item-image" />
      <div class="item-content">
        <h3 class="item-title">${item.title}</h3>
        <div class="item-price">${item.price}₮</div>
        <div class="item-controls">
        <div class="quantity-control">
          <button class="qty-btn" data-action="decrease" data-id="${
          item.id
          }">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-id="${
          item.id
          }">+</button>
        </div>
        <button class="remove-btn" data-action="remove" data-id="${
          item.id
        }" title="Устгах"><i class="ci-Trash_full"></i></button>
        </div>
      </div>
      </div>
    `
      )
      .join("");

    this.shadowRoot.innerHTML = /*html*/ `
      ${css}
      <lp-header></lp-header>
      <div class="cart-header">
        <h2 class="cart-title">Сагс</h2>
        <span class="item-count">${itemCount} бараа</span>
      </div>
      <div class="cart-items">
        ${itemsHtml}
      </div>
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Нийт дүн:</span>
          <span class="summary-total">${total.toLocaleString()}₮</span>
        </div> 
        <a href="#/payment">
          <button class="checkout-btn">Төлбөр төлөх</button>
        </a>
      </div>
    `;

    // Attach event listeners
    this.shadowRoot.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");
        const id = e.target.getAttribute("data-id");
        const item = items.find((i) => i.id === id);
        if (item) {
          if (action === "increase") {
            cartStore.updateQuantity(id, item.quantity + 1);
          } else if (action === "decrease") {
            cartStore.updateQuantity(id, item.quantity - 1);
          }
        }
      });
    });

    this.shadowRoot.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        cartStore.removeItem(id);
      });
    });

    const checkoutBtn = this.shadowRoot.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (items.length > 0) {
          // alert(`Төлбөр төлөх: ${total.toLocaleString()}₮\n\nБаталгаажуулах уу?`);
          // You can add actual checkout logic here
        }
      });
    }
  }
}

window.customElements.define("lp-cart", LpCart);
