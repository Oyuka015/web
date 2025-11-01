class LpHeader extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        //implementation
        this.innerHTML = `
             
        `;
    }
    

}

window.customElements.define('lp-header', LpHeader);