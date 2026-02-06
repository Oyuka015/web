// pages/lp-payment.js
import cartStore from "../components/cart-store.js";
import langStore from "../components/lang-store.js";
import "../components/lp-toast.js";

class LpPayment extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
    this.deliveryType = "pickup"; // pickup / delivery
    this.note = "";
  }

  connectedCallback() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      !!localStorage.getItem("token");

    if (!isLoggedIn) {
      window.location.hash = "#/login";
      return;
    }

    this.items = cartStore.getItems();
    this.total = cartStore.getTotal();

    this.render();
    this.langUnsubscribe = langStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    const foodTotal = cartStore.getTotal();
    const discount = 0;
    const deliveryFee = this.deliveryType === "delivery" ? 10000 : 0;
    const grandTotal = foodTotal + deliveryFee - discount;

    this.innerHTML = /*html*/ `
      <style> 
          lp-payment{
            display:flex;
            justify-content:center;
          }
          .payment-main { 
            padding:40px 30px;
            overflow: hidden;  
            margin-top:80px;
            max-width:1000px;
            border-radius:10px;

            .paying-info {
              display: flex;
              justify-content: center;
              padding: 0 5px;
              gap:20px;

              li {
                list-style: none;
                width: 100px;
                height: 100px;
                border-radius: 20px;
                box-shadow: 0 0 11px var(--color-white-3);
                display:flex;
                flex-direction: column;
                justify-content:center;

                img { 
                  width:50px;
                  margin-bottom: 8px; 
                  align-self:center;
                }

                p {
                  margin: 0;
                  font-size: 14px;
                  color: #333;
                  text-align: center;
                } 
              }
            } 

            .price-info {
              padding: 0 5px;

              li {
                list-style: none;
                display: flex;
                justify-content: space-between;
                line-height: 0;
              }

              li:last-child {
                border-top: 1px dashed black;
                padding-top: 10px;
              }
            }
          }

          h3{
            color:var(--color-orange);
            font-family: var(--font-family-mono);
            display:flex;
            justify-content:center;
            font-size:25px;
          }
          .paying-info li {
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 14px;
            padding: 12px;
            transition: all 0.3s ease;
          }

          .paying-info li.selected {
            border-color: var(--color-orange);
            background: var(--color-orange-soft);
          }

           /* Note section */
          .order-note {
            display: flex;
            flex-direction: column;
          }
          .order-note label {
            font-weight: 600;
            margin-bottom: 6px;
          }
          .order-note textarea {
            resize: none;
            padding: 12px;
            border-radius: 12px;
            border: 1px solid var(--color-white-2);
            font-family: var(--font-family-default);
            font-size: 14px;
            min-height: 60px;
            transition: border-color 0.2s;
          }
          .order-note textarea:focus {
            outline: none;
            border-color: var(--color-orange);
          }

        </style>

      <lp-header></lp-header>

      <section class="payment-main">
        <h3>Захиалга баталгаажуулах</h3>

        <ul class="paying-info">
          <li class="${this.deliveryType === "pickup" ? "selected" : ""}" data-type="pickup">
            <img src="/assets/img/qpay.png" alt="Очиж авах">
            <p>Очиж авах</p>
          </li>
          <li class="${this.deliveryType === "delivery" ? "selected" : ""}" data-type="delivery">
            <img src="/assets/img/spay.png" alt="Хүргэлтээр авах">
            <p>Хүргэлтээр авах</p>
          </li>
        </ul>

        <div class="order-note">
          <label for="order-note">Нэмэлт мэдээлэл:</label>
          <textarea id="order-note" placeholder="Хүсэлтээ бичнэ үү..." rows="3">${this.note}</textarea>
        </div>

        <ul class="price-info">
          <li>
            <p>${t("paymentFoodPrice")}</p>
            <p>${foodTotal.toLocaleString()} ₮</p>
          </li>
          <li>
            <p>${t("paymentDeliveryFee")}</p>
            <p>${deliveryFee.toLocaleString()} ₮</p>
          </li>
          <li>
            <p>${t("paymentDiscount")}</p>
            <p>${discount.toLocaleString()} ₮</p>
          </li>
          <li>
            <p>${t("paymentTotal")}</p>
            <p>${grandTotal.toLocaleString()} ₮</p>
          </li>
        </ul>

        <lp-bg-btn name="Захиалах" class="payment-btn"></lp-bg-btn>
      </section>
    `;

    this.addEventListeners(deliveryFee, grandTotal); 

  }

  addEventListeners(deliveryFee, grandTotal) {
  // Төрөл сонгох
  this.querySelectorAll(".paying-info li").forEach((li) => {
    li.addEventListener("click", () => {
      // Рендер хийхээс өмнө бичсэн текстийг нь хадгалж авна
      this.note = this.querySelector("#order-note").value;
      this.deliveryType = li.dataset.type;
      this.render(); 
    });
  });

  // Захиалга илгээх
    this.querySelector(".payment-btn").addEventListener("click", async () => {
      const finalNote = this.querySelector("#order-note").value;
      
      const orderData = {
        items: cartStore.getItems(),
        deliveryType: this.deliveryType,
        deliveryFee: deliveryFee,
        total: grandTotal,
        notes: finalNote
      };

      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(orderData)
        });

        if (res.ok) {
          cartStore.clear(); // Сагсыг цэвэрлэх
          // alert("Захиалга амжилттай!");
          document.body.insertAdjacentHTML(  //insertAdjacentHTML(position, html);
            "beforeend",
            `<lp-toast message="Захиалга амжилттай." type="success"></lp-toast>`
          );
          window.location.hash = "#/home";
        }
      } catch (err) {
        console.error("Order error:", err);
      }
    });
  }
}

window.customElements.define("lp-payment", LpPayment);
