import langStore from "../components/lang-store.js";
import "../components/lp-food.js";


class LpHome extends HTMLElement {
  constructor() {
    super();
    this.unsubscribe = null;
    
    this.foodItems = []; // servers awsan hoolnud hadgalah
    this.selectedCategory = "all";
    this.searchQuery = "";
    this.savedIds = new Set();
  }

  async connectedCallback() {
    this.render();
    this.loadCategories();

    await this.loadSavedFoods(); //hoolnoos omno saved medeh
    this.loadFoods();
    
    // delayed listener - unshjij duusaha
    setTimeout(() => { 
      this.setupSearchListener();
    }, 0);
  }

  render() {
    const t = (key) => langStore.t(key);
    this.innerHTML = /*html*/ `
      <style>
        main{ 
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px; 
          padding: 20px 16px 80px;
        }
      </style>
      <!-- home-header-component -->
      <lp-home-header></lp-home-header>

      <!-- search -->
      <lp-search></lp-search>

      <!-- ad turshilt-->
      <lp-ad></lp-ad>


      <!-- category-component -->
      <section class="cat-container">
        <h3>Ангилал</h3>
        <div class="cat"></div>
      </section>

      <!-- Food bugd -->
      <main>
        <!-- ogogdlin sangaas hoolnuud ...-->
      </main>
      
    `;
     

    
  }

  // saved load
  async loadSavedFoods() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch("http://localhost:3000/api/saved", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const json = await res.json();
    this.savedIds = new Set(json.data.map(f => f.id));
  }

  // -hoolnuud load hh
  async loadFoods() {
    try {
      const params = new URLSearchParams();
      if (this.selectedCategory && this.selectedCategory !== "all") {
        params.append("category", this.selectedCategory);
      }
      if (this.searchQuery) {
        params.append("search", this.searchQuery);
      }

      const res = await fetch(`http://localhost:3000/api/foods?${params.toString()}`);
      const foods = await res.json();

      const main = this.querySelector("main");
      main.innerHTML = "";

      foods.forEach(food => {
        const el = document.createElement("lp-food");

        el.setAttribute("image", food.image_url || food.image);
        el.setAttribute("name", food.name);
        el.setAttribute("price", food.price.toLocaleString('mn-MN'));
        el.setAttribute("rating", food.rating);
        el.setAttribute("description", food.description); 
        el.setAttribute("food-id", food.id); 

        el.setAttribute("mode", "card");

        if (this.savedIds.has(food.id)) {
          el.setAttribute("saved", "");
        }

        main.appendChild(el);
      });
    } catch (err) {
      console.error("Failed to load foods", err);
    }
  }

  // category load hiih
  async loadCategories() {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const categories = await res.json();

      const container = this.querySelector(".cat");
      container.innerHTML = "";

      // 
      const allEl = document.createElement("lp-category");
      allEl.setAttribute("name", "All");
      allEl.setAttribute("data-id", "all"); // энэ нь All category-г илэрхийлнэ
      allEl.className = "defCat selectedCat";
      allEl.addEventListener("click", () => {
        container.querySelectorAll("lp-category").forEach(c => c.classList.remove("selectedCat"));
        allEl.classList.add("selectedCat");
        this.selectedCategory = "all"; // All дээр дарахад
        this.loadFoods();
      });
      container.appendChild(allEl);
      // 

      categories.forEach((cat, index) => {
        const el = document.createElement("lp-category");
        el.setAttribute("name", cat.name);
        el.setAttribute("data-id", cat.id); // category id хадгалах
        // el.className = index === 0 ? "defCat selectedCat" : "defCat";
        el.className = "defCat";


        // click listener 
        el.addEventListener("click", () => {
          container.querySelectorAll("lp-category").forEach(c => c.classList.remove("selectedCat"));
          el.classList.add("selectedCat");

          this.selectedCategory = cat.id; // эсвэл cat.slug
          this.loadFoods();
        });

        container.appendChild(el);
      });

    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  } 

  setupSearchListener() {
    const searchComponent = this.querySelector('lp-search');
    if (!searchComponent) return;

    searchComponent.addEventListener('search-input', (e) => {
      this.searchQuery = e.detail.query.trim();
      this.loadFoods();
    });
  }

}

window.customElements.define("lp-home", LpHome);
