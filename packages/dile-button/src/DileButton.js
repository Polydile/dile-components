import { html, css, LitElement } from "lit-element";

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
        padding-top: var(--dile-button-padding-y, 0.5rem);
        padding-bottom: var(--dile-button-padding-y, 0.5rem);
        padding-right: var(--dile-button-padding-x, 0.8rem);
        padding-left: var(--dile-button-padding-x, 0.8rem);
        border-radius: var(--dile-button-border-radius, 2px);
        border-width:  var(--dile-button-border-width, 1px);
        border-color:  var(--dile-button-border-color, #666666);
        background-color: var(--dile-button-background-color, #f5f5f5);
        transition-property: background-color, color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        border-style: solid;
        color: var(--dile-button-text-color, #303030); 
        font-size: var(--dile-button-font-size, 1rem);
      }
      button:hover {
        background-color: var(--dile-button-hover-background-color, #b1ecf7);
        color: var(--dile-button-hover-text-color, #303030);
      }
      button:focus {
        outline: none;
        box-shadow: 0 0 0 calc(0px + var(--dile-button-ring-offset-width, 3px)) var(--dile-button-ring-color, #12c9e9);
        border-color: var(--dile-button-ring-color, #12c9e9);
      }

      :host([disabled]) button {
        background-color: #ccc;
        border-color: #aaa;
        border-style: none;
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
