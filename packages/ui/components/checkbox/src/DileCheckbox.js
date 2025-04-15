import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js'; 

export class DileCheckbox extends DileEmmitChange(LitElement) {
  static get properties() {
    return {
      checked: { type: Boolean, reflect: true, },
      disabled: { type: Boolean, reflect: true, },
      _hasInner: { type: Boolean },
      name: { type: String },
    };
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.checked = false;
    this.name = '';
    this.internals = this.attachInternals();
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      div.disabled {
        opacity: 0.5;
        cursor: auto;
      }
      .checkbox {
        display: flex;
        background-color: var(--dile-checkbox-checked-color, #30a030);
        border-radius: 4px;
        width: var(--dile-checkbox-size, 20px);
        height: var(--dile-checkbox-size, 20px);
        line-height: 0;
        align-items: center;
        justify-content: center;
      }
      .isUnchecked {
        background-color: var(--dile-checkbox-unchecked-color, #ccc);
      }
      path[fill="none"],
      .checked path[fill="none"] {
        fill: transparent;
      }
      path {
        fill: var(--dile-checkbox-fill-color, #fff);
      }
      .checked path {
        fill: var(--dile-checkbox-unchecked-fill-color, #fff);
      }
      svg {
        width: var(--dile-checkbox-size, 20px);
        height: var(--dile-checkbox-size, 20px);
        line-height: var(--dile-checkbox-size, 20px);
      }
      .label {
        margin-left: 10px;
        font-weight: var(--dile-checkbox-font-weight, normal);
        color: var(--dile-checkbox-label-color, var(--dile-on-background-color, #303030));
      }
      .disabled .label {
        color: var(--dile-checkbox-label-disabled-color, #777);
      }
    `;
  }

  firstUpdated() {
    this._hasInner = this.innerHTML.trim().length ? true : false;
  }

  get value() {
    return this.checked;
  }

  set value(value) {
    this.checked = value;
  }

  updated(changedProperties) {
    if (changedProperties.has("checked")) {
      this.emmitChange();
      this.internals.setFormValue(this.checked ? 'true' : null);
    }
  }

  render() {
    return html`
      <div @click="${this.doClick}" class="${this.disabled ? "disabled" : ""}">
        <a href="#" @click="${this.linkClick}" @keypress="${this.doKeyPress}" class="checkbox ${this.checked ? "isChecked" : "isUnchecked"}">
          ${this.checked ? this.checkedIcon : this.unCheckedIcon}
        </a>
        ${this.innerTemplate}
      </div>
    `;
  }

  get innerTemplate() {
    return html`
      ${this._hasInner
        ? html` <label class="label">
            <slot></slot>
          </label>`
        : ""
      }
    `
  }
  
  doClick() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent("dile-checkbox-changed", {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          name: this.name,
        }
      })
    );
  }

  get checkedIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      />
    </svg>`;
  }
  get unCheckedIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
      />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>`;
  }

  doKeyPress(e) {
    e.preventDefault();
    if (e.keyCode == 32 || e.code == "Space") {
      this.doClick();
    }
  }
  
  linkClick(e) {
    e.preventDefault();
  }

  clear() {
    this.checked = false;
  }
}
