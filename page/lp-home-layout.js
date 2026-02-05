class LpHomeLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <style>  

        /* desktop */
        @media (min-width: 1256px) {
          .layout {
            display: grid;
            grid-template-columns: 70% 30%;
            gap: 16px;
            padding: 16px;

            lp-cart{
                lp-header{
                    display:none;
                }
                .cart-main a{
                    display:none;
                }
            }
          }
          nav a:nth-child(3){
            /* display:none;*/
            
          }

          lp-cart {
            position: sticky;
            top: 80px;
            height: calc(100vh - 100px);
            overflow-y: auto; 
            background-color: var(--color-white-0_5);
            border-radius:10px;

            .cart-summary{
                position:absolute;
                bottom:50px;
                background: var(--color-whote-0);
                padding: 20px;
                box-shadow: 0 -4px 12px var(--color-white-3);
            }
          }

        }
      </style>

      <div class="layout">
        <lp-home></lp-home>
        <lp-cart></lp-cart>
      </div>
    `;
  }
}

customElements.define("lp-home-layout", LpHomeLayout);
