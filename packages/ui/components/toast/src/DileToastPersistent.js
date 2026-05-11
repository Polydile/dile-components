import { LitElement, html, css } from "lit";

export class DileToastPersistent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: fixed;
        bottom: var(--dile-toast-persistent-gap, 1rem);
        left: var(--dile-toast-persistent-gap, 1rem);
        z-index: var(--dile-toast-persistent-z-index, 999);
        width: var(--dile-toast-persistent-width, 300px);
        box-sizing: border-box;
        pointer-events: none;
      }
      :host([right]) {
        left: auto;
        right: var(--dile-toast-persistent-gap, 1rem);
      }
      :host([center]:not([right])) {
        left: 50%;
        transform: translateX(-50%);
      }
      #toast {
        pointer-events: all;
        display: none;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity var(--dile-toast-persistent-transition, 0.5s ease),
                    transform var(--dile-toast-persistent-transition, 0.5s ease);
        box-sizing: border-box;
        color: var(--dile-toast-persistent-color, #fff);
        background-color: var(--dile-toast-persistent-background-color, #0e6ff5);
        border-radius: var(--dile-toast-persistent-border-radius, 0);
        max-width: var(--dile-toast-persistent-max-width, 300px);
        box-shadow: var(--dile-toast-persistent-box-shadow, 0 0 2px rgba(200, 200, 200, 0.5));
        padding: var(--dile-toast-persistent-padding, 1px);
        overflow: var(--dile-toast-persistent-overflow, visible);
      }
      #toast.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
  }

  static get properties() {
    return {
      opened: {
        type: Boolean,
        reflect: true,
      },
      right: {
        type: Boolean,
        reflect: true,
      },
      center: {
        type: Boolean,
        reflect: true,
      },
      openOnInit: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.right = false;
    this.center = false;
    this.openOnInit = false;
  }

  firstUpdated() {
    this._toastEl = this.shadowRoot.getElementById('toast');
    if (this.openOnInit) {
      setTimeout(() => this.open(), 200);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('opened')) {
      if (this.opened) {
        this._show();
      } else if (changedProperties.get('opened') !== undefined) {
        this._hide();
      }
    }
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  toggle() {
    this.opened = !this.opened;
  }

  _show() {
    this._toastEl.style.display = 'block';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._toastEl.classList.add('visible');
        this.dispatchEvent(new CustomEvent('overlay-opened', { bubbles: true, composed: true }));
      });
    });
  }

  _hide() {
    this._toastEl.classList.remove('visible');
    this.dispatchEvent(new CustomEvent('overlay-closed', { bubbles: true, composed: true }));
    setTimeout(() => {
      if (!this.opened) {
        this._toastEl.style.display = 'none';
      }
    }, 500);
  }

  render() {
    return html`
      <div id="toast">
        <slot></slot>
      </div>
    `;
  }
}
