import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import '../../input/input-message.js';

export class DileRange extends DileEmmitChange(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 10px;
      }

      :host([errored]) {
        --dile-range-line-color: var(--dile-range-line-errored-color, #c00);
      }

      label {
        display: block;
        margin-bottom: var(--dile-input-label-margin-bottom, 4px);
        font-size: var(--dile-input-label-font-size, 1em);
        color: var(--dile-input-label-color, #59e);
        font-weight: var(--dile-input-label-font-weight, normal);
      }

      /*********** Baseline, reset styles ***********/
      input[type="range"] {
        -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
      }

      /* Removes default focus */
      input[type="range"]:focus {
        outline: none;
      }

      

      /******** Chrome, Safari, Opera and Edge Chromium styles ********/
      /* slider track */
      input[type="range"]::-webkit-slider-runnable-track {
        background-color: var(--dile-range-line-color, var(--dile-primary-color, #7BB93D));
        border-radius: 0.5rem;
        height: var(--dile-range-line-height, 0.5rem);
      }

      /* slider thumb */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: var(--dile-range-thumb-margin-top, -8px); /* Centers thumb on the track */
        background-color: var(--dile-range-thumb-color, var(--dile-on-background-color, #303030));
        border-radius: var(--dile-range-thumb-border-radius, 2rem);
        height: var(--dile-range-thumb-height, 1.5rem);
        width: var(--dile-range-thumb-width, 1.5rem);
      }

      input[type="range"]:focus::-webkit-slider-thumb {
        outline: 3px solid var(--dile-range-thumb-color, var(--dile-on-background-color, #303030));
        outline-offset: 0.125rem;
      }

      /*********** Firefox styles ***********/
      /* slider track */
      input[type="range"]::-moz-range-track {
        background-color: var(--dile-range-line-color, var(--dile-primary-color, #7BB93D));
        border-radius: 0.5rem;
        height: var(--dile-range-line-height, 0.5rem);
      }

      /* slider thumb */
      input[type="range"]::-moz-range-thumb {
        background-color: var(--dile-range-thumb-color, #303030);
        border: none; /*Removes extra border that FF applies*/
        border-radius: var(--dile-range-thumb-border-radius, 2rem);
        height: var(--dile-range-thumb-height, 1.5rem);
        width: var(--dile-range-thumb-width, 1.5rem);
      }

      input[type="range"]:focus::-moz-range-thumb{
        outline: 3px solid var(--dile-range-thumb-color, #303030);
        outline-offset: 0.125rem;
      }


    `;
  }

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      max: { type: Number },
      min: { type: Number },
      step: { type: Number },
      value: { type: Number },
      name: { type: String },
      label: { type: String },
      message: { type: String },
      errored: { type: Boolean, reflect: true },
      hideErrorOnInput: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.max = 10;
    this.min = 0;
    this.step = 1;
    this.value = 1;
    this.message = ""
    this.internals = this.attachInternals();
  }

  render() {
    return html`
      ${this.label
          ? html`<label for="inputrange">${this.label}</label>`
          : ""
      }
      <input 
        type="range" 
        id="inputrange" 
        name="${this.name}" 
        min="${this.min}" 
        max="${this.max}" 
        step="${this.step}" 
        value="${this.value}"
        @input="${this.rangeChanged}"
      >
      <dile-input-message ?errored="${this.errored}" message="${this.message}"></dile-input-message>
    `;
  }

  rangeChanged(e) {
    this.value = e.target.value;
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();  
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value);
    }
  }
  
  clearError() {
    this.errored = false;
    this.message = '';
  }
  
}
