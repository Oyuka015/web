import cartStore from "../components/cart-store.js";
import langStore from "../components/lang-store.js";

class LpPayment extends HTMLElement {
  constructor() {
    super();
    this.langUnsubscribe = null;
  }

  connectedCallback() {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      !!localStorage.getItem("token");

    if (!isLoggedIn) {
      window.location.hash = "#/login";
      return;
    }

    this.render();
    this.langUnsubscribe = langStore.subscribe(() => this.render());
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  render() {
    const t = (key) => langStore.t(key);
    const items = cartStore.getItems();
    const foodTotal = cartStore.getTotal();
    const deliveryFee = 10000;
    const discount = 0;
    const grandTotal = foodTotal + deliveryFee - discount;

    this.innerHTML = /*html */ `
            <lp-header></lp-header> 
            
            <section class="payment-main">
                <div class="map-img">
                    <img src="/assets/img/map.png" alt="">
                </div>
                <ul class="delivery-info">
                    <li><a href="#/acc">
                        <div class="info-icon">
                            <i class="ci-House_01"></i>
                        </div>
                        <div class="add-info">
                            <p>${t("paymentAddress")}</p>
                            <p>123 Tokyo Lane</p>
                        </div>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#/acc">
                        <div class="info-icon">
                            <i class="ci-Phone"></i>
                        </div>
                        <div class="add-info">
                            <p>${t("paymentPhone")}</p>
                            <p>10202200</p>
                        </div>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                </ul>
                

                <select name="voucher" id="voucher-info">
                    <option value="" selected disabled hidden>${t("paymentVoucher")}</option>
                    <option value="none" disabled>${t("paymentNoVoucher")}</option>
                </select>


                <ul class="paying-info">
                    <li><a href="#/payment">
                        <img src="/assets/img/qpay.png" alt="">
                        <p>Qpay</p>
                    </a></li>
                    <li><a href="#/payment">
                        <img src="/assets/img/spay.png" alt="">
                        <p>Social Pay</p>
                    </a></li>
                    <li><a href="#/payment">
                        <img src="/assets/img/credit.png" alt="">
                        <p>${t("paymentCard")}</p>
                    </a></li>
                </ul>

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

                <button class="checkout-btn">${t("paymentPay")}</button>
            </section>
            
        `;

    const checkoutBtn = this.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isLoggedIn =
          localStorage.getItem("isLoggedIn") === "true" ||
          !!localStorage.getItem("token");
        if (isLoggedIn) {
          cartStore.clear();
          alert(langStore.t("paymentOrderSuccess"));
          window.location.hash = "#/";
        }
      });
    }

    document.querySelectorAll(".paying-info a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // route-г өөрөө удирдана

        document
          .querySelectorAll(".paying-info a")
          .forEach((a) => a.classList.remove("selected"));

        link.classList.add("selected");

        window.location.hash = link.getAttribute("href");
      });
    });
  }
}

window.customElements.define('lp-payment', LpPayment);