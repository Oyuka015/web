class LpCategory extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    render(){
        const name = this.getAttribute('name') || 'null'; 
        this.innerHTML = `
            <style>
                .selectedCat{
                    font-size: 20px; 
                    background: var(--color-orange-lighter); 
                    padding: 15px 30px; 
                    border-radius: 10px; 
                    color: var(--color-white-0);
                }
                .defCat{
                    font-size: 20px; 
                    background: var(--color-white-1); 
                    padding: 15px 30px; 
                    border-radius: 10px; 
                    color: var(--text-color-default);
                }
            </style>
            <div>${name}</div>
        `;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('lp-category', LpCategory);