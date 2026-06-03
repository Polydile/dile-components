import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js';
import '../select.js';

export class DileSelectBoolean extends DileEmmitChange(LitElement) {
  static get formAssociated() {
    return true;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      value: {},
      name: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
      quietOnStart: { type: Boolean },
      trueOption: { type: String },
      falseOption: { type: String },
    };
  }

  constructor() {
    super();
    this.trueOption = 'Yes';
    this.falseOption = 'No';
    this.errored = false;
    this.hideErrorOnInput = false;
    this.quiet = false;
    this.internals = this.attachInternals();
  }

  render() {
    return html`
      <dile-select
        label="${this.label || ''}"
        ?errored="${this.errored}"
        message="${this.message || ''}"
        ?disabled="${this.disabled}"
        quietOnStart
        @element-changed="${this._onInnerChange}"
      >
        <select slot="select">
          <option value="true">${this.trueOption}</option>
          <option value="false">${this.falseOption}</option>
        </select>
      </dile-select>
    `;
  }

  get _innerSelect() {
    return this.shadowRoot.querySelector('dile-select');
  }

  firstUpdated() {
    this.quiet = this.quietOnStart;
    const inner = this._innerSelect;
    if (this.value !== undefined && this.value !== null) {
      inner.quietChange(this.value ? 'true' : 'false');
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      const inner = this._innerSelect;
      if (inner) {
        if (this.value !== undefined && this.value !== null) {
          inner.quietChange(this.value ? 'true' : 'false');
        } else {
          inner.clear();
        }
      }
      this.internals.setFormValue(this.value ? 'on' : null);
      if (this.quiet) {
        this.quiet = false;
      } else {
        this.emmitChange();
      }
    }
  }

  _onInnerChange(e) {
    e.stopPropagation();
    const boolValue = e.detail.value === 'true';
    if (boolValue !== this.value) {
      this.value = boolValue;
      if (this.hideErrorOnInput && this.errored) {
        this.errored = false;
        this.message = '';
      }
    }
  }

  clear() {
    this.value = undefined;
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }
}
