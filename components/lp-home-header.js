class LpHomeHeader extends HTMLElement {
  constructor() {
    super();
    this.address = "Хаяг ачаалж байна...";
  }

  async connectedCallback() {
    this.render();
    await this.fetchAddress();
  }

  async fetchAddress() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.address = "Эхлээд нэвтэрнэ үү!";
      this.render();
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/user/address", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("aldaa", data);
        this.address = data.error || "Хаяг татахад алдаа гарлаа";
        this.render();
        return;
      }
      const data = await response.json();

      if (
        data.address === null ||
        data.address === undefined ||
        String(data.address).trim() === ""
      ) {
        this.address = "Хаяг оруулаагүй байна";
      } else {
        this.address = String(data.address).trim();
      }

      this.render();
    } catch (error) {
      console.error("network or other aлдаа:", error);
      this.address = "hayg bhgu bna";
      this.render();
    }
  }

  render() {
    this.innerHTML = `
      <section>
        <a href="#/acc" id="address-link">
          <i class="ci-Map_Pin"></i>
          <p><span>${this.escapeHtml(this.address)}</span></p>
        </a>
        <!--
        <button title="Мэдэгдэл"><i class="ci-Bell"></i></button>
        -->
      </section>
    `;
  }
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
}

window.customElements.define("lp-home-header", LpHomeHeader);
