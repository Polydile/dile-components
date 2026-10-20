import { html, css, LitElement } from "lit";
import { DileSelectable } from "../../../mixins/selectable/index.js";

export class DileBottomNav extends DileSelectable(LitElement) {
  static get properties() {
    return {
      /**
       * If true the bar is not fixed at the bottom of the viewport, it is rendered in the document flow.
       */
      static: { type: Boolean, reflect: true },
      /**
       * Accessible name of the navigation landmark.
       */
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.static = false;
    this.label = 'Main navigation';
    this.sheetOpenedHandler = this._closeOtherSheets.bind(this);
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: var(--dile-bottom-nav-z-index, 100);
        background-color: var(--dile-bottom-nav-background-color, var(--dile-background-color, #fff));
        border-top: var(--dile-bottom-nav-border-top, 1px solid rgba(0, 0, 0, 0.1));
        box-shadow: var(--dile-bottom-nav-box-shadow, 0 -2px 8px rgba(0, 0, 0, 0.08));
        padding-bottom: env(safe-area-inset-bottom, 0);
      }
      :host(:not([static])) {
        /* Set while a bottom sheet locks the page scroll, so the items don't move when the scrollbar disappears. */
        padding-right: var(--dile-bottom-nav-scrollbar-width, 0px);
      }
      :host([static]) {
        position: relative;
      }
      nav {
        display: flex;
        align-items: stretch;
        height: var(--dile-bottom-nav-height, 56px);
        max-width: var(--dile-bottom-nav-max-width, none);
        margin: 0 auto;
      }
      ::slotted(*) {
        flex: 1 1 0;
        min-width: 0;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('dile-bottom-nav-sheet-opened', this.sheetOpenedHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('dile-bottom-nav-sheet-opened', this.sheetOpenedHandler);
  }

  render() {
    return html`
      <nav aria-label="${this.label}">
        <slot></slot>
      </nav>
    `;
  }

  _closeOtherSheets(e) {
    this.getItems().forEach(item => {
      if (item !== e.detail.item && item.opened && typeof item.close === 'function') {
        item.close();
      }
    });
  }
}
