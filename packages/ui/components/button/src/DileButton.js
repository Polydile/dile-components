import { html, css, LitElement } from "lit";

export class DileButton extends LitElement {
  static get properties() {
    return {
      disabled: { type: Boolean },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.disabled = false;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      button {
        cursor: pointer;
        padding-top: var(--dile-button-padding-y, 0.5rem);
        padding-bottom: var(--dile-button-padding-y, 0.5rem);
        padding-right: var(--dile-button-padding-x, 0.8rem);
        padding-left: var(--dile-button-padding-x, 0.8rem);
        border-radius: var(--dile-button-border-radius, 2rem);
        border-width:  var(--dile-button-border-width, 3px);
        border-color:  var(--dile-primary-dark-color, #07193b);
        background-color: var(--dile-primary-color, #7BB93D);
        transition-property: background-color, color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        border-style: solid;
        color: var(--dile-on-primary-color, #fff); 
        font-size: var(--dile-button-font-size, 1rem);
        font-weight: var(--dile-button-font-weight, bold);
        text-transform: var(--dile-button-text-transform, none);
        letter-spacing: var(--dile-button-letter-spacing, 0);
      }
      button:hover {
        background-color: var(--dile-primary-light-color, #f3f3ae);
        color: var(--dile-button-hover-text-color, #303030);
        border-color:  var(--dile-button-hover-border-color, #666666);
      }
      button:focus {
        outline: none;
        box-shadow: 0 0 0 calc(0px + var(--dile-button-ring-offset-width, 3px)) var(--dile-button-ring-color, #12c9e9);
        border-color: var(--dile-button-ring-color, #12c9e9);
      }

      :host([disabled]) button {
        cursor: auto;
        background-color: var(--dile-button-disabled-background-color, #ccc);
        color: var(--dile-button-disabled-text-color, #999);
        border-color: var(--dile-button-disabled-border-color, #bbb);
      }
      :host([disabled]) button:focus {
        outline: none;
        box-shadow: none;

      }
      :host([disabled]) button:active {
        outline: none;
        border-color: #aaa;
        box-shadow: none;
      }
      button {
        user-select: none;
      }
    `;
  }

  render() {
    return html`
      <button @click="${this.doClick}"><slot></slot></button>
    `;
  }

  doClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
}
