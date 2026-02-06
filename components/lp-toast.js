// class LpToast extends HTMLElement {
//   connectedCallback() {
//     const message = this.getAttribute("message") ?? "";
//     const type = this.getAttribute("type") ?? "success"; // success | error | info
//     const duration = Number(this.getAttribute("duration") ?? 3000);

//     this.innerHTML = `
//       <style>
//         :host {
//           position: fixed;
//           top: 16px;
//           right: 16px;
//           z-index: 9999;
//           animation: slideIn 0.3s ease forwards;
//         }

//         .toast {
//           min-width: 220px;
//           max-width: 320px;
//           padding: 14px 18px;
//           border-radius: 12px;
//           color: white;
//           font-weight: 600;
//           box-shadow: 0 6px 20px rgba(0,0,0,.2);
//           opacity: 0;
//           animation: fadeIn 0.3s ease forwards;
//         }

//         .success { background: #22c55e; }
//         .error   { background: #ef4444; }
//         .info    { background: #3b82f6; }

//         @keyframes fadeIn {
//           to { opacity: 1; }
//         }

//         @keyframes fadeOut {
//           to { opacity: 0; transform: translateY(-10px); }
//         }
//       </style>

//       <div class="toast ${type}">
//         ${message}
//       </div>
//     `;

//     setTimeout(() => {
//       this.querySelector(".toast").style.animation = "fadeOut 0.4s ease forwards";
//       setTimeout(() => this.remove(), 400);
//     }, duration);
//   }
// }

// customElements.define("lp-toast", LpToast);

class LpToast extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const message = this.getAttribute('message') || '';
    const type = this.getAttribute('type') || 'info';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          z-index: 9999;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
          font-family: sans-serif;
        }
        :host(.show) {
          opacity: 1;
          transform: translateY(0);
        }
      </style>
      <div>${message}</div>
    `;

    // haruu;ah
    requestAnimationFrame(() => {
      this.classList.add('show');
    });

    // arilgah
    setTimeout(() => {
      this.classList.remove('show');
      setTimeout(() => this.remove(), 300);
    }, 3000);
  }
}

customElements.define('lp-toast', LpToast);
