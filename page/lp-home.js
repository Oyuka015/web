class LpHome extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <!-- home-header-component -->
      <lp-home-header></lp-home-header>

      <!-- search -->
      <lp-search></lp-search>

      <!-- ad turshilt-->
      <lp-ad></lp-ad>


      <!-- category-component -->
      <section class="cat-container">
        <h3>Ангилал</h3>
        <div class="cat">
          <lp-category class="selectedCat" name="Хоол"></lp-category>
          <lp-category class="defCat" name="Pizza"></lp-category>
          <lp-category class="defCat" name="Pizza"></lp-category>
          <lp-category class="defCat" name="Pizza"></lp-category>
          <lp-category class="defCat" name="Pizza"></lp-category>
        </div>
      </section>

      <!-- Food items -->
      <lp-food
        image="https://media.istockphoto.com/id/1409424028/photo/isolated-portion-of-grilled-beef-t-bone-steak.jpg?s=1024x1024&w=is&k=20&c=TWALJWSbFuDxxIBnNHnd__szEAujF8HhfaSWM6NRA94="
        title="T-Bone steak"
        price="35000"
        rating="4.6"
        ingredients="Үхрийн t-bone мах, Мөөг, Ногоон сонгино, сонгино, Грилл соус, лууван, чинжүү, +нууц амтлагч"
      >
      </lp-food>
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
    `;
  }
}

window.customElements.define("lp-home", LpHome);
