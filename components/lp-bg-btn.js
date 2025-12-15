class LpBgBtn extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        const name = this.getAttribute('name') || 'button';
        this.innerHTML = `
            <button>${name}</button>
        `;
    }


}

window.customElements.define('lp-bg-btn', LpBgBtn);