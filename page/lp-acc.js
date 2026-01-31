class LpAcc extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.render();
        this.loadUserInfo();
        this.addLogoutListener();
    }

    render(){
        this.innerHTML = `
            <lp-header></lp-header> 

            <section class="acc-main">
                <div class="user-info">
                    <div class="profile">
                        <img src="assets/img/image.png" alt="user-profile-picture" id="userAvatar">
                        <h3  id="userName">User</h3>
                        <button>Edit</button>
                    </div> 
                    <ul class="dash">
                        <li id="orderCount">0 <span>Orders</span></li>
                        <li id="savedCount">0 <span>Saved</span></li>
                        <li id="voucherCount">0 <span>Voucher</span></li>
                    </ul> 
                </div>

                
                <ul class="acc-info">
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-File_Blank"></i>
                        </div>
                        <p>My Orders</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-Heart_01"></i>
                        </div>
                        <p>Favorites</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-Gift"></i>
                        </div>
                        <p>My Vouchers</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                </ul> 
 
                <ul class="help-info">
                    <li><a href="#">
                        <div class="info-icon">
                            <i class="ci-Square_Help"></i>
                        </div>
                        <p>Help & Support</p>
                        <span><i class="ci-Chevron_Right_MD"></i></span>
                    </a></li>
                </ul> 
                <ul class="logout-info">
                    <li><a href="#/logout" id="logoutBtn">
                        <div class="info-icon">
                            <i class="ci-Square_Help"></i>
                        </div>
                        <p>Гарах</p>
                    </a></li>
                </ul> 
            </section>
        `; 
    }

    async loadUserInfo() {
        const token = localStorage.getItem("token");
        if (!token) return; // token байхгүй бол юу ч хийхгүй

        try {
            const res = await fetch("http://localhost:3000/api/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Failed to fetch user");

            const user = await res.json();

            // HTML дээр харуулах
            this.querySelector("#userName").textContent = user.fullname;
            if (user.avatar) {
                this.querySelector("#userAvatar").src = user.avatar;
            }
            // this.querySelector("#orderCount").textContent = `${user.orders || 0} Orders`;
            // this.querySelector("#savedCount").textContent = `${user.saved || 0} Saved`;
            // this.querySelector("#voucherCount").textContent = `${user.vouchers || 0} Voucher`;
        } catch (err) {
            console.error(err);
        }
    }

    addLogoutListener() {
        const logoutBtn = this.querySelector("#logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                localStorage.setItem("isLoggedIn", "false");
                alert("Та амжилттай гарлаа");
                window.location.hash = "#/";
            });
        }
    }

}

window.customElements.define('lp-acc', LpAcc);