class LpNav extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML = `
          <nav>
            <a href="home.html" class="active">
                <i class="ci-House_01"></i>
            </a>
            <a href="#">
                <i class="ci-Heart_01"></i> 
            </a>
            <a href="cart.html">
                <i class="ci-Shopping_Bag_02"></i>
            </a>
            <a href="#">
                <i class="ci-User_02"></i>
            </a> 
        </nav>
        `;
    }

    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('lp-nav', LpNav);