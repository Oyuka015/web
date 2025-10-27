class LpFood extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render(){
        // this.innerHTML=`
        //     <article class="food">
        //         <img src="" alt="food">
        //         <h3>London Steak</h3>
        //         <p>35000$</p>
        //         <button>+</button>
        //         <div class="rating"></div>
        //     </article>
        // `;
        const imgSrc = this.getAttribute('img') || 'default.jpg';
        const name = this.getAttribute('name') || 'Unknown Food';
        const price = this.getAttribute('price') || '0₮'; 

        this.innerHTML = `
        <article class="food">
            <img src="${imgSrc}" alt="${name}">
            <h3>${name}</h3>
            <p>${price}</p>
            <button class="nemeh">+</button>
            <button class="hasah">-</button>
            <div class="rating">⭐</div>
        </article>
        `;

        this.querySelector(`.nemeh`).addEventListener('click', () => {
            this.dispatchEvent(
              new CustomEvent("add-count", {
                detail: { name, price },
                bubbles: true,
              })
            );
        });
        this.querySelector(`.hasah`).addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('remove-count', {
                detail: {name, price},
                bubbles: true,
            
            }));
        });
    }
    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('lp-food', LpFood);