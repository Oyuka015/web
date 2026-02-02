class CartStore {
  constructor() {
    this.items = [];
    this.listeners = [];
    this.init();
  }

  async init() {
    await this.loadFromServer();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.items));
  }

  async loadFromServer() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to load cart from server");

      const json = await res.json();
      this.items = json.data.map(item => ({
        id: item.food_id,
        title: item.name,
        price: item.price,
        image: item.image_url,
        quantity: item.quantity
      }));

      this.notify();
    } catch (e) {
      console.error(e);
    }
  }

  async addItem(item) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Login required");

      const res = await fetch(`http://localhost:3000/api/cart/${item.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to add item");

      await this.loadFromServer();
    } catch (e) {
      console.error(e);
    }
  }

  async removeItem(id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Login required");

      const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to remove item");

      await this.loadFromServer();
    } catch (e) {
      console.error(e);
    }
  }

  async updateQuantity(id, quantity) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Login required");

      const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantity })
      });
      if (!res.ok) throw new Error("Failed to update quantity");

      await this.loadFromServer();
    } catch (e) {
      console.error(e);
    }
  }

  getItems() {
    return [...this.items];
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

const cartStore = new CartStore();
export default cartStore;

