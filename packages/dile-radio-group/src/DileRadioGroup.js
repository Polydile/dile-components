import { LitElement, html, css } from 'lit';
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin'; 

export class DileRadioGroup extends DileEmmitChangeMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        margin-bottom: 10px;
      }
      .label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }
      :host([disabled]) {
        --dile-radio-icon-color: var(--dile-radio-disabled-icon-color, #ccc);
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String },
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
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.init) {
      this.doSelection(this.value);
      this.emmitChange();
    }
  }

  firstUpdated() {
    this.init = true;
    if(this.value !== undefined) {
      setTimeout(() => {
        this.doSelection(this.value);
      }, 200);
    }
  }
  
  render() {
    return html`
      <div @dile-radio-selected=${this.changeValue}>
        ${this.label
            ? html`<span class="label">${this.label}</span>`
            : ""
        }
        <slot></slot>
      </div>
    `;
  }

  changeValue(e) {
    if(!this.disabled) {
      this.value = e.detail.value;
    }
  }

  doSelection(newValue) {
    let numSelected = 0;
    this.querySelectorAll('dile-radio').forEach(radio => {
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
  }

}
