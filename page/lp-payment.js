import cartStore from "../components/cart-store.js";

class LpPayment extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      window.location.hash = "#/login";
      return;
    }

    this.render();
  }

  render() {
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
                            <p>Хаяг</p>
                            <p>123 Tokyo Lane</p>
                        </div>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#/acc">
                        <div class="info-icon">
                            <i class="ci-Phone"></i>
                        </div>
                        <div class="add-info">
                            <p>Утас</p>
                            <p>10202200</p>
                        </div>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                </ul>
                

                <select name="voucher" id="voucher-info">
                    <option value="" selected disabled hidden>Voucher</option>
                    <option value="none" disabled>Купон байхгүй</option>
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
                        <p>Карт</p>
                    </a></li>
                </ul>

                <ul class="price-info">
                    <li>
                        <p>Хоолны үнэ</p>
                        <p>${foodTotal.toLocaleString()} ₮</p>
                    </li>
                    <li>
                        <p>Хүргэлтийн төлбөр</p>
                        <p>${deliveryFee.toLocaleString()} ₮</p>
                    </li>
                    <li>
                        <p>Хөнгөлөлт</p>
                        <p>${discount.toLocaleString()} ₮</p>
                    </li>
                    <li>
                        <p>Нийт дүн</p>
                        <p>${grandTotal.toLocaleString()} ₮</p>
                    </li>
                </ul>

                <button class="checkout-btn">Төлөх</button>
            </section>
            
        `;

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