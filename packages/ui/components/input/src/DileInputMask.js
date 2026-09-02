import { DileInput } from '../../input/index.js';
import { MaskPattern } from './MaskPattern.js';

export class DileInputMask extends DileInput {

  static get properties() {
    return {
      ...super.properties,
      mask: { type: String },
      maskedValue: { type: String },
      language: { type: String },
    };
  }

  constructor() {
    super();
    this.mask = '';
    this.maskedValue = '';
    this.content = '';
    this.language = 'en';
    this._keyDownHandler = this.handleKeyDown.bind(this);
    this._blurHandler = this.handleBlur.bind(this);
  }

  firstUpdated() {
    super.firstUpdated();
    this.createMaskController(this.mask);
    if (this.el) {
      this.el.addEventListener('keydown', this._keyDownHandler);
      this.el.addEventListener('blur', this._blurHandler);
    }
  }

  createMaskController(mask) {
    this.maskController = new MaskPattern(mask, this.language);
    this.maxChars = this.maskController.getTotalCharactersExpected();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('mask')) {
      this.maskController.setPattern(this.mask);
      this.maxChars = this.maskController.getTotalCharactersExpected();
      this.updateMaskedValue();
    }
    if (changedProperties.has('language')) {
      this.maskController.setLanguage(this.language);
    }
    if (changedProperties.has('value')) {
      const transformedValue = this.maskController.transformValue(this.value.slice(0, this.maxChars));
      this.content = transformedValue;
      this.updateMaskedValue();
    }
  }

  disconnectedCallback() {
    if (this.el) {
      this.el.removeEventListener('keydown', this._keyDownHandler);
      this.el.removeEventListener('blur', this._blurHandler);
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
    
    const inputValue = inputElement.value;
    const oldCursorPos = inputElement.selectionStart;
    
    const cleanValue = this.maskController.getCleanValue(inputValue).slice(0, this.maxChars);
    const transformedValue = this.maskController.transformValue(cleanValue);

    this.content = transformedValue;
    this.updateMaskedValue();
    this.value = transformedValue;

    inputElement.value = this.maskedValue;

    this.restoreCursorPosition(inputElement, inputValue, oldCursorPos);

    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  /**
   * Restores cursor position after formatting the value.
   * Positions it based on the count of alphanumeric characters entered.
   */
  restoreCursorPosition(inputElement, oldValue, oldCursorPos) {
    const beforeCursor = oldValue.substring(0, oldCursorPos);
    const cleanCharsBeforeCursor = beforeCursor.replace(/[^a-zA-Z0-9]/g, '').length;

    let charsFound = 0;
    let newCursorPos = 0;

    for (let i = 0; i < this.maskedValue.length; i++) {
      if (/[a-zA-Z0-9]/.test(this.maskedValue[i])) {
        if (charsFound === cleanCharsBeforeCursor) {
          newCursorPos = i;
          break;
        }
        charsFound++;
      }
      newCursorPos = i + 1;
    }

    inputElement.setSelectionRange(newCursorPos, newCursorPos);
  }

  handleKeyDown(e) {
    const inputElement = this.el;
    if (e.target !== inputElement) return;

    const key = e.key;

    if (this.isAllowedCharacter(key, inputElement)) return;

    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter'];
    if (allowedKeys.includes(key)) return;

    if (e.ctrlKey || e.metaKey) return;

    e.preventDefault();
  }

  handleBlur(e) {
    if (!this.maskController) return;

    const validation = this.maskController.validate(this.content);

    if (!validation.valid) {
      this.errored = true;
      this.message = validation.error || this.getInvalidFormatMessage();
    } else if (this.maskController.isComplete(this.content)) {
      this.clearError();
    }
  }

  getInvalidFormatMessage() {
    const messages = {
      en: `Invalid format. Expected: ${this.maskController.getFormatDescription()}`,
      es: `Formato inválido. Se espera: ${this.maskController.getFormatDescription()}`,
      fr: `Format invalide. Attendu: ${this.maskController.getFormatDescription()}`,
      de: `Ungültiges Format. Erwartet: ${this.maskController.getFormatDescription()}`,
      cat: `Format invàlid. S'espera: ${this.maskController.getFormatDescription()}`,
    };
    
    return messages[this.language] || messages['en'];
  }

  isAllowedCharacter(char, inputElement) {
    if (/[a-zA-Z0-9]/.test(char)) {
      // If there's a selection, user is replacing text, so allow it
      if (inputElement.selectionStart !== inputElement.selectionEnd) {
        return true;
      }
      // Otherwise only allow if we haven't reached max chars
      if (this.content.length < this.maxChars) {
        return true;
      }
    }
    return false;
  }
}
