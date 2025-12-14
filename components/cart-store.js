class CartStore {
  constructor() {
    this.items = this.loadFromStorage();
    this.listeners = [];
  }

  loadFromStorage() {
    try {
      const stored = localStorage.getItem("lp-cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem("lp-cart", JSON.stringify(this.items));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach((callback) => callback(this.items));
  }

  addItem(item) {
    const existingIndex = this.items.findIndex((i) => i.id === item.id);
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveToStorage();
    this.notify();
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToStorage();
    this.notify();
  }

  updateQuantity(id, quantity) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
        this.notify();
      }
    }
  }

  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.saveToStorage();
    this.notify();
  }

  getItems() {
    return [...this.items];
  }
}

const cartStore = new CartStore();
export default cartStore;

