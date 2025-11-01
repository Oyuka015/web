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

    disconnectedCallback() {
        
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('lp-bg-btn', LpBgBtn);