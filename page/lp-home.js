import langStore from "../components/lang-store.js";

class LpHome extends HTMLElement {
  constructor() {
    super();
    this.unsubscribe = null;
    
    this.foodItems = []; // servers awsan hoolnud hadgalah
    this.selectedCategory = "all";
    this.searchQuery = "";
  }

  connectedCallback() {
    this.render();
    this.loadCategories();
    this.loadFoods();
    
    // delayed listener
    setTimeout(() => {
      // this.setupCategoryListeners();
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

      <!-- Food items -->
      <main>
        <!--
        
        <lp-food
          image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
          title="Margherita Pizza"
          price="29000"
          Ingredients="Улаан лооль, Моццарелла бяслаг, Базилик"
          size="2 хүн"
          rating="4.8"
        >
        </lp-food>
        <lp-food
          image="https://www.travelbuddies.info/wp-content/uploads/2020/02/tsuivan.jpg"
          title="Цуйван"
          price="18000"
          rating="4.8"
          ingredients="Үхрийн мах, Хайрсан гурил, Мөөг, Ногоон сонгино, сонгино, Грилл соус, лууван, чинжүү, +нууц амтлагч"
          size="1 хүн"
          calories="620 Ккал"
        >
        </lp-food>
        <lp-food
          image="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"
          title="Pepperoni Pizza"
          price="29000"
          rating="4.9"
        >
        </lp-food>
        <lp-food
          image="https://www.travelbuddies.info/wp-content/uploads/2020/02/tsuivan.jpg"
          title="BBQ Chicken Pizza"
          price="15000"
          rating="4.7"
        >
        </lp-food>
        <lp-food
          image="https://media.istockphoto.com/id/1409424028/photo/isolated-portion-of-grilled-beef-t-bone-steak.jpg?s=1024x1024&w=is&k=20&c=TWALJWSbFuDxxIBnNHnd__szEAujF8HhfaSWM6NRA94="
          title="T-Bone steak"
          price="35000"
          rating="4.6"
          ingredients="Үхрийн t-bone мах, Мөөг, Ногоон сонгино, сонгино, Грилл соус, лууван, чинжүү, +нууц амтлагч"
        >
        </lp-food>
        -->
      </main>
      
    `;
     

    
  }

  // -------- Food section --------
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
        el.setAttribute("title", food.name || food.title);
        el.setAttribute("price", food.price.toLocaleString('mn-MN'));
        el.setAttribute("rating", food.rating);
        el.setAttribute("description", food.description); 

        main.appendChild(el);
      });
    } catch (err) {
      console.error("Failed to load foods", err);
    }
  }

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

  // setupCategoryListeners() {
  //   const container = this.querySelector(".cat");
  //   container.querySelectorAll("lp-category").forEach(el => {
  //     el.addEventListener("click", () => {
  //       container.querySelectorAll("lp-category").forEach(c => c.classList.remove("selectedCat"));
  //       el.classList.add("selectedCat");

  //       this.selectedCategory = el.getAttribute("data-id") || el.getAttribute("name");
  //       this.loadFoods();
  //     });
  //   });
  // }

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
