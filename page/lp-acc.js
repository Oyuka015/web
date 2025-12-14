class LpAcc extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML = `
            <lp-header></lp-header> 

            <section class="acc-main">
                <div class="user-info">
                    <div class="profile">
                        <img src="assets/img/image.png" alt="user-profile-picture">
                        <h3>A. User</h3>
                        <button>Edit</button>
                    </div> 
                    <ul class="dash">
                        <li>5 <span>Orders</span></li>
                        <li>15 <span>Saved</span></li>
                        <li>5 <span>Voucher</span></li>
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
            </section>
        `; 
    }

}

window.customElements.define('lp-acc', LpAcc);