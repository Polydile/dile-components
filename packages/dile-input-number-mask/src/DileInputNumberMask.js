import { LitElement, html } from 'lit-element';
import { DileInput } from '@dile/dile-input';
import { Mask } from './Mask';

export class DileInputNumberMask extends DileInput {

  static get properties() {
    return {
      mask: { type: String },      
    };
  }

  constructor() {
    super();
    this.mask = ''; 
  }

  firstUpdated() {
    this.content = '';
    this.createMaskController(this.mask);
  }

  createMaskController(mask) {
    this.maskController = new Mask(mask);
    this.maxChars = this.maskController.getNumberCharactersOnPattern();
  }

  updated(changedProperties) {
    if (changedProperties.has('mask')) {
      console.log('has mask', this, this.maxChars);
      this.maskController.setPattern(this.mask);
      this.updateValue();
    }
  }

  updateValue() {
    this.value = this.maskController.maskIt(this.content);
  }
  render() {
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <input
        type="text"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @keypress="${this._lookForEnter}"
        @keydown="${this.doKeyDown}"
        @input="${this._input}"
        .value="${this.value}"
        class="${ this.errored ? 'errored' : '' }">
    </div>
    `;
  }

  doKeyDown(e) {
    e.preventDefault();
    if (this.isNumeric(e.key) && this.content.length < this.maxChars) {
      this.content += e.key;
    }
    if (e.keyCode == 8) {
      if (this.content.length > 0) {
        this.content = this.content.substr(0, this.content.length - 1);
      }
    }
    this.updateValue();
  }

  isNumeric(char) {
    return !isNaN(char - parseInt(char));
  }

}
