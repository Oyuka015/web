const STORAGE_KEY = "lp-cart-items";

const listeners = new Set();
let memoryItems = [];

const safeJsonParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn("[cart-store] Failed to parse cart items:", error);
    return fallback;
  }
};

const canUseLocalStorage = () => {
  try {
    const testKey = "__lp-cart-test__";
    window.localStorage.setItem(testKey, "ok");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const storageAvailable = typeof window !== "undefined" && canUseLocalStorage();

const readItems = () => {
  if (!storageAvailable) {
    return memoryItems;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  const items = safeJsonParse(stored, []);

  if (!Array.isArray(items)) {
    return [];
  }

  return items;
};

const writeItems = (items) => {
  if (!Array.isArray(items)) {
    return;
  }

  memoryItems = items;

  if (storageAvailable) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn("[cart-store] Failed to persist cart items:", error);
    }
  }

  notify(items);
};

const cloneItems = (items) => {
  const safeItems = Array.isArray(items) ? items : [];
  if (typeof structuredClone === "function") {
    return structuredClone(safeItems);
  }

  return JSON.parse(JSON.stringify(safeItems));
};

const notify = (items) => {
  listeners.forEach((listener) => {
    try {
      listener(items);
    } catch (error) {
      console.error("[cart-store] Listener failed:", error);
    }
  });

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cart:change", {
        detail: { items: cloneItems(items) },
      })
    );
  }
};

const normalizeItem = (item) => {
  if (!item || !item.id) {
    throw new Error("Cart item must have an id");
  }

  return {
    id: item.id,
    title: item.title || "Тодорхойгүй хоол",
    price: Number(item.price) || 0,
    image: item.image || "",
    quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
  };
};

const cartStore = {
  getItems() {
    return readItems();
  },

  subscribe(callback) {
    if (typeof callback !== "function") {
      return () => {};
    }

    listeners.add(callback);
    callback(readItems());

    return () => {
      listeners.delete(callback);
    };
  },

  addItem(rawItem) {
    const item = normalizeItem(rawItem);
    const items = readItems();
    const existingIndex = items.findIndex((i) => i.id === item.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += item.quantity;
    } else {
      items.push(item);
    }

    writeItems(items);
  },

  updateQuantity(id, delta) {
    if (!id || !delta) {
      return;
    }

    const items = readItems();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return;
    }

    const nextQuantity = items[index].quantity + delta;

    if (nextQuantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = nextQuantity;
    }

    writeItems(items);
  },

  setQuantity(id, quantity) {
    if (!id) return;

    const items = readItems();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return;

    const safeQuantity = Number(quantity);

    if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = Math.floor(safeQuantity);
    }

    writeItems(items);
  },

  removeItem(id) {
    if (!id) return;

    const items = readItems().filter((item) => item.id !== id);
    writeItems(items);
  },

  clear() {
    writeItems([]);
  },

  getTotal() {
    return readItems().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
};

export default cartStore;

