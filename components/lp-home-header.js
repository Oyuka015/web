class LpHomeHeader extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML = `
            <section>
                <a href="#">
                    <i class="ci-Map_Pin"></i>
                    <p><span>Хаяг өөрчлөх</span> <br> БЗД, 3-р хороо, 2-р байр, 2-29тоот</p>
                </a>
                <button><i class="ci-Bell"></i></button>
            </section>
        `;
    }
    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('lp-home-header', LpHomeHeader);