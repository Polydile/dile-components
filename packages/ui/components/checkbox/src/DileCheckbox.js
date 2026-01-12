import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js'; 
import { checkboxBlankIcon, checkboxCheckedIcon } from '@dile/icons';
import '../../icon/icon.js';

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
        --dile-icon-size: var(--dile-checkbox-size, 20px);
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
        --dile-icon-color: var(--dile-checkbox-checked-color, #30a030);
        align-items: center;
        justify-content: center;
      }
      .isUnchecked {
        --dile-icon-color: var(--dile-checkbox-unchecked-color, var(--dile-on-background-color, #303030));
      }
      .label {
        margin-left: var(--dile-checkbox-label-margin-left, 0.25rem);
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
    if (changedProperties.has('checked')) {
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
    return html`<dile-icon .icon="${checkboxCheckedIcon}"></dile-icon>`;
  }
  get unCheckedIcon() {
    return html`<dile-icon .icon="${checkboxBlankIcon}"></dile-icon>`;
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
