import cartStore from "./cart-store.js";

const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");

class LpFood extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [
      "image",
      "title",
      "price",
      "rating",
      "ingredients",
      "size",
      "calories",
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute("image");
    const title = this.getAttribute("title")||"Food Item";
    const price = this.getAttribute("price") || "0.00";
    const rating = this.getAttribute("rating") || "0.0";
    const ingredients = this.getAttribute("ingredients") || "мэдээлэл байхгүй.";
    const size = this.getAttribute("size") || "1 хүн";
    const calories = this.getAttribute("calories") || "320ккал";
    const numericPrice = Number(price) || 0;
    const providedId =
      this.getAttribute("food-id") ||
      this.getAttribute("data-id") ||
      this.getAttribute("id");
    const itemId = (
      providedId ||`${slugify(title)}-${numericPrice}`
    ).toLowerCase();

    const css = /*css*/ `<style>
    @font-face {
      font-family: 'coolicons';
      src:
        url('../fonts/coolicons.ttf') format('truetype'),
        url('../fonts/coolicons.woff') format('woff'),
        url('../fonts/coolicons.svg') format('svg'); 
      font-weight: normal;
      font-style: normal;
      font-display: block;
    }

    i{
      font-family: 'coolicons' !important;
      speak: never;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .ci-Heart_01:before {
      content: "\\e9ea";
    }
    :host{
      display: block;
      border-radius: 20px;
      margin: 0 auto 20px auto;
      overflow: hidden;
      background: white;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08); 
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      cursor: pointer;
      max-width: 1000px;
    }
    :host(:hover) {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
    .card {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: 0; 
      height: 100%;
      width: 100%;
    }
    .image-container {
      position: relative;
      width: 180px; 
      flex-shrink: 0; 
      height: 5rem; 
      min-height: 180px; 
      transition: transform 0.4s ease;
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 20px 0 0 20px; 
    }
    :host(:hover) .image-container {
      transform: scale(1.05); 
    }
    .rating {
      position: absolute; /* absolute but when scroll up or down, it has to be follow the card size */
      top: 10px;
      left: 10px; 
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 4px 10px;
      border-radius: 5px;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      z-index: 10;
    }
    .content {
      padding: 18px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .title {
      font-size: 1.5em; 
      font-weight: 800;
      color: var(--text-color-default, #222);
      margin-bottom: 4px;
      line-height: 1.2;
    }
    .ingredients {
      font-size: 0.9em;
      color: var(--text-color-muted, #757575);
      margin-bottom: 12px;
      cursor: pointer;
    }
    .details {
      display: flex;
      gap: 15px;
      color: var(--text-color-muted, #9e9e9e);
      font-size: 0.85em;
      margin-bottom: 15px;
      font-weight: 500;
    }
    .actions {
      margin-top: auto; 
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .price {
      font-size: 1.8em; 
      font-weight: 900;
      color: var(--text-color-dark, #333);
    }
    .price-unit {
        font-size: 0.7em;
        font-weight: 600;
        margin-left: 2px;
    }
    .action-buttons {
        display: flex;
        gap: 10px;
        align-items: center;
    }
    .favorite {
      background: var(--color-white-2, #f5f5f5);
      border: none;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: var(--text-color-muted, #a0a0a0);
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
    .favorite.active {
      color: var(--color-orange-lighter, hsl(25, 100%, 60%));
    }
    .add-btn {
      background: var(--bg-color-accent, #ff7043);
      color: white;
      border: none;
      width: 44px; 
      height: 44px;
      border-radius: 50%;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px; 
      line-height: 1;
      flex-shrink: 0;
    }
    .add-btn.added {
      background: var(--color-orange-lighter, hsl(25, 100%, 60%));
    }
    @media (max-width: 600px) {
        .card {
            flex-direction: column;
        }
        .image-container {
            width: 100%;
            height: 180px;
            min-height: unset;
        }
        .image {
            border-radius: 20px 20px 0 0;
        }
        .content {
            padding: 15px; 
        }
        .rating {
            top: 10px;
            right: 10px;
            left: unset; 
        }
        .price {
            font-size: 1.5em;
        }
        .action-buttons {
            gap: 8px;
        }
    }
</style>`;
    const shortIngredients =
      ingredients.split(",").slice(0, 6).join(", ") +
      (ingredients.split(",").length > 6 ? " ..." : "");
    this.shadowRoot.innerHTML = /*html*/`
    ${css}
    <div class="card" role="group" aria-label="${title} Food item">
        <div class="image-container" aria-label="Food image">
            <img class="image" src="${image}" alt="${title}">
            <div class="rating">⭐${rating}</div>
        </div>
        <div class="content">
            <div class="title">${title}</div>
            <div class="ingredients" id="ingredients" title="${ingredients}">
                ${shortIngredients}
            </div>
            <div class="details">
                <div class="size">${size}</div>
                <div class="calories">${calories}</div>
            </div>
            
            <div class="actions" aria-label="Actions">
                <div class="price">${price}<span class="price-unit">₮</span></div>
                <div class="action-buttons">
                    <button class="favorite" aria-label="Add to favorites">
                        ♡ 
                    </button>
                    <button class="add-btn" aria-label="Add to cart">+</button>
                </div>
            </div>
        </div>
    </div>
`;
    this.shadowRoot.querySelector(".add-btn").addEventListener("click", () => {
      cartStore.addItem({
        id: itemId,
        title,
        price: numericPrice,
        image,
        quantity: 1,
      });

      this.dispatchEvent(
        new CustomEvent("cart:item-added", {
          bubbles: true,
          composed: true,
          detail: { id: itemId, title },
        })
      );

      this.shadowRoot.querySelector(".add-btn").classList.add("added");
    });

    const favBtn = this.shadowRoot.querySelector(".favorite");
    if (favBtn) {
      favBtn.addEventListener("click", () => {
        favBtn.classList.toggle("active");
        favBtn.textContent = favBtn.classList.contains("active") ? "♥" : "♡";
      });
    }

    const ing = this.shadowRoot.getElementById("ingredients");
    let expanded = false;

    ing.addEventListener("click", () => {
      expanded = !expanded;
      ing.textContent = expanded ? ingredients : shortIngredients;
    });
  }
}

customElements.define("lp-food", LpFood);