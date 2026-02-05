
import "../components/lp-user-profile.js";
import "../components/lp-account-menu.js";
import "../components/lp-language-switcher.js";
import "../components/lp-theme-toggle.js";
import "../components/lp-faq-section.js";
import "../components/lp-events-section.js";
import "../components/lp-orders-list.js"

class LpAcc extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEditListener();
  }

  render() {
    this.innerHTML = `
      <lp-header></lp-header> 
      <section class="acc-main">
        <lp-user-profile></lp-user-profile>
        <lp-account-menu></lp-account-menu>
        <lp-edit></lp-edit>
      </section>
    `;
  }

  addEditListener() {
    const userProfile = this.querySelector("lp-user-profile");
    const editComponent = this.querySelector("lp-edit");

    if (userProfile && editComponent) {
      userProfile.addEventListener("edit-profile", () => {
        editComponent.open();
      });

      editComponent.addEventListener("profile-updated", () => {
        userProfile.dispatchEvent(new CustomEvent("profile-updated"));
      });
    }
  }
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

window.customElements.define("lp-acc", LpAcc);