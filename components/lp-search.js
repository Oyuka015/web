import langStore from "./lang-store.js";

class LpSearch extends HTMLElement {
    constructor() {
        super();
        this.unsubscribe = null;
    }

    connectedCallback() {
        this.render();
        this.unsubscribe = langStore.subscribe(() => this.render());
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render(){
        const t = (key) => langStore.t(key);
        this.innerHTML = `
            <style>
                form{
                    margin: 20px 0px 30px 0 ; 
                    box-shadow: 0 2px 10px var(--color-white-3); 
                    display: flex; 
                    height: 5vh; 
                    border-radius:99px; 
                    overflow: hidden;
                }
                input{
                    border: none; 
                    flex: 1; 
                    padding: 5px 0 5px 20px; 
                    outline: none;
                }
                button{
                    border: none; 
                    width: 13%; 
                    font-size: 1.2rem;
                    background-color:var(--color-white);
                }
            </style>
            <form action="search">
                <input placeholder="${langStore.t("searchPlaceholder")}" type="search">
                <button><i class="ci-Slider_02"></i></button>
            </form>
        `;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('lp-search', LpSearch);