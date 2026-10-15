import { DileSelectSearch } from '@dile/ui/components/select/index.js';
import {
  getPhonePrefix,
  getPhonePrefixCountries,
  getMainCountryForPrefix,
  normalizePhonePrefix,
} from './phonePrefixesData.js';

const TEXTS = {
  es: {
    placeholder: 'Busca un país o prefijo...',
    emptyMessage: 'No se encontraron resultados',
  },
  en: {
    placeholder: 'Search a country or prefix...',
    emptyMessage: 'No results found',
  },
};

/**
 * Searchable select of international phone prefixes.
 *
 * Internally there is one option per country (identified by its ISO code), but the public
 * `value` is the phone prefix ("+34"), which is what usually gets stored. The selected country
 * is available in `country`. When several countries share a prefix (+1, +7, +44...) and only
 * the prefix is known, the main country of that prefix is shown.
 */
export class DilePhonePrefixSelect extends DileSelectSearch {

  static get properties() {
    return {
      /** ISO code of the selected country */
      country: { type: String },
      /** Language of the country names and default texts: 'es' or 'en' */
      language: { type: String },
      /** ISO codes of the countries listed first, separated by "|". Example: "ES|MX|AR" */
      priorityCountries: { type: String, attribute: 'priority-countries' },
      /** Shows the prefix before the country name ("+34 Spain"), so it is still visible when the text is cut in narrow fields */
      prefixFirst: { type: Boolean },
      /** Once selected, shows only the prefix ("+34") instead of the full text, to save space */
      compact: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.language = 'en';
    this.priorityCountries = '';
    this.prefixFirst = false;
    this.compact = false;
    this.placeholder = undefined;
    this.emptyMessage = undefined;
  }

  get selectedTextChangedEventName() {
    return 'dile-phone-prefix-select-selected-text-changed';
  }

  connectSource() {
    this.readSourceOptions();
  }

  readSourceOptions() {
    const countries = getPhonePrefixCountries(this.language);
    const priorityIsos = (this.priorityCountries || '')
      .split('|')
      .map(iso => iso.trim().toUpperCase())
      .filter(Boolean);
    const priority = priorityIsos
      .map(iso => countries.find(c => c.iso === iso))
      .filter(Boolean);
    const others = countries.filter(c => !priorityIsos.includes(c.iso));
    this.sourceOptions = [...priority, ...others].map(country => ({
      value: country.iso,
      text: this.formatOptionText(country),
      prefix: country.prefix,
      names: [country.name, ...country.aliases],
    }));
  }

  /**
   * Template method: text displayed for each country, in the list and once selected.
   * @param {{iso: string, name: string, prefix: string, aliases: string[]}} country
   */
  formatOptionText(country) {
    if (this.prefixFirst) {
      return `${country.prefix} ${country.name}`;
    }
    return `${country.name} (${country.prefix})`;
  }

  /**
   * Template method: text displayed once a country is selected.
   * @param {{value: string, text: string, prefix: string, names: string[]}} option
   */
  formatSelectedText(option) {
    return this.compact ? option.prefix : option.text;
  }

  /** With compact, the visible text is only the prefix: screen readers also get the country. */
  get selectedAccessibleLabel() {
    if (this.compact && this.selectedFullText) {
      return [this.label, this.selectedFullText].filter(Boolean).join(', ');
    }
    return super.selectedAccessibleLabel;
  }

  /**
   * Numeric keywords ("3", "+34") match the beginning of the prefix.
   * Other keywords match any of the country names, ignoring case and accents.
   */
  filterOption(option, keyword) {
    const trimmed = keyword.trim();
    if (/^\+?\d+$/.test(trimmed)) {
      return option.prefix.startsWith(normalizePhonePrefix(trimmed));
    }
    const normalizedKeyword = this.normalizeSearchText(trimmed);
    return option.names.some(name => this.normalizeSearchText(name).includes(normalizedKeyword));
  }

  willUpdate(changedProperties) {
    super.willUpdate?.(changedProperties);
    if (changedProperties.has('language') || changedProperties.has('priorityCountries') || changedProperties.has('prefixFirst') || changedProperties.has('compact')) {
      this.applyLanguageTexts(changedProperties.get('language'));
      this.readSourceOptions();
      this.refreshFromSource();
    }
    // Setting only the country selects its prefix. When value is also set at the same time,
    // value wins: country is then only used to pick among the countries sharing that prefix.
    const countryDrivesValue = !changedProperties.has('value') || !this.value;
    if (changedProperties.has('country') && this.country && countryDrivesValue) {
      const prefix = getPhonePrefix(this.country);
      if (prefix) {
        if (prefix !== normalizePhonePrefix(this.value)) {
          this.value = prefix;
        }
        this.isSelected = true;
        this.resolveSelectedText();
      }
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('country')) {
      this.dispatchEvent(new CustomEvent('dile-phone-prefix-changed', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, country: this.country },
      }));
    }
  }

  /** Uses the texts of the language unless they were customized. */
  applyLanguageTexts(previousLanguage) {
    const texts = TEXTS[this.language] || TEXTS.en;
    const previousTexts = TEXTS[previousLanguage] || {};
    if (this.placeholder === undefined || this.placeholder === previousTexts.placeholder) {
      this.placeholder = texts.placeholder;
    }
    if (this.emptyMessage === undefined || this.emptyMessage === previousTexts.emptyMessage) {
      this.emptyMessage = texts.emptyMessage;
    }
  }

  /** The country for a prefix: the current one if it has that prefix, the main one otherwise. */
  countryForPrefix(prefix) {
    const normalized = normalizePhonePrefix(prefix);
    if (!normalized) {
      return undefined;
    }
    if (this.country && getPhonePrefix(this.country) === normalized) {
      return this.country.toUpperCase();
    }
    return getMainCountryForPrefix(normalized);
  }

  resolveSelectedText() {
    this.country = this.countryForPrefix(this.value);
    const option = this.sourceOptions.find(o => o.value === this.country);
    this.selectedText = option ? this.formatSelectedText(option) : this.value;
    this.selectedFullText = option ? option.text : this.value;
  }

  selectOptionValue(iso) {
    this.country = iso;
    this.value = getPhonePrefix(iso);
    this.isSelected = true;
    this.resolveSelectedText();
  }

  onClearSelected() {
    this.country = undefined;
    super.onClearSelected();
  }

  clear() {
    this.country = undefined;
    super.clear();
  }

  set(value) {
    if (!value) {
      this.country = undefined;
    }
    super.set(value);
  }
}
