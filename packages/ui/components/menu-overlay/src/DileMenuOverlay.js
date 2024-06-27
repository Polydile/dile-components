import { LitElement, html, css } from "lit";
import { DileOverlay } from "../../../mixins/overlay/index.js"
import { DileCloseDocumentClick } from "../../../mixins/close-document-click";

export class DileMenuOverlay extends DileOverlay(DileCloseDocumentClick(LitElement)) {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
      }
      #overlay {
        box-sizing: border-box;
        color: var(--dile-menu-overlay-color, #303030);
        z-index: var(--dile-menu-overlay-z-index, 999);
        background-color: var(--dile-menu-overlay-background-color, #fff);
        border-radius: var(--dile-menu-overlay-border-radius, 5px);
        width: var(--dile-menu-overlay-width, 280px);
        max-width: var(--dile-menu-overlay-max-width, 300px);
        box-shadow: var(--dile-menu-overlay-box-shadow, 0 0 20px rgba(102, 102, 102, 0.5));
        padding: var(--dile-menu-overlay-padding, 1px);
        display: none;
        position: absolute;
        opacity: 0;
        transition: var(--dile-menu-overlay-transition, ease 0.5s);
        transition-property: transform, opacity;
        transform: translateY(-10px);
      }
      #overlay.opened {
        opacity: 1;
        transform: translateY(0);
      }
      #trigger {
        display: flex;
      }
    `;
  }

  static get properties() {
    return {
      closeOnClickInside: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.closeOnClickInside = false;
  }

  render() {
    return html`
      <span @click="${this.toggle}" id="trigger">
        <slot name="trigger"></slot>
      </span>
      <div
        id="overlay"
        class="${this._overlayClass}"
        @click="${this.clickHandler}"
      >
        <slot name="content"></slot>
      </div>
    `;
  }

  clickHandler(e) {
    if(! this.closeOnClickInside) {
      e.stopPropagation();
    }
  }
}