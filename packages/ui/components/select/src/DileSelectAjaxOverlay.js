import { DileSelectSearchableBase } from './DileSelectSearchableBase.js';

export class DileSelectAjaxOverlay extends DileSelectSearchableBase {

  static get properties() {
    return {
      endpoint: { type: String },
      ajaxErrorMessage: { type: String },
      ajaxError: { type: Boolean },
      queryStringVariable: { type: String },
      /** Use resultDataProperty to declare witch property in the JSON object returned by the endpoint has the data to assign to the select options. Left it blank if the result JSON has directly the array with the data */
      resultDataProperty: { type: String },
      /* When static is true there is no posibility to search, then all the options are displayed on the select on initialization */
      static: {
        type: Boolean,
      },
      /** Additional query string data */
      additionalQueryString: {type: Object },
    };
  }

  constructor() {
    super();
    this.ajaxErrorMessage = "Error loading data";
    this.ajaxError = false;
    this.static = false;
    this.queryStringVariable = 'q';
  }

  firstUpdated() {
    super.firstUpdated();
    if(this.static) {
      this.loadData();
    }
  }

  get selectedTextChangedEventName() {
    return 'dile-select-ajax-selected-text-changed';
  }

  get hasSearchField() {
    return !this.static;
  }

  get statusText() {
    return this.ajaxError ? this.ajaxErrorMessage : this.emptyMessage;
  }

  resolveSelectedText() {
    this.searchValueInitial();
  }

  searchValueInitial() {
    fetch(`${this.endpoint}/${this.value}`)
      .then(response => response.json())
      .then(json => this.registerText(json))
      .catch(error => this.registerError(error));
  }

  registerText(json) {
    this.selectedText = json[this.resultDataProperty][this.displayProperty];
    this.loading = false;
  }

  loadData() {
    this.loading = true;
    this.ajaxError = false;
    const url = this.computeRequestURL();

    fetch(url)
      .then(response => response.json())
      .then(json => this.registerData(json))
      .catch(error => this.registerError(error));
  }

  computeRequestURL() {
    const baseUrl = `${this.endpoint}?${this.queryStringVariable}=${this.keyword}`;

    if (this.additionalQueryString && typeof this.additionalQueryString === 'object') {
      const additionalParams = Object.entries(this.additionalQueryString)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      return `${baseUrl}&${additionalParams}`;
    }

    return baseUrl;
  }

  registerError(err) {
    this.ajaxError = true;
    this.loading = false;
  }

  registerData(json) {
    this.setResults(this.getResultData(json));
  }

  getResultData(json) {
    if (this.resultDataProperty === undefined || this.resultDataProperty === '') {
      return json;
    } else {
      return json[this.resultDataProperty];
    }
  }
}
