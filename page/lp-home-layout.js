class LpHomeLayout extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
      <style>  
        /*mobile*/
        @media(max-width: 1255px){
            lp-cart{
                display:none; 
            }  
            
        }
        /* desktop */
        @media (min-width: 1256px) {
          body{
            overflow:hidden;
            padding:0;
          }
          .layout {
            display: grid;
            grid-template-columns: 70% 30%;
            gap: 16px;
            padding: 16px;
            height:100vh; 

            lp-home{
              overflow-y:auto;
              padding-bottom:50px;
            }

            lp-cart{
              position: sticky; 
              height:  100%;
              overflow-y: auto; 
              background-color: var(--color-white-0_5);
              border-radius:10px;

              lp-header{
                  display:none;
              }
              .cart-main{
                margin-top:20px;
              }
              .cart-main a{
                  display:none;
              }  

              .cart-summary{
                position:absolute;
                bottom:80px;
                background: var(--color-whote-0);
                padding: 20px;
                box-shadow: 0 -4px 12px var(--color-white-3);
              }
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
