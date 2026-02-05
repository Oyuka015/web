import langStore from "./lang-store.js";

class LpOrdersList extends HTMLElement {
  constructor() {
    super();
    this.orders = [];
    this.isOpen = false; // Поп-ап нээлттэй эсэхийг хянах
  }

  async connectedCallback() {
    await this.fetchOrders();
    this.render();
  }

  async fetchOrders() {
    try {
      const response = await fetch("http://localhost:3000/api/orders/my", {
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      this.orders = await response.json();
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      this.orders = []; 
    }
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
    this.render();
  }

  render() {
    const t = (key) => langStore.t(key);

    this.innerHTML = `
      <li class="menu-item" id="openOrdersBtn">
        <div class="menu-link">
          <article class="item-content">
            <span class="info-icon">
              <i class="ci-Shopping_Cart"></i>
            </span>
            <span class="menu-text">${t("myOrders") || "Миний захиалгууд"}</span>
            <i class="ci-Chevron_Right_MD arrow"></i>
          </article>
        </div>
      </li>

      <div class="modal-overlay ${this.isOpen ? 'active' : ''}">
        <div class="modal-content">
          <div class="modal-header">
            <h3>${t("myOrders") || "Миний захиалгууд"}</h3>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            ${this.orders.length === 0 
              ? `<p class="empty-msg">Танд одоогоор захиалга байхгүй байна.</p>`
              : this.renderOrders()}
          </div>
        </div>
      </div>

      <style>
        /* Account Menu-тэй ижил загвар */
        .menu-item { list-style: none; cursor: pointer; border-bottom: 1px solid var(--color-white-1); }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: none; justify-content: center;
          align-items: center; z-index: 1000; backdrop-filter: blur(5px);
        }
        .modal-overlay.active { display: flex; }
        .modal-content {
          background: white; width: 90%; max-width: 500px; max-height: 80vh;
          border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;
          animation: popIn 0.3s ease-out;
        }
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        
        .modal-header { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; }
        .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #888; }
        .modal-body { padding: 15px; overflow-y: auto; background: #f9f9f9; }

        /* Order Cards */
        .order-card { background: white; border-radius: 12px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .order-header { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
        .order-num { font-weight: bold; color: var(--color-orange); }
        .status { font-size: 10px; padding: 2px 6px; border-radius: 8px; text-transform: uppercase; background: #eee; }
        .status.pending { background: #fff3e0; color: #ef6c00; }
        .food-item { display: flex; align-items: center; gap: 10px; margin: 5px 0; }
        .food-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
        .food-name { margin: 0; font-size: 13px; font-weight: 600; }
        .food-meta { margin: 0; font-size: 11px; color: #666; }
      </style>
    `;

    // Event Listeners
    this.querySelector("#openOrdersBtn").addEventListener("click", () => this.toggleModal());
    this.querySelector(".close-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleModal();
    });
    this.querySelector(".modal-overlay").addEventListener("click", (e) => {
      if(e.target.classList.contains('modal-overlay')) this.toggleModal();
    });
  }

  renderOrders() {
    return this.orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-num">#${order.order_number.slice(0, 8)}</span>
          <span class="status ${order.status}">${order.status}</span>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="food-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="food-details">
                <p class="food-name">${item.name}</p>
                <p class="food-meta">${item.quantity} x ${item.price}₮</p>
              </div>
            </div>
          `).join("")}
        </div>
        <div style="display:flex; justify-content: space-between; margin-top:10px; font-size:12px;">
          <strong>${order.total_amount}₮</strong>
          <span style="color:#999">${new Date(order.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    `).join("");
  }
}

window.customElements.define("lp-orders-list", LpOrdersList);