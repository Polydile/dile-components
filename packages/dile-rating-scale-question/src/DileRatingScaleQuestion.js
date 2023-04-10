import { LitElement, html, css } from 'lit';
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin';

export class DileRatingScaleQuestion extends DileEmmitChangeMixin(LitElement)  {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
      :host([disabled]) {
        opacity: .3;
      }
      * {
        box-sizing: border-box;
        scrollbar-width: thin;
      }
      fieldset {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        //border-bottom: 1px solid #dddfe2;
        max-width: 400px;
        min-width: 0;
        margin: 35px 0 0;
        padding: 0 0 20px;
        transition: opacity .5s ease-in-out;
        width: 100%;
      }
      legend {
        display: table;
        scrollbar-width: thin;
        text-align: center;
        box-sizing: border-box;
        color: inherit;
        max-width: 100%;
        padding: 0;
        white-space: normal;
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.5;
        margin-bottom: 0;
      }
      legend span {
        color: #576071;
        font-weight: 600;
        line-height: 1.5;
        text-align: center;
      }
      .group_options {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 30px 0 0;
      }
      .radios {
        flex: 0 0 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .captions {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-grow: 1;
        margin: 15px 0;
        text-transform: uppercase;
      }
      .caption-mobile {
        font-size: .8em;
        letter-spacing: 0;
        line-height: normal;
        max-width: 47%;
        font-weight: 600;
      }
      .caption-desktop {
        display: none;
      }
      .text-leftColor {
        color: var(--dile-rating-scale-color-left,#4db6ac);
      }
      .text-rightColor {
        color: var(--dile-rating-scale-color-right,#ff8a65);
      }

      @media (min-width: 768px){
        fieldset {
          max-width: none;
        }
        .group_options {
           flex-wrap: nowrap;
           margin-bottom: 20px;
        }
        .caption-mobile {
          display: none;
        }
        .caption-desktop{
          display: block;
          font-size: 1em;
          letter-spacing: 0;
          line-height: normal;
          font-weight: 600;
          flex-shrink:0;
        }
        .radios {
          flex: 0 0 10rem;
          margin: 0 30px;
        }
        legend span {
          font-size: 1.2em;
        }
      }
    `
  ];

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String },
      scale_left_label: { type: String },
      scale_neutral_label: { type: String },
      scale_right_label: { type: String },
      scale_point: { type: Number },
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
    this.scale_left_label="Agree";
    this.scale_neutral_label = "Neutral";
    this.scale_right_label="Disagree";
    this.scale_point=7; //7, 5, 3
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.init) {
      this.doSelection(this.value);
      this.emmitChange();
      this.dispatchChangeEvent();
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
    this.getOptions();
    return html`<fieldset @dile-rating-scale-option-selected=${this.changeValue}>
                    <legend><span>${this.label}</span></legend>
                    <div class="group_options">
                    <div class="caption-desktop text-leftColor">${this.scale_left_label}</div>
                    <div class="radios">
                      ${this.options.map( (option) => html`
                            <dile-rating-scale-option label="${option.label}" value="${option.value}" size="${option.size}" color="${option.color}"></dile-rating-scale-option>`
                      )}
                    </div>
                    <div class="caption-desktop text-rightColor">${this.scale_right_label}</div>
                    <div class="captions">
                      <div class="caption-mobile text-leftColor">${this.scale_left_label}</div>
                      <div class="caption-mobile text-rightColor">${this.scale_right_label}</div>
                    </div>
                  </div>
                </fieldset>
    `;
  }

  getOptions(){
    let values = [3];
    if (this.scale_point>3){
      values.unshift(5);
    }
    if (this.scale_point>5){
      values.unshift(7);
    }
    let sizes = ["sizeBigger", "sizeBig", "sizeSmall", "sizeSmaller"];
    let sizeIndex = 0;
    this.options = []
    for(let i = 0; i < values.length; i++ ){
      this.options.push({
        label: '',
        value: values[i],
        size: sizes[sizeIndex],
        color: "leftColor"
      });
      sizeIndex++;
    }
    this.options[0].label = this.scale_left_label;

    this.options.push({
      label: this.scale_neutral_label,
      value: 0,
      size: sizes[sizeIndex],
      color: "neutralColor"
    });
    sizeIndex--;

    for(let i = values.length-1; i >= 0; i--){
      this.options.push({
        label: '',
        value: values[i]*-1,
        size: sizes[sizeIndex],
        color: "rightColor"
      });
      sizeIndex--;
    }
    this.options[this.options.length-1].label = this.scale_right_label;
  }

  changeValue(e) {
    if(!this.disabled) {
      this.value = e.detail.value;
      console.log(this.value);
    }
  }

  doSelection(newValue) {
    this.shadowRoot.querySelectorAll('dile-rating-scale-option').forEach(option => {
      if (option.value === newValue) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
  }

  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('dile-rating-scale-question-changed', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        value: this.value
      }
    }));
  }
}
