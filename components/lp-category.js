class LpCategory extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute("name") || "";

    this.innerHTML = /*html*/ `
      <style>
        .cat-container{
          margin-bottom: 20px;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
          padding-top: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--color-white-1);

          h2{
            font-family: var(--font-orbitron);
            font-size: 18px;
            font-weight: 700;
            color: var(--text-color-default);
            margin-bottom: 16px;
          }

          .cat{ 
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 8px;
            scrollbar-width: thin;
            scrollbar-color: var(--color-orange-lightest) transparent;

            .defCat.selectedCat{
              background: var(--color-orange-lighter);
              border-color: var(--color-orange-lighter);
              color: var(--text-color-white);
              box-shadow: 0 1px 10px var(--color-orange-lighter);
            }
            .defCat{
              display: flex;
              align-items: center;
              gap: 8px;
              flex-shrink: 0;  /* wrap hiigdeed baisniig boliulsan */
              background: var(--color-white-0_5); 
              padding: 10px 16px; 
              border: 1px solid var(--color-orange-lightest);
              border-radius: 20px;
              color: var(--text-color-default);
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
            }
          }
        } 
        
    </style>
      ${name}
    `;
    
  }
}

customElements.define("lp-category", LpCategory);