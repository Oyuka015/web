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
    const image =
      this.getAttribute("image") || "https://via.placeholder.com/400";
    const title = this.getAttribute("title") || "Food Item";
    const price = this.getAttribute("price") || "0.00";
    const rating = this.getAttribute("rating") || "0.0";
    const ingredients =
      this.getAttribute("ingredients") ||
      "орцийн мэдээлэл байхгүй байна.";
    const size = this.getAttribute("size") || "Хэмжээ: тодорхойгүй";
    const calories = this.getAttribute("calories") || "Калори: тодорхойгүй";

    const shortIngredients =
      ingredients.split(",").slice(0, 6).join(", ") +
      (ingredients.split(",").length > 6 ? " ..." : "");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border-radius: 20px;
          overflow: hidden;
          background: white;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        :host(:hover) {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .card {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 16px;
          height: 100%;
        }

        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          height: 130px;
          width: 160px;
          padding: 3rem 1rem;
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.4s ease;
          border-radius: 10px;
        }

        :host(:hover) .image {
          transform: scale(1.1);
        }

        .rating {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .content {
          padding: 16px 16px 16px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .title {
          font-size: var(--font-size-subtitle);
          font-weight: 700;
          color: var(--text-color-default);
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .ingredients {
          font-size: 13px;
          color: var(--text-color-muted);
          margin-bottom: 6px;
          cursor: pointer;
        }

        .ingredients:hover {
          text-decoration: underline;
        }

        .wow {
          display: flex;
          gap: 6px;
          color: var(--text-color-muted);
          font-size: 12px;
        }

        .price {
          font-size: var(--font-size-big);
          font-weight: 800;
          color: var(dark);
          margin: 10px 0 16px;
        }

        .actions {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
        }

        .add-btn {
          background: var(--bg-color-accent);
          color: white;
          border: none;
          padding: 14px 18px;
          border-radius: 50%;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
        }

        .add-btn:hover {
          background: var(--color-orange-darker);
          transform: translateY(-2px);
        }

        .favorite {
          background: none;
          border: 2px solid var(--color-white-2);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s ease;
        }

        .favorite:hover, .favorite.active {
          background: var(--color-orange-lightest);
          border-color: var(--bg-color-accent);
          color: var(--bg-color-accent);
        }
      </style>

      <div class="card" role="group" aria-label="Food item">
        <div class="image-container" aria-label="Food image">
          <img class="image" src="${image}" alt="${title}">
          <div class="rating">⭐ ${rating}</div>
        </div>
        <div class="content">
          <div class="title">${title}</div>
          <div class="ingredients" id="ingredients">${shortIngredients}</div>
          <div class="wow">
            <div class="size">${size}</div>
            <div class="calories">${calories}</div>
          </div>
          <div class="price">${price}₮</div>
          <div class="actions" aria-label="Actions">
            <button class="favorite" aria-label="Таалагдлаа">♡</button>
            <button class="add-btn">+</button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector(".add-btn").addEventListener("click", () => {
      alert(`"${title}" сагсанд нэмэгдлээ!`);
    });

    const favBtn = this.shadowRoot.querySelector(".favorite");
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
      favBtn.textContent = favBtn.classList.contains("active") ? "♥" : "♡";
    });

    const ing = this.shadowRoot.getElementById("ingredients");
    let expanded = false;

    ing.addEventListener("click", () => {
      expanded = !expanded;
      ing.textContent = expanded ? ingredients : shortIngredients;
    });
  }
}

customElements.define("lp-food", LpFood);
