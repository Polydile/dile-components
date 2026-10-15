import { html, css } from 'lit';
import { DileInput } from '@dile/ui/components/input/index.js';
import '../../phone-prefix-select/phone-prefix-select.js';
import {
  getPhonePrefix,
  getMainCountryForPrefix,
  splitPhoneNumber,
} from '../../phone-prefix-select/src/phonePrefixesData.js';

const PREFIX_PLACEHOLDERS = {
  es: 'Prefijo',
  en: 'Prefix',
};

// E.164: up to 15 digits in total, prefix included.
const MAX_DIGITS = 15;
const MIN_NUMBER_DIGITS = 4;

/**
 * Phone number input with an optional searchable selector of international prefixes.
 *
 * - With prefix (default): the value is the international number in E.164 format, without
 *   spaces: "+34600123456".
 * - With `noPrefix`: there is no prefix selector and the value is the number typed by the user,
 *   without spaces or separators: "600123456".
 */
export class DileInputPhone extends DileInput {

  static get properties() {
    return {
      /** Hides the prefix selector. The value is then the plain number. */
      noPrefix: { type: Boolean },
      /** ISO code of the country of the prefix. Set it to preselect a default prefix. */
      country: { type: String },
      /** Language of the prefix selector: 'es' or 'en' */
      language: { type: String },
      /** ISO codes of the countries listed first in the prefix selector, separated by "|" */
      priorityCountries: { type: String, attribute: 'priority-countries' },
      /** Placeholder of the prefix selector */
      prefixPlaceholder: { type: String },
      /** Number as typed by the user, shown in the input field */
      _typedNumber: { state: true },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        section.for-input {
          gap: var(--dile-input-phone-gap, 0.5rem);
          align-items: stretch;
        }
        dile-phone-prefix-select {
          flex: 0 0 var(--dile-input-phone-prefix-width, 6.5rem);
          --dile-select-overlay-min-width: var(--dile-input-phone-list-width, 16rem);
          min-width: 0;
          margin-bottom: 0;
        }
        input {
          min-width: 0;
        }
      `
    ];
  }

  constructor() {
    super();
    this.type = 'tel';
    this.noPrefix = false;
    this.language = 'en';
    this.priorityCountries = '';
    this._typedNumber = '';
    this._internalValueChange = false;
  }

  /** Prefix of the selected country, like "+34" */
  get prefix() {
    return this.noPrefix ? undefined : getPhonePrefix(this.country);
  }

  /** Digits of the number, without the prefix */
  get number() {
    const raw = this._typedNumber.trim();
    const split = splitPhoneNumber(raw);
    return split ? split.number : raw.replace(/\D/g, '');
  }

  get prefixSelect() {
    return this.shadowRoot.querySelector('dile-phone-prefix-select');
  }

  willUpdate(changedProperties) {
    super.willUpdate?.(changedProperties);
    if (!this.hasUpdated) {
      this._initialCountry = this.country;
    }
    // A country set from outside changes the prefix of the number already typed.
    if (this.hasUpdated && changedProperties.has('country') && !changedProperties.has('value')) {
      this.updateValueFromParts();
    }
    if (changedProperties.has('value')) {
      if (this._internalValueChange) {
        this._internalValueChange = false;
      } else {
        this.parseValue(this.value);
      }
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    // The prefix selector only reacts to a country being set, so it has to be cleared explicitly.
    if (changedProperties.has('country') && !this.country && this.prefixSelect?.value) {
      this.prefixSelect.clear();
    }
  }

  render() {
    return html`
      <main>
        ${this.label
          ? html`<label for="textField">${this.label}</label>`
          : ""}
        <section class="for-input">
          ${this.noPrefix ? '' : this.prefixTemplate}
          <input
            type="tel"
            inputmode="tel"
            id="textField"
            name="${this.name}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            autocomplete="${this.computeAutocomplete()}"
            .value="${this._typedNumber}"
            class="${this.errored ? 'errored' : ''}"
            @keypress="${this._lookForEnter}"
            @input="${this._input}"
            @blur="${this.doBlur}"
            @focus="${this.doFocus}"
          />
          ${this.labelRight
            ? html`<span class="labelright">${this.labelRight}</span>`
            : ''
          }
        </section>
        ${this.messageTemplate}
      </main>
    `;
  }

  get prefixTemplate() {
    return html`
      <dile-phone-prefix-select
        .country=${this.country}
        prefixFirst
        compact
        language="${this.language}"
        priority-countries="${this.priorityCountries}"
        placeholder="${this.prefixPlaceholder || PREFIX_PLACEHOLDERS[this.language] || PREFIX_PLACEHOLDERS.en}"
        ?disabled=${this.disabled}
        ?errored=${this.errored}
        @dile-phone-prefix-changed=${this.onPrefixChanged}
        @element-changed=${this.stopEvent}
        @dile-phone-prefix-select-selected-text-changed=${this.stopEvent}
      ></dile-phone-prefix-select>
    `;
  }

  computeAutocomplete() {
    if (this.disableAutocomplete) {
      return 'off';
    }
    return this.noPrefix ? 'tel' : 'tel-national';
  }

  stopEvent(e) {
    e.stopPropagation();
  }

  _input(e) {
    // Only characters used to write phone numbers are allowed
    const filtered = e.target.value.replace(/[^\d\s+\-().]/g, '');
    if (filtered !== e.target.value) {
      e.target.value = filtered;
    }
    this._typedNumber = filtered;
    this.updateValueFromParts();
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  onPrefixChanged(e) {
    e.stopPropagation();
    const country = e.detail.country;
    if (country === this.country) {
      return;
    }
    this.country = country;
    this.updateValueFromParts();
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
  }

  /** A full international number typed in the field is moved to the prefix selector. */
  doBlur() {
    if (this.noPrefix) {
      return;
    }
    const split = splitPhoneNumber(this._typedNumber);
    if (split) {
      this.country = this.countryForPrefix(split.prefix);
      this._typedNumber = split.number;
    }
  }

  countryForPrefix(prefix) {
    if (this.country && getPhonePrefix(this.country) === prefix) {
      return this.country;
    }
    return getMainCountryForPrefix(prefix);
  }

  /** Splits a value received from outside into the prefix and the number to display. */
  parseValue(value) {
    const raw = value === undefined || value === null ? '' : String(value).trim();
    if (!this.noPrefix) {
      const split = splitPhoneNumber(raw);
      if (split) {
        this.country = this.countryForPrefix(split.prefix);
        this._typedNumber = split.number;
        return;
      }
    }
    this._typedNumber = raw;
  }

  /** Builds the value from the selected prefix and the typed number. */
  computePhoneValue() {
    const raw = this._typedNumber.trim();
    const digits = raw.replace(/\D/g, '');
    if (!digits) {
      return '';
    }
    if (raw.startsWith('+')) {
      return '+' + digits;
    }
    if (raw.startsWith('00')) {
      return '+' + digits.slice(2);
    }
    if (this.prefix) {
      return this.prefix + digits;
    }
    return digits;
  }

  updateValueFromParts() {
    const value = this.computePhoneValue();
    if (value !== this.value) {
      this._internalValueChange = true;
      this.value = value;
    }
  }

  /**
   * Basic check of the number: an empty value is valid (use your own "required" rule).
   * With prefix, the value must be international (a prefix chosen or typed) with up to
   * 15 digits. Without prefix, it must have between 4 and 15 digits.
   */
  isValid() {
    const value = this.value || '';
    if (value === '') {
      return true;
    }
    const digits = value.replace(/\D/g, '');
    if (digits.length > MAX_DIGITS) {
      return false;
    }
    if (this.noPrefix) {
      return digits.length >= MIN_NUMBER_DIGITS;
    }
    const split = splitPhoneNumber(value);
    return Boolean(split) && split.number.length >= MIN_NUMBER_DIGITS;
  }

  clear() {
    this._typedNumber = '';
    this.country = this._initialCountry;
    this.updateValueFromParts();
  }
}
