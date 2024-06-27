import { LitElement, html, css } from 'lit';
import { DileEmmitChange } from '../../../mixins/form/index.js';

export class DileRange extends DileEmmitChange(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
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
        background-color: var(--dile-range-line-color, #7BB93D);
        border-radius: 0.5rem;
        height: var(--dile-range-line-height, 0.5rem);
      }

      /* slider thumb */
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        margin-top: var(--dile-range-thumb-margin-top, -8px); /* Centers thumb on the track */
        background-color: var(--dile-range-thumb-color, #303030);
        border-radius: var(--dile-range-thumb-border-radius, 2rem);
        height: var(--dile-range-thumb-height, 1.5rem);
        width: var(--dile-range-thumb-width, 1.5rem);
      }

      input[type="range"]:focus::-webkit-slider-thumb {
        outline: 3px solid var(--dile-range-thumb-color, #303030);
        outline-offset: 0.125rem;
      }

      /*********** Firefox styles ***********/
      /* slider track */
      input[type="range"]::-moz-range-track {
        background-color: var(--dile-range-line-color, #7BB93D);
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

  static get properties() {
    return {
      max: { type: Number },
      min: { type: Number },
      step: { type: Number },
      value: { type: Number },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.max = 10;
    this.min = 0;
    this.step = 1;
    this.value = 1;
  }

  render() {
    return html`
      <input 
        type="range" 
        id="${this.name}" 
        name="${this.name}" 
        min="${this.min}" 
        max="${this.max}" 
        step="${this.step}" 
        value="${this.value}"
        @input="${this.rangeChanged}"
      >
    `;
  }

  rangeChanged(e) {
    this.value = e.target.value;
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.emmitChange();
    }
  }
  
}
