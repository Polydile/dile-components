import { html, css, LitElement } from "lit";
import '../../spinner/spinner-icon.js';

export class DileButton extends LitElement {

  static formAssociated = true;

  static get properties() {
    return {
      disabled: { type: Boolean },
      loading: { type: Boolean, reflect: true },
      name: { type: String },
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.disabled = false;
    this.loading = false;
    this.type = "button";
    this._internals = this.attachInternals();
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        border-radius: var(--dile-button-border-radius, 2rem);
      }
      button {
        cursor: pointer;
        padding-top: var(--dile-button-padding-y, 0.5rem);
        padding-bottom: var(--dile-button-padding-y, 0.5rem);
        padding-right: var(--dile-button-padding-x, 0.8rem);
        padding-left: var(--dile-button-padding-x, 0.8rem);
        border-radius: var(--dile-button-border-radius, 2rem);
        border-width:  var(--dile-button-border-width, 3px);
        border-color:  var(--dile-button-border-color, var(--dile-primary-dark-color, #12354d));
        background-color: var(--dile-button-background-color, var(--dile-primary-color, #7BB93D));
        transition-property: background-color, color, border-color;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
        border-style: solid;
        color: var(--dile-button-text-color, var(--dile-on-primary-color, #fff)); 
        font-size: var(--dile-button-font-size, 1rem);
        font-weight: var(--dile-button-font-weight, bold);
        text-transform: var(--dile-button-text-transform, none);
        letter-spacing: var(--dile-button-letter-spacing, 0);
        user-select: none;
        box-shadow: var(--dile-button-box-shadow, none);
      }
      button:hover {
        background-color: var(--dile-button-hover-background-color, var(--dile-button-background-color, var(--dile-primary-light-color, #f3f3ae)));
        color: var(--dile-button-hover-text-color, var(--dile-button-text-color, var(--dile-on-primary-light-color, #303030)));
        border-color:  var(--dile-button-hover-border-color, var(--dile-button-border-color, var(--dile-primary-color, #666666)));
      }
      button:focus-visible {
        outline: 2px solid var(--dile-button-ring-color, #12c9e9);
        outline-offset: 2px;
        box-shadow: 0 0 0 calc(0px + var(--dile-button-ring-offset-width, 3px)) var(--dile-button-ring-color, #12c9e9);
        border-color: var(--dile-button-ring-color, #12c9e9);
      }

      :host([disabled]) button {
        cursor: auto;
        background-color: var(--dile-button-disabled-background-color, var(--dile-button-background-color, #ccc));
        color: var(--dile-button-disabled-text-color, var(--dile-button-text-color, #999));
        border-color: var(--dile-button-disabled-border-color, var(--dile-button-border-color, #bbb));
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
      :host([disabled]) {
        pointer-events: none;
      }

      :host([loading]) button {
        cursor: auto;
        background-color: var(--dile-button-disabled-background-color, var(--dile-button-background-color, #ccc));
        color: var(--dile-button-disabled-text-color, var(--dile-button-text-color, #999));
        border-color: var(--dile-button-disabled-border-color, var(--dile-button-border-color, #bbb));
      }
      :host([loading]) button:focus {
        outline: none;
        box-shadow: none;
      }
      :host([loading]) button:active {
        outline: none;
        border-color: #aaa;
        box-shadow: none;
      }
      :host([loading]) {
        pointer-events: none;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--dile-button-spinner-gap, 0.5rem);
      }
      dile-spinner-icon {
        --dile-icon-size: var(--dile-button-spinner-size, calc(var(--dile-button-font-size, 1rem) * 0.8));
        --dile-icon-color: var(--dile-on-primary-color, #fff);
      }
    `;
  }

  render() {
    return html`
      <button 
        @click=${this._onClick} 
        ?disabled=${this.disabled || this.loading}
        type=${this.type || "button"}
      >
        ${this.loading ? html`<dile-spinner-icon active></dile-spinner-icon>` : ''}
        <slot></slot>
      </button>
    `;
  }

  _onClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (this.type === "submit") {
      this._internals.form?.requestSubmit();
    } else if (this.type === "reset") {
      this._internals.form?.reset();
    }
  }
}
