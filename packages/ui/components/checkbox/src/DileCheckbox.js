import { html, css, LitElement } from "lit";
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { checkboxBlankIcon, checkboxCheckedIcon } from '@dile/icons';
import '../../icon/icon.js';
import '../../input/input-message.js';

export class DileCheckbox extends DileEmmitChange(LitElement) {
  static get properties() {
    return {
      checked: { type: Boolean, reflect: true, },
      disabled: { type: Boolean, reflect: true, },
      _hasInner: { type: Boolean },
      name: { type: String, reflect: true, },
      message: { type: String },
      errored: { type: Boolean },
      hideErrorOnInput: { type: Boolean },
    };
  }

  static get formAssociated() {
    return true;
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.name = '';
    this.internals = this.attachInternals();
    this.message = '';
    this._id = `dile-checkbox-${Math.random().toString(36).substr(2, 9)}`;
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
      .checkbox:focus-visible {
        outline: var(--dile-checkbox-focus-outline, 2px solid #4A90E2);
        outline-offset: 2px;
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
        <span
          role="checkbox"
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled ? "true" : "false"}"
          aria-labelledby="${ifDefined(this._hasInner ? `${this._id}-label` : undefined)}"
          aria-describedby="${ifDefined(this.message ? `${this._id}-message` : undefined)}"
          tabindex="${this.disabled ? "-1" : "0"}"
          @keydown="${this.doKeyDown}"
          class="checkbox ${this.checked ? "isChecked" : "isUnchecked"}"
        >
          ${this.checked ? this.checkedIcon : this.unCheckedIcon}
        </span>
        ${this.innerTemplate}
      </div>
      ${this.message
        ? html`<dile-input-message id="${this._id}-message" message="${this.message}" ?errored=${this.errored}></dile-input-message>`
        : ''
      }
    `;
  }

  get innerTemplate() {
    return html`
      ${this._hasInner
        ? html` <label id="${this._id}-label" class="label">
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
    if(this.hideErrorOnInput && this.errored) {
      this.message = '';
      this.errored = false;
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

  doKeyDown(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      e.preventDefault();
      this.doClick();
    }
  }

  clear() {
    this.checked = false;
  }
}
