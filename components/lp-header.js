class LpHeader extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        //implementation
        this.innerHTML = `
            <h1>aaa</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur qui similique veniam.</p>
        `;
    }
    

}

window.customElements.define('lp-header', LpHeader);