import { DileInputSuggestionsBase } from '@dile/ui/components/input-suggestions/index.js';
import { DileAxios } from '../../../lib/DileAxios.js';

/**
 * # dile-ajax-input-suggestions
 *
 * Ajax variant of DileInputSuggestionsBase (`@dile/ui`), with the same request API as
 * dile-ajax-select-crud-overlay. It requests the suggestions to `endpoint` with Axios
 * (DileAxios), sending the typed text in `queryStringVariable`.
 *
 * How the list is extracted from the response, by priority:
 * 1. `getSelectResultList(response)`, which receives the whole body;
 * 2. `resultDataProperty`, name of the first-level property holding the array;
 * 3. the whole body, when it already is the array.
 */
export class DileAjaxInputSuggestions extends DileAxios(DileInputSuggestionsBase) {
  static get properties() {
    return {
      endpoint: { type: String },
      queryStringVariable: { type: String },
      additionalQueryString: { type: Object },
      resultDataProperty: { type: String },
      maxResults: { type: Number },
      pageParamName: { type: String },
      getSelectResultList: { type: Object },
    };
  }

  constructor() {
    super();
    this.queryStringVariable = 'q';
  }

  loadData() {
    const requestId = this._requestId;
    const params = { ...(this.additionalQueryString || {}) };
    if (this.pageParamName && this.maxResults) {
      params[this.pageParamName] = this.maxResults;
    }
    params[this.queryStringVariable] = this.keyword;
    this.axiosInstance
      .get(this.endpoint, { params })
      .then((response) => {
        const body = response.data;
        this.setResults(body?.error ? [] : this.getResultList(body), requestId);
      })
      .catch(() => this.setResults([], requestId));
  }

  getResultList(body) {
    if (typeof this.getSelectResultList === 'function') {
      return this.getSelectResultList(body);
    }
    if (this.resultDataProperty) {
      return body?.[this.resultDataProperty];
    }
    return body;
  }
}
