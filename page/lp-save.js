class LpSave extends HTMLElement {
    constructor() {
        super();
        this.savedFoods = []; // frontend-д хадгалах array
    }

    async connectedCallback() {
        await this.loadSavedFoods();
        this.setupEventListener();
    }

    // 1️⃣ API-аас анх load хийх
    async loadSavedFoods() {    
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/saved", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const json = await res.json();
        this.savedFoods = json.data ?? [];
        this.render();
    }

    // 2️⃣ Home page-аас хадгалах event-г сонсох
    setupEventListener() {
        document.addEventListener('food-saved', (e) => {
            const savedFood = e.detail;

            // Шинэ хоол array-д нэмэх
            this.savedFoods.push(savedFood);

            // Render
            this.render();
        });
    }

    // 3️⃣ Render function
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
                            food-id="${f.id}"
                            image="${f.image}"
                            title="${f.title ?? f.name}"
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
