class LpSave extends HTMLElement {
    constructor() {
        super();
        this.savedFoods = []; // awchrsan datag frontd hadgalah array
    }

    async connectedCallback() {
        await this.loadSavedFoods(); 

        this._onFoodSaved = (e) => {
            this.savedFoods.push(e.detail);
            this.render();
        };
        document.addEventListener('food-saved', this._onFoodSaved);

        this._onFoodUnsaved = (e) => {
            const id = e.detail.id;
            this.savedFoods = this.savedFoods.filter(f => f.id !== id);
            this.render();
        };

        document.addEventListener("food-unsaved", this._onFoodUnsaved);
    }

    disconnectedCallback() {
        document.removeEventListener('food-saved', this._onFoodSaved);
        document.removeEventListener('food-unsaved', this._onFoodUnsaved);
    }

    // saved hoolnuudaa haruulah
    async loadSavedFoods() {    
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/saved", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const json = await res.json();
        this.savedFoods = json.data ?? [];
        this.render();
    }
 

    // render
    render() {
        this.innerHTML = `
            <lp-header></lp-header>
            <section class="save-main">
            ${
                this.savedFoods.length === 0
                ? `<p style="padding:16px;">❤️ Хадгалсан хоол алга</p>`
                : this.savedFoods
                    .map(f => `
                        <lp-food
                            mode="card"
                            saved
                            food-id="${f.id}"
                            image="${f.image}"
                            name="${f.name}"
                            price="${f.price}"
                            rating="${f.rating}"
                            description="${f.description ?? ''}"
                        ></lp-food>
                    `)
                    .join("")
            }
            </section>
        `;
    }
}

customElements.define("lp-save", LpSave);
