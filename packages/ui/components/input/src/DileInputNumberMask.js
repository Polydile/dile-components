import { DileInput } from '../../input/index.js';
import { Mask } from './Mask.js';

export class DileInputNumberMask extends DileInput {

  static get properties() {
    return {
      ...super.properties,
      mask: { type: String },
      maskedValue: { type: String },
    };
  }

  constructor() {
    super();
    this.mask = ''; 
    this.maskedValue = '';
    this.content = '';
    this._keyDownHandler = this.handleKeyDown.bind(this);
  }

  firstUpdated() {
    super.firstUpdated();
    this.createMaskController(this.mask);
    if (this.el) {
      this.el.addEventListener('keydown', this._keyDownHandler);
    }
  }

  createMaskController(mask) {
    this.maskController = new Mask(mask);
    this.maxChars = this.maskController.getNumberCharactersOnPattern();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('mask')) {
      this.maskController.setPattern(this.mask);
      this.updateMaskedValue();
    }
    if (changedProperties.has('value')) {
      this.content = this.value.slice(0, this.maxChars);
      this.updateMaskedValue();
    }
  }

  disconnectedCallback() {
    if (this.el) {
      this.el.removeEventListener('keydown', this._keyDownHandler);
    }
    super.disconnectedCallback();
  }

  updateMaskedValue() {
    this.maskedValue = this.maskController.maskIt(this.content);
  }

  computeValue(value) {
    return this.maskedValue;
  }

  _input(e) {
    const inputElement = e.target;
    const cursorPos = inputElement.selectionStart;
    
    const inputValue = inputElement.value;
    const numericOnly = inputValue.replace(/\D/g, '').slice(0, this.maxChars);
    
    this.content = numericOnly;
    this.updateMaskedValue();
    this.value = numericOnly;
    
    inputElement.value = this.maskedValue;
    
    this.restoreCursorPosition(inputElement, inputValue, cursorPos);
    
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  /**
   * Restores cursor position after formatting the value.
   * Counts how many numeric digits were before the cursor and positions it at the same count in the masked value.
   */
  restoreCursorPosition(inputElement, oldValue, oldCursorPos) {
    const beforeCursor = oldValue.substring(0, oldCursorPos);
    const numericBeforeCursor = beforeCursor.replace(/\D/g, '').length;
    
    let numbersFound = 0;
    let newCursorPos = 0;
    
    for (let i = 0; i < this.maskedValue.length; i++) {
      if (this.isNumeric(this.maskedValue[i])) {
        if (numbersFound === numericBeforeCursor) {
          newCursorPos = i;
          break;
        }
        numbersFound++;
      }
      newCursorPos = i + 1;
    }
    
    inputElement.setSelectionRange(newCursorPos, newCursorPos);
  }

  handleKeyDown(e) {
    const inputElement = this.el;
    if (e.target !== inputElement) return;
    
    const key = e.key;
    
    if (this.isNumeric(key)) return;
    
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter'];
    if (allowedKeys.includes(key)) return;
    
    if (e.ctrlKey || e.metaKey) return;
    
    e.preventDefault();
  }

  isNumeric(char) {
    return !isNaN(char - parseInt(char));
  }

}
