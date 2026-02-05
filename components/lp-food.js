import cartStore from "./cart-store.js";

class LpFood extends HTMLElement {
  constructor() {
    super(); 
  }

  async connectedCallback() {
    this.mode = this.getAttribute("mode") ?? "card"; // card - row
    this.classList.add(this.mode);  // desktop dr css dawharduulahguin tuld ogsn
    this.image = this.getAttribute("image") ?? "";
    this.name = this.getAttribute("name") ?? "No title";
    this.price = this.getAttribute("price") ?? "0";
    this.rating = this.getAttribute("rating") ?? "0";
    this.description = this.getAttribute("description") ?? "";
    this.foodId = this.getAttribute("food-id");
    this.isSaved = this.hasAttribute("saved");
    this.quantity = parseInt(this.getAttribute("quantity") ?? 1);

    this.render();
    this.updateSaveIcon(); 
    this.setupEventListeners();
  } 

  // eventlistener
  setupEventListeners() {
    // save btn heseg
    const saveBtn = this.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async (e) => {
        e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) return alert("Login хийнэ үү");

        if (this.isSaved) {
          await fetch(`http://localhost:3000/api/saved/${this.foodId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });

          this.isSaved = false;

          this.dispatchEvent(new CustomEvent("food-unsaved", {
            detail: { id: this.foodId },
            bubbles: true
          }));
          
          this.removeAttribute("saved");
        } else {
          await fetch(`http://localhost:3000/api/saved/${this.foodId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
          });

          this.isSaved = true;
          this.setAttribute("saved", "");
        }

        this.updateSaveIcon(); // icon change
      });

    }

    // cart btn heseg
    const cartBtn = this.querySelector(".cart-btn");
    if (cartBtn) {
      cartBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) return alert("Login хийнэ үү");

        // item object бэлдэнэ
        const cartItem = {
          id: this.foodId,
          title: this.name,
          price: parseInt(this.price.replace(/,/g, '')), // string → number
          image: this.image,
        };

        // Cart store-д нэмнэ
        cartStore.addItem(cartItem);

        // Болвол short notification
        alert(`${this.name} сагсанд нэмэгдлээ!`);
      });
    }
  }

  //mode-s hamaarch haragdah helber songoh 
  render() {
    switch (this.mode) {
      case "row":
        this.renderRow();
        break;
      case "card":
      default:
        this.renderCard();
        break;
    } 
  } 

  // home page hesegt haragdah helber
  renderCard() {
    this.innerHTML = /*html*/ `
      <style>
        lp-food.card {
          background: var(--color-white-0);  
          border:1px solid var(--color-white-2);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
          position:relative;  

          display: flex;
          flex-direction: column;
          height: 400px;

          img{
            width: 100%;
            height: 180px;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          
          /*article start */
          article{ 
            padding: 16px; 
            display: flex; 
            flex-direction: column;
            flex: 1; 

            /* articli-header */
            header{ 
              display: flex;  
              margin-bottom: 8px;

              span{ 
                position:absolute;
                border-radius:10px;
                padding:5px 8px;
                background: var(--color-white-0);
                top:10px;
                right:5px; 
                box-shadow:1px 2px 5px var(--color-dark-3);
              }
            }
            /*ARTICLE - MID */
            small{ 
              font-size: 14px;
              color: var(--text-color-muted);
              margin-bottom: 12px;
              line-height: 1.4;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2; /* engiin uyd 2 mor haragdene*/
              -webkit-box-orient: vertical;
              transition: all 0.3s ease;
            }
            /* ARTICLE - FOOTER */
            footer{ 
              display: flex;
              justify-content: space-between;
              align-items: center; 
              margin-top: auto; 

              p{
                font-family: var(--font-family-mono);
                font-size: 18px;
                font-weight: 700;
                color: var(--bg-color-accent);
              }

              .food-action { 
                display: flex;
                gap: 8px;

                .action-btn{
                  width: 36px;
                  height: 36px;
                  border: none;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  font-size: 16px; 
                }
                .save-btn{
                  background: var(--color-warning-red); 
                  border: 1px solid var(--color-warning-red-dark); 
                  /*color:var(--color-warning-red-dark); */ 
                } 
                .save-btn:hover{
                  box-shadow: 1px 2px 10px var(--color-warning-red-dark);
                }

                .cart-btn{
                  background: var(--color-orange-lightest);
                  border: 1px solid var(--color-orange-lighter); 
                  color: var(--color-dark-0); 
                }
                .cart-btn:hover{ 
                  box-shadow: 1px 2px 10px var(--color-orange-lighter);
                } 
              }
            }
          } /** article end*/ 
        } 
        lp-food.card:hover small {
          -webkit-line-clamp: unset; 
          transition: all 0.3s ease;  
        } 
        lp-food.card:hover{
          box-shadow: 1px 1px 10px var(--color-orange-lighter);
          border:1px solid var(--color-orange);  
          transition: all 0.3s ease;  
        }  
        lp-home lp-food.card:hover{ 
          height:auto;
        }  
      </style>

      <img alt="${this.name}" src="${this.image}"  />
      <article>
        <header>
          <h3>${this.name}</h3>
          <span>⭐ ${this.rating}</span>
        </header>
        <small>${this.description}</small>
        <footer>
          <p>${this.price}₮</p>
          <div class="food-action">
            <button class="action-btn save-btn" title="Хадгалах"></button>
            <button class="action-btn cart-btn" title="Сагслах">🛒</button>
          </div>
        </footer>
      </article>
    `; 

  }

  // cart page hesegt haragdah helber
  renderRow() {
    this.innerHTML = /*html*/`
      <style>
        lp-food.row .cart-main{
          display:flex;
          flex-direction:column; 
        }
        .cart-main article:hover{
          border:1px solid var(--color-orange);
          transition: all 0.3s ease; 
        }
        lp-food.row article{
          display: flex;
          background: var(--color-white-0);
          border: 1px solid var(--color-white-3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
          align-items: center;

          img{
            width: 80px;
            height: 80px;
            border-radius: 8px;
            object-fit: cover;
            margin-right: 16px;
            flex-shrink: 0;
          }

          .content{
            flex: 1;
            display: flex;
            flex-direction: column;

            header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;

                h3{
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-color-default);
                    /* margin-bottom: 4px; */
                }
                /*span - uniin medeelel */
                span{ 
                    font-family: var(--font-mono);
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--color-orange);
                }
                
            }

            p{
              font-size: 14px;
              color: var(--text-color-muted);
              margin-bottom: 12px;
              line-height: 1.4;
            }

            footer{
              display: flex;
              justify-content: space-between;
              align-items: center; 

              .quantity-control{
                  display: flex;
                  align-items: center;
                  gap: 12px;

                  .qty-btn{
                    width: 32px;
                    height: 32px;
                    border: 2px solid var(--color-orange); 
                    background-color:var(--color-white-0); 
                    color: var(--color-orange);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                  }
                  .qty-btn.plus:hover,
                  .qty-btn.minus:hover{
                    background-color: var(--color-orange-lighter);
                    color: var(--color-white-0);
                  }

                  .quantity{
                      font-family: var(--font-mono);
                      font-size: 16px;
                      font-weight: 600;
                      color: var(--text-color-default);
                      min-width: 30px;
                      text-align: center;
                  }
              }

              button{
                background: var(--color-warning-red);
                border: 1px solid var(--color-warning-red-dark);
                color: var(--color-warning-red-darkest);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;

                display:flex;
                justify-content:center;
                align-items:center;
              }
              button:hover{
                background:var(--color-warning-red-dark); 
              }
            }
          }
        }
      </style>

      <article>
        <img src="${this.image}" alt="${this.name}"> 
        <div class="content">
            <header>
                <h3>${this.name}</h3>
                <span>${this.price}₮</span>
            </header>
            <footer>
                <div class="quantity-control">
                    <button class="qty-btn minus">-</button>
                    <span class="quantity">${this.quantity}</span>
                    <button class="qty-btn plus">+</button>
                </div>
                <button class="remove-btn"><i class="ci-Trash_Full"></i></button>
            </footer>
        </div>
      </article>
    `;
    this.setupRowEvents();
  } 

  // save darahad towch oorchloh
  updateSaveIcon() {
    const btn = this.querySelector('.save-btn');
    if (!btn) return;
    btn.textContent = this.isSaved ? '❤️' : '🤍';
  }

  // row - sagstai h
  setupRowEvents() {
    const minus = this.querySelector(".minus");
    const plus = this.querySelector(".plus");
    const removeBtn = this.querySelector(".remove-btn");

    plus.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const qty = parseInt(
        this.querySelector(".quantity").textContent
      );

      await cartStore.updateQuantity(this.foodId, qty + 1);
    });

    minus.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const qty = parseInt(
        this.querySelector(".quantity").textContent
      );

      if (qty <= 1) return;

      await cartStore.updateQuantity(this.foodId, qty - 1);
    });

    removeBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();

      await cartStore.removeItem(this.foodId);
    });
  }




}

customElements.define("lp-food", LpFood);

