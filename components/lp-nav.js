// class LpNav extends HTMLElement {
//     constructor() {
//         super();
//         this.onHashChange = this.onHashChange.bind(this);
//     }

//     connectedCallback() {
//         this.render();
//         this.cacheLinks();
//         this.updateActiveLink();
//         this.attachLinkHandlers();
//         window.addEventListener("hashchange", this.onHashChange);
//     }

//     attachLinkHandlers() {
//         this.links?.forEach((link) => {
//             link.addEventListener("click", (e) => {
//                 const href = link.getAttribute("href");
//                 if (href && href.startsWith("#")) {
//                     window.location.hash = href;
//                 }
//             });
//         });
//     }

//     render(){
//         this.innerHTML = `
//           <nav>
//             <a href="#/">
//                 <i class="ci-House_01"></i>
//             </a>
//             <a href="#/save">
//                 <i class="ci-Heart_01"></i> 
//             </a>
//             <a href="#/cart">
//                 <i class="ci-Shopping_Bag_02"></i>
//             </a>
//             <a href="#/acc">
//                 <i class="ci-User_02"></i>
//             </a> 
//         </nav>
//         `;
//     }

//     cacheLinks() {
//         this.links = Array.from(this.querySelectorAll("a[href^='#']"));
//     }

//     onHashChange() {
//         this.updateActiveLink();
//     }

//     updateActiveLink() {
//         const current = window.location.hash || "#/";
//         this.links?.forEach((link) => {
//             if (link.getAttribute("href") === current) {
//                 link.classList.add("active");
//             } else {
//                 link.classList.remove("active");
//             }
//         });
//     }

//     disconnectedCallback() {
//         window.removeEventListener("hashchange", this.onHashChange);
//     }

//     attributeChangedCallback(name, oldVal, newVal) {
        
//     }

//     adoptedCallback() {
        
//     }

// }

// window.customElements.define('lp-nav', LpNav);

import cartStore from "../components/cart-store.js";

class LpNav extends HTMLElement {
    constructor() {
        super();
        this.onHashChange = this.onHashChange.bind(this);
        this.unsubscribe = null;
    }

    connectedCallback() {
        this.render();
        this.cacheLinks();
        this.updateActiveLink();
        this.attachLinkHandlers();

        this.unsubscribe = cartStore.subscribe(() => this.updateCartCount());

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
            <a href="#/home">
                <i class="ci-House_01"></i>
            </a>
            <a href="#/save">
                <i class="ci-Heart_01"></i> 
            </a>
            <a href="#/cart">
                <i class="ci-Shopping_Bag_02"></i>
                <span class="cart-count">0</span>
            </a>
            <a href="#/acc" style="position:relative;">
                <i class="ci-User_02"></i>
            </a> 
        </nav>
        `;

        this.cacheLinks();
        this.updateCartCount();
    }

    cacheLinks() {
        this.links = Array.from(this.querySelectorAll("a[href^='#']"));
        this.cartCountElem = this.querySelector(".cart-count");
    }

    updateCartCount() {
        if (this.cartCountElem) {
            const count = cartStore.getItemCount(); // total item count
            this.cartCountElem.textContent = count;
            this.cartCountElem.style.display = count > 0 ? "inline-block" : "none";
        }
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
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

window.customElements.define('lp-nav', LpNav);
