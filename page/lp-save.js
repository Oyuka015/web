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
            <style>  
                .save-main{
                    margin-top: 80px;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 16px;
                    padding: 20px 16px 80px;
                }
                .empty-state {
                    text-align: center;
                    padding: 80px 20px;
                    color: var(--text-color-muted);
                }

                .empty-state i {
                    font-size: 60px;
                    margin-bottom: 20px;
                    display: block;
                    color:var(--color-warning-red-darkest);
                }

                .empty-state h3 {
                    font-size: var(--font-size-subtitle);
                    margin-bottom: 10px;
                    color: var(--text-color-default);
                }

                .empty-state p {
                    font-size: var(--font-size-default);
                    margin-bottom: 30px;
                }

                .empty-state a {
                    display: inline-block;
                    background: var(--color-warning-red-darkest);
                    border:1px solid var(--color-warning-red-darkest);
                    color: var(--color-white-0_5);
                    padding: 12px 24px;
                    border-radius: 15px;
                    text-decoration: none;
                    font-weight: 600; 
                    transition: all 0.3s ease;
                }
                .empty-state a:hover{
                    box-shadow: 1px 1px 15px var(--color-warning-red-darkest);
                } 
                
                @media (min-width: 1024px){
                    .save-main:has(.empty-state) {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: calc(100vh - 160px); /* header + padding-ыг тооцох */
                        padding: 0;
                    }
                }
            </style>
            <lp-header></lp-header>
            <section class="save-main">
            ${
                this.savedFoods.length === 0
                ? ` 
                    <div class="empty-state">
                        <i class="ci-Heart_01"></i>
                        <h3>Хоосон байна.</h3>
                        <p>Таньд хадгалсан хоол одоогоор байхгүй байна.</p>
                        <a href="/#home">Хоол сонгох</a>
                    </div>
                `
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
