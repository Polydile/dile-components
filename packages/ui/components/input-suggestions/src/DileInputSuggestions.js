import { DileInputSuggestionsBase } from './DileInputSuggestionsBase.js';
import { normalize } from './normalize.js';

/**
 * # dile-input-suggestions
 *
 * Free text field with suggestions taken from the `suggestions` property, which can be:
 * - an array of objects: filtered by `displayProperty`, ignoring case and accents;
 * - a function `(keyword) => array | Promise<array>` that decides what to return.
 *
 * See DileInputSuggestionsBase for the rest of the API. The Ajax variant,
 * `dile-ajax-input-suggestions`, lives in `@dile/crud`.
 */
export class DileInputSuggestions extends DileInputSuggestionsBase {
  static get properties() {
    return {
      suggestions: { type: Object },
    };
  }

  constructor() {
    super();
    this.suggestions = [];
  }

  async loadData() {
    const requestId = this._requestId;
    const keyword = this.keyword;
    try {
      const result =
        typeof this.suggestions === 'function'
          ? await this.suggestions(keyword)
          : this.filterSuggestions(this.suggestions, keyword);
      this.setResults(result, requestId);
    } catch {
      this.setResults([], requestId);
    }
  }

  filterSuggestions(list, keyword) {
    const needle = normalize(keyword);
    return (Array.isArray(list) ? list : []).filter((item) =>
      normalize(item?.[this.displayProperty]).includes(needle),
    );
  }
}
