import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import '../radio.js';
import '../../input/input-message.js';
import { labelStyles } from '../../input/index.js';

const NAVIGATION_KEYS = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];

export class DileRadioGroup extends DileEmmitChange(LitElement) {
  static styles = [
    labelStyles,
    css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      :host([disabled]) {
        --dile-radio-icon-color: var(--dile-radio-disabled-icon-color, #ccc);
      }
    `
  ];

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String, reflect: true },
      message: { type: String },
      errored: { type: Boolean },
      hideErrorOnInput: { type: Boolean },
      disabled: { 
        type: Boolean,
        reflect: true
      },
    };
  }

  constructor() {
    super();
    this.init = false;
    this.disabled = false;
    this.internals = this.attachInternals();
    this.message = '';
    this._id = `dile-radio-group-${Math.random().toString(36).substr(2, 9)}`;
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.init) {
      this.doSelection(this.value);
      this.emmitChange();
      this.dispatchChangeEvent();
      this.internals.setFormValue(this.value);
    }
    if(changedProperties.has('disabled')) {
      this.propagateDisabled();
    }
  }

  firstUpdated() {
    this.init = true;
    if(this.value !== undefined) {
      setTimeout(() => {
        this.doSelection(this.value);
      }, 200);
    } else {
      this.updateTabbable(this.getRadios());
    }
  }

  render() {
    return html`
      <div
        role="radiogroup"
        aria-labelledby="${ifDefined(this.label ? `${this._id}-label` : undefined)}"
        aria-describedby="${ifDefined(this.message ? `${this._id}-message` : undefined)}"
        aria-invalid="${this.errored ? 'true' : 'false'}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        @dile-radio-selected=${this.changeValue}
        @keydown=${this.handleKeydown}
      >
        ${this.label
            ? html`<span class="label" id="${this._id}-label">${this.label}</span>`
            : ""
        }
        <slot></slot>
      </div>
      ${this.message
        ? html`<dile-input-message id="${this._id}-message" message="${this.message}" ?errored=${this.errored}></dile-input-message>`
        : ''
      }
    `;
  }

  changeValue(e) {
    if(!this.disabled) {
      if(this.hideErrorOnInput && this.errored) {
        this.message = '';
        this.errored = false;
      }
      this.value = e.detail.value;
    }
  }

  doSelection(newValue) {
    let numSelected = 0;
    const radios = this.getRadios();
    radios.forEach(radio => {
      if (radio.value === newValue) {
        radio.selected = true;
        numSelected++;
      } else {
        radio.selected = false;
      }
    });
    if (numSelected > 1) {
      throw new Error('More than one radio selected because have same value')
    }
    this.updateTabbable(radios);
  }

  getRadios() {
    return Array.from(this.querySelectorAll('dile-radio'));
  }

  updateTabbable(radios) {
    if (!radios.length) return;
    const selectedIndex = radios.findIndex(radio => radio.selected);
    const tabbableIndex = selectedIndex !== -1 ? selectedIndex : 0;
    radios.forEach((radio, index) => {
      radio.tabbable = index === tabbableIndex;
    });
  }

  propagateDisabled() {
    this.getRadios().forEach(radio => {
      radio.disabled = this.disabled;
    });
  }

  getFocusableIndex(items, key, currentIndex) {
    const count = items.length;
    if (!count) return -1;
    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        return (currentIndex + 1) % count;
      case 'ArrowUp':
      case 'ArrowLeft':
        return (currentIndex - 1 + count) % count;
      case 'Home':
        return 0;
      case 'End':
        return count - 1;
      default:
        return -1;
    }
  }

  handleKeydown(e) {
    if (this.disabled) return;
    if (!NAVIGATION_KEYS.includes(e.key)) return;
    e.preventDefault();
    const radios = this.getRadios();
    if (!radios.length) return;
    const currentIndex = radios.findIndex(radio => radio.value === this.value);
    const nextIndex = currentIndex === -1
      ? (e.key === 'End' ? radios.length - 1 : 0)
      : this.getFocusableIndex(radios, e.key, currentIndex);
    if (nextIndex === -1) return;
    const nextRadio = radios[nextIndex];
    if (nextRadio.disabled) return;
    nextRadio.focus();
    this.value = nextRadio.value;
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('dile-radio-group-changed', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    }));
  }
}
