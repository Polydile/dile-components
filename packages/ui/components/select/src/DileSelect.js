import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { labelStyles, messageStyles } from '../../input/index.js';

export class DileSelect extends DileEmmitChange(LitElement) {
  static get styles() {
    return [
      labelStyles,
      messageStyles,
      css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      * {
        box-sizing: border-box;
      }
      .select-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
      }
      ::slotted(select) {
        box-sizing: border-box;
        width: var(--dile-input-width, 100%);
        padding: var(--dile-input-padding,  7px 5px);
        padding-right: 30px;
        line-height: var(--dile-input-line-height, 1.5em);
        font-size: var(--dile-select-font-size, 0.875em);
        border-radius: var(--dile-input-border-radius, 5px);
        border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
        background-color: var(--dile-input-background-color, #fff);
        color: var(--dile-input-color, #303030);
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
      }
      .arrow-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-icon svg {
        width: 100%;
        height: 100%;
      }
      .arrow-icon path {
        fill: var(--dile-select-arrow-color, #303030);
      }
      :host(:focus-within) ::slotted(select) {
        outline: var(--dile-input-focus-ring-width, 3px) solid var(--dile-input-focus-ring-color, rgba(102, 170, 255, 0.5));
        outline-offset: calc(-1 * var(--dile-input-focus-ring-width, 3px));
        border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
      }
      ::slotted(select:focus-visible) {
        outline: var(--dile-input-focus-ring-width, 3px) solid var(--dile-input-focus-ring-color, rgba(102, 170, 255, 0.5));
        outline-offset: calc(-1 * var(--dile-input-focus-ring-width, 3px));
      }
      ::slotted(select.errored) {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      ::slotted(select[aria-invalid="true"]) {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      ::slotted(select.disabled) {
        background-color: #f5f5f5;
        border-color: var(--dile-input-disabled-border-color, #eee);
        cursor: not-allowed;
      }
      /* High contrast mode support (WCAG 2.2 2.1.3) */
      @media (forced-colors: active) {
        ::slotted(select) {
          border-width: var(--dile-input-border-width, 1px);
        }
        :host(:focus-within) ::slotted(select) {
          outline: 3px solid;
        }
        .arrow-icon {
          forced-color-adjust: none;
          color: CanvasText;
        }
      }
    `];
  }

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String, reflect: true },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
      quietOnStart: { type: Boolean },
    };
  }

  render() {
    const messageId = this.message ? `${this.selectId}-message` : null;
    const ariaDescribedBy = messageId ? messageId : null;
    
    return html`
      <div>
        ${this.label
          ? html`<label for="${this.selectId}">${this.label}</label>`
          : ""
        }
        <div class="select-wrapper">
          <slot name="select"></slot>
          <div class="arrow-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 448" enable-background="new 0 0 256 448">
              <path d="M255.9 168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2 0-7.9 1.6-11.2 4.8S0 163.8 0 168c0 4.4 1.6 8.2 4.8 11.4l112 112c3.1 3.1 6.8 4.6 11.2 4.6 4.4 0 8.2-1.5 11.4-4.6l112-112c3-3.2 4.5-7 4.5-11.4z"></path>
            </svg>
          </div>
        </div>
      </div>
      ${this.message 
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}" id="${messageId}" role="status" aria-live="polite"><span>${this.message}</span></div>`
        : ''
      }
    `;
  }

  get elselect() {
    return this.querySelector("select");
  }

  constructor() {
    super();
    this.errored = false;
    this.hideErrorOnInput = false;
    this.changeHandler = this.onChange.bind(this);
    this.quiet = false;
    this.internals = this.attachInternals();
    // Generate unique ID for label association
    this.selectId = `dile-select-${Math.random().toString(36).substr(2, 9)}`;
  }



  connectedCallback() {
    super.connectedCallback();
    if (!this.elselect) {
      throw new Error('Use dile-select with a select element in the slot "select"');
    } else {
      // Assign unique ID for label association (a11y)
      if (!this.elselect.id) {
        this.elselect.id = this.selectId;
      }
      this.elselect.addEventListener("change", this.changeHandler);
      this.updateSelectA11y();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.elselect) {
      this.elselect.removeEventListener("change", this.changeHandler);
    }
  }

  onChange(e) {
    this.value = e.target.value;
    if (this.hideErrorOnInput && this.errored) {
      this.errored = false;
      this.message = '';
    }
  }

  updated(changedProperties) {
    if(changedProperties.has("value")) {
      this.elselect.value = this.value;
      if (this.quiet) {
        this.quiet = false;
      } else {
        this.emmitChange();
      }
      this.internals.setFormValue(this.value);
    }
    if(changedProperties.has("disabled")) {
      this.elselect.disabled = this.disabled;
      this.elselect.classList.toggle("disabled", this.disabled);
      this.elselect.setAttribute("aria-disabled", this.disabled);
    }
    if(changedProperties.has("errored") || changedProperties.has("message")) {
      this.updateSelectA11y();
    }
  }

  updateSelectA11y() {
    if (!this.elselect) return;
    
    // Set aria-invalid when errored
    this.elselect.setAttribute("aria-invalid", this.errored);
    
    // Set aria-describedby when message exists
    const messageId = this.message ? `${this.selectId}-message` : null;
    if (messageId) {
      this.elselect.setAttribute("aria-describedby", messageId);
    } else {
      this.elselect.removeAttribute("aria-describedby");
    }
    
    // Update visual state
    this.elselect.classList.toggle("errored", this.errored);
  }

  firstUpdated() {
    this.quiet = this.quietOnStart;
    if(this.value) {
      this.elselect.value = this.value;
    } else {
      this.value = this.elselect.value;
    } 
  }

  clear() {
    this.value = undefined;
  }

  getOptionByValue(id) {
    let options = this.elselect.options;
    for(let i = 0; i < options.length; i++) {
      if(options[i].value === id) {
        return options[i];
      }
    }
  }

  quietChange(value) {
    if (value != this.value) {
      this.quiet = true;
      this.value = value;
    }
  }
}
