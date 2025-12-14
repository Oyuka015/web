class LpSave extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML = `
        
            <lp-header></lp-header> 
            
            <section class="save-main">
                <lp-food
                    image="https://media.istockphoto.com/id/1409424028/photo/isolated-portion-of-grilled-beef-t-bone-steak.jpg?s=1024x1024&w=is&k=20&c=TWALJWSbFuDxxIBnNHnd__szEAujF8HhfaSWM6NRA94="
                    title="T-Bone steak"
                    price="35000"
                    rating="4.6"
                    ingredients="Үхрийн t-bone мах, Мөөг, Ногоон сонгино, сонгино, Грилл соус, лууван, чинжүү, +нууц амтлагч"
                >
                </lp-food>
            </section>
            
        `; 
    }   

}

window.customElements.define('lp-save', LpSave);