import langStore from "./lang-store.js";

class LpEdit extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.langUnsubscribe = null;
    this.userData = {
      name: "",
      email: "",
      phone: "",
      address: ""
    };
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    
    this.langUnsubscribe = langStore.subscribe(() => {
      this.render();
      this.attachEventListeners();
    });
  }

  disconnectedCallback() {
    if (this.langUnsubscribe) this.langUnsubscribe();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "open" && this.isConnected) {
      this.isOpen = newVal === "true";
      this.updateVisibility();
    }
  }

  static get observedAttributes() {
    return ["open"];
  }

  adoptedCallback() {
  }

  async loadUserData() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(langStore.t("accLoadError") || "Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error("Failed to load user data");
      }

      const user = await res.json();
      
      const addressRes = await fetch("http://localhost:3000/api/user/address", {
        headers: { Authorization: `Bearer ${token}` }
      });

      let address = "";
      if (addressRes.ok) {
        const addressData = await addressRes.json();
        address = addressData.address || "";
      }

      this.userData = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: address
      };

      this.populateForm();
    } catch (err) {
      console.error("Error loading user data:", err);
      alert(langStore.t("accLoadError") || "Failed to load user data");
    }
  }

  populateForm() {
    const nameInput = this.querySelector("#editName");
    const emailInput = this.querySelector("#editEmail");
    const phoneInput = this.querySelector("#editPhone");
    const addressInput = this.querySelector("#editAddress");

    if (nameInput) nameInput.value = this.userData.name;
    if (emailInput) emailInput.value = this.userData.email;
    if (phoneInput) phoneInput.value = this.userData.phone;
    if (addressInput) addressInput.value = this.userData.address;
  }

  async saveProfile(formData) {
    const token = localStorage.getItem("token");
    if (!token) {
      alert(langStore.t("accLoadError") || "Please login first");
      return false;
    }

    try {
      const res = await fetch("http://localhost:3000/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const result = await res.json();
      
      if (formData.name) {
        localStorage.setItem("userName", formData.name);
      }

      return true;
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(err.message || "Failed to save profile");
      return false;
    }
  }

  open() {
    this.isOpen = true;
    this.updateVisibility();
    this.loadUserData();
  }

  close() {
    this.isOpen = false;
    this.updateVisibility();
  }

  updateVisibility() {
    const overlay = this.querySelector(".edit-overlay");
    const sidebar = this.querySelector(".edit-sidebar");

    if (this.isOpen) {
      if (overlay) overlay.classList.add("active");
      if (sidebar) sidebar.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      if (overlay) overlay.classList.remove("active");
      if (sidebar) sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  attachEventListeners() {
    const overlay = this.querySelector(".edit-overlay");
    const closeBtn = this.querySelector(".close-btn");
    const cancelBtn = this.querySelector(".cancel-btn");
    const form = this.querySelector("#editProfileForm");

    if (overlay) {
      overlay.addEventListener("click", () => this.close());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.close();
      });
    }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = {
          name: this.querySelector("#editName").value.trim(),
          email: this.querySelector("#editEmail").value.trim(),
          phone: this.querySelector("#editPhone").value.trim(),
          address: this.querySelector("#editAddress").value.trim()
        };

        if (!formData.name) {
          alert(langStore.t("editNameRequired") || "Name is required");
          return;
        }

        if (!formData.email) {
          alert(langStore.t("editEmailRequired") || "Email is required");
          return;
        }

        const saveBtn = this.querySelector(".save-btn");
        const originalText = saveBtn.textContent;
        saveBtn.disabled = true;
        saveBtn.textContent = langStore.t("editSaving") || "Saving...";

        const success = await this.saveProfile(formData);

        if (success) {
          alert(langStore.t("editSuccess") || "Profile updated successfully!");
          this.close();
          
          this.dispatchEvent(new CustomEvent("profile-updated", {
            bubbles: true,
            composed: true
          }));
        }

        saveBtn.disabled = false;
        saveBtn.textContent = originalText;
      });
    }
  }

  render() {
    const t = (key) => langStore.t(key);

    this.innerHTML = `
      <div class="edit-overlay"></div>
      <div class="edit-sidebar">
        <div class="edit-header">
          <h2>${t("editProfile") || "Edit Profile"}</h2>
          <button class="close-btn" aria-label="Close">
            <i class="ci-Close_MD"></i>
          </button>
        </div>

        <form id="editProfileForm" class="edit-form">
          <div class="form-group">
            <label for="editName">
              <i class="ci-User_02"></i>
              ${t("editName") || "Name"}
            </label>
            <input 
              type="text" 
              id="editName" 
              name="name" 
              placeholder="${t("editNamePlaceholder") || "Enter your name"}"
              required
            />
          </div>

          <div class="form-group">
            <label for="editEmail">
              <i class="ci-Mail"></i>
              ${t("editEmail")||"Email"}
            </label>
            <input 
              type="email" 
              id="editEmail" 
              name="email" 
              placeholder="${t("editEmailPlaceholder") || "Enter your email"}"
              required
            />
          </div>

          <div class="form-group">
            <label for="editPhone">
              <i class="ci-Phone"></i>
              ${t("editPhone") || "Phone"}
            </label>
            <input 
              type="tel" 
              id="editPhone" 
              name="phone" 
              placeholder="${t("editPhonePlaceholder") || "Enter your phone number"}"
            />
          </div>

          <div class="form-group">
            <label for="editAddress">
              <i class="ci-Location_04"></i>
              ${t("editAddress") || "Address"}
            </label>
            <textarea 
              id="editAddress" 
              name="address" 
              rows="3"
              placeholder="${t("editAddressPlaceholder") || "Enter your address"}"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn">
              ${t("editCancel") || "Cancel"}
            </button>
            <button type="submit" class="save-btn">
              ${t("editSave") || "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      <style>
        .edit-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .edit-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .edit-sidebar {
          position: fixed;
          top: 0;
          right: -420px;
          width: 420px;
          max-width: 90vw;
          height: 100vh;
          background: var(--color-white-0);
          z-index: 1000;
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .edit-sidebar.active {
          right: 0;
        }

        .edit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--color-white-1);
          background: var(--color-white-0);
        }

        .edit-header h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
          color: var(--color-dark-1);
        }

        .close-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: var(--color-white-1);
          border-radius: 50%;
          color: var(--color-dark-3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: var(--color-white-2);
          color: var(--color-dark-1);
          transform: rotate(90deg);
        }

        .edit-form {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--color-dark-2);
          margin-bottom: 10px;
        }

        .form-group label i {
          font-size: 18px;
          color: var(--color-orange);
        }

        .form-group input,
        .form-group textarea {
          width: 90%;
          padding: 14px 16px;
          border: 2px solid var(--color-white-2);
          border-radius: 12px;
          font-size: 15px;
          color: var(--color-dark-1);
          background: var(--color-white-0);
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-orange);
          box-shadow: 0 0 0 4px rgba(255, 128, 0, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          padding: 20px 28px;
          border-top: 1px solid var(--color-white-1);
          background: var(--color-white-0);
          margin: 0 -28px -28px;
        }

        .cancel-btn,
        .save-btn {
          flex: 1;
          padding: 14px 24px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn {
          background: var(--color-white-1);
          color: var(--color-dark-2);
        }

        .cancel-btn:hover {
          background: var(--color-white-2);
          color: var(--color-dark-1);
        }

        .save-btn {
          background: linear-gradient(
            135deg,
            var(--color-orange),
            var(--color-orange-darker)
          );
          color: var(--color-white-0);
          box-shadow: 0 4px 12px rgba(255, 128, 0, 0.3);
        }

        .save-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 128, 0, 0.4);
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .edit-sidebar {
            width: 100%;
            max-width: 100%;
            right: -100%;
          }

          .edit-header {
            padding: 20px;
          }

          .edit-form {
            padding: 20px;
            margin: 0 30px;
          }

          .form-actions {
            padding: 16px 20px;
            margin: 0 -20px -20px;
          }
        }

        .close-btn:focus,
        .cancel-btn:focus,
        .save-btn:focus {
          outline: 2px solid var(--color-orange);
          outline-offset: 2px;
        }
      </style>
    `;
  }
}

window.customElements.define("lp-edit", LpEdit);