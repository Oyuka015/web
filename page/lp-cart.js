import cartStore from "../components/cart-store.js";

class LpCart extends HTMLElement {
  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    this.unsubscribe = cartStore.subscribe(items => {
      this.items = items;
      this.render();
    });

    this.items = cartStore.getItems();
    this.render();
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  render() {
    this.innerHTML =  /*html*/`
      <style>
        .cart-main{
          margin-top:80px;
          padding: 20px 16px 80px; 
        }
        .cart-summary {
          position: fixed;
          bottom: 80px;
          left: 0;
          right: 0;
          background: var(--color-whote-0);
          padding: 20px;
          box-shadow: 0 -4px 12px var(--color-white-3);
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
        /* empty state css */
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
      </style>
      <lp-header></lp-header>
      <section class="cart-main">
        ${
          this.items.length === 0
            ? `
              <lp-header></lp-header>
              <div class="empty-state">
                <i class="ci-Shopping_Bag_02"></i>
                <h3>hooson bn</h3>
                <p>ymr neg textt tttt</p>
                <a href="/">go to home page  </a>
              </div>
              `
            : this.items.map(item => `
                <lp-food
                  mode="row"
                  food-id="${item.id}"
                  image="${item.image}"
                  name="${item.title}"
                  price="${item.price}"
                  quantity="${item.quantity}"
                ></lp-food>
              `).join("")
        }
      </section>
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Нийт үнэ:</span>
          <span class="summary-total">${cartStore.getTotal()}₮</span>
        </div> 
        <button class="checkout-btn">checkoutbtn</button>
      </div>
    `;
  }
}

customElements.define("lp-cart", LpCart);
