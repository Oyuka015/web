class LpNav extends HTMLElement {
    constructor() {
        super();
        this.onHashChange = this.onHashChange.bind(this);
    }

    connectedCallback() {
        this.render();
        this.cacheLinks();
        this.updateActiveLink();
        this.attachLinkHandlers();
        window.addEventListener("hashchange", this.onHashChange);
    }

    attachLinkHandlers() {
        this.links?.forEach((link) => {
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");
                if (href && href.startsWith("#")) {
                    window.location.hash = href;
                }
            });
        });
    }

    render(){
        this.innerHTML = `
          <nav>
            <a href="#/">
                <i class="ci-House_01"></i>
            </a>
            <a href="#">
                <i class="ci-Heart_01"></i> 
            </a>
            <a href="#/cart">
                <i class="ci-Shopping_Bag_02"></i>
            </a>
            <a href="#">
                <i class="ci-User_02"></i>
            </a> 
        </nav>
        `;
    }

    cacheLinks() {
        this.links = Array.from(this.querySelectorAll("a[href^='#']"));
    }

    onHashChange() {
        this.updateActiveLink();
    }

    updateActiveLink() {
        const current = window.location.hash || "#/";
        this.links?.forEach((link) => {
            if (link.getAttribute("href") === current) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    disconnectedCallback() {
        window.removeEventListener("hashchange", this.onHashChange);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        
    }

    adoptedCallback() {
        
    }

}

window.customElements.define('lp-nav', LpNav);