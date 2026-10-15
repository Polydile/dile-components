import { DileSelectSearchableBase } from './DileSelectSearchableBase.js';

export class DileSelectSearch extends DileSelectSearchableBase {

  static get properties() {
    return {
      /** Show every option as soon as the search field gets focus, before typing anything */
      showAllOnFocus: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.delay = 0;
    this.showAllOnFocus = false;
    this.idProperty = 'value';
    this.displayProperty = 'text';
    this.iconProperty = 'icon';
    this.sourceOptions = [];
  }

  get elselectSource() {
    return this.querySelector('select');
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.elselectSource) {
      throw new Error('Use dile-select-search with a select element in the slot "select"');
    }
    this.readSourceOptions();
    // The light DOM <select> is never rendered, it is only the data source. Watch it so
    // options added, removed or edited later are picked up by the search.
    this._sourceObserver = new MutationObserver(() => {
      this.readSourceOptions();
      if (this.isSelected) {
        this.resolveSelectedText();
      } else if (this.keyword.length > 0 || this.data.length > 0) {
        this.loadData();
      }
    });
    this._sourceObserver.observe(this.elselectSource, { childList: true, subtree: true, characterData: true, attributes: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._sourceObserver) {
      this._sourceObserver.disconnect();
    }
  }

  readSourceOptions() {
    const select = this.elselectSource;
    this.sourceOptions = Array.from(select.options).map(option => ({
      value: option.value,
      text: option.textContent.trim(),
      icon: option.dataset.icon || select.dataset.icon,
    }));
  }

  get selectedTextChangedEventName() {
    return 'dile-select-search-selected-text-changed';
  }

  get shouldOpenResults() {
    return this.data.length > 0 && (this.keyword.length > 0 || this.showAllOnFocus);
  }

  loadData() {
    this.setResults(this.filterOptions(this.keyword));
  }

  filterOptions(keyword) {
    if (!keyword) {
      return this.showAllOnFocus ? [...this.sourceOptions] : [];
    }
    return this.sourceOptions.filter(option => this.filterOption(option, keyword));
  }

  /**
   * Template method: decide whether an option matches the keyword.
   * By default it searches the keyword anywhere in the option text, ignoring case and accents.
   * Override it in a subclass to customize the search (e.g. also match option.value).
   * @param {{value: string, text: string, icon: string}} option
   * @param {string} keyword
   * @returns {boolean}
   */
  filterOption(option, keyword) {
    return normalize(option.text).includes(normalize(keyword));
  }

  resolveSelectedText() {
    const option = this.sourceOptions.find(o => o.value === String(this.value));
    this.selectedText = option ? option.text : this.value;
  }

  onSearchFocus() {
    if (this.showAllOnFocus && this.keyword.length === 0) {
      this.loadData();
    } else {
      super.onSearchFocus();
    }
  }

  onIconClick() {
    super.onIconClick();
    if (this.showAllOnFocus) {
      this.loadData();
    }
  }
}

function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}
