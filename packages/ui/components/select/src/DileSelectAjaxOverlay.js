import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../../spinner/spinner-horizontal.js';
import '../../spinner/spinner-icon.js';
import '../../icon/icon.js';
import '../select-overlay.js';
import '../../input/input-search.js';
import { searchIcon, clearIcon } from '@dile/icons/index.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { labelStyles } from '../../input/src/label-styles.js';
import { messageStyles } from '../../input/src/message-styles.js';

const NAVIGATION_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', 'Escape', 'Tab'];

export class DileSelectAjaxOverlay extends DileEmmitChange(LitElement) {

  static get styles() {
    return [
      labelStyles,
      messageStyles,
      css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        position: relative;
        margin-bottom: 10px;
      }
      #result {
        margin-bottom: 0.5rem;
      }
      .search-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: var(--dile-input-width, 100%);
        padding: var(--dile-input-padding, 5px);
        border-radius: var(--dile-input-border-radius, 5px);
        border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
        background-color: var(--dile-input-background-color, #fff);
      }
      .search-wrapper:focus-within {
        border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
      }
      .search-wrapper.errored {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      .search-wrapper.disabled {
        opacity: 0.5;
      }
      input {
        flex-grow: 1;
        min-width: 0;
        border: none;
        outline: none;
        color: var(--dile-input-color, #303030);
        font-size: var(--dile-input-font-size, 1em);
        line-height: var(--dile-input-line-height, 1.5em);
        background-color: transparent;
        font-family: inherit;
      }
      input::placeholder {
        color: var(--dile-input-placeholder-color, #ccc);
      }
      dile-icon {
        margin-left: 1px;
        display: flex;
        cursor: pointer;
      }
      dile-spinner-icon {
        margin-left: 1px;
        --dile-icon-size: 18px;
      }
      .status {
        margin-top: 0.5rem;
        position: absolute;
        z-index: var(--dile-select-overlay-z-index, 999);
        width: 100%;
        box-sizing: border-box;
        min-height: 2.5rem;
        border-radius: var(--dile-select-overlay-border-radius, 5px);
        padding: var(--dile-select-overlay-padding, 7px 10px);
        background-color: var(--dile-select-overlay-background-color, #fff);
        color: var(--dile-select-overlay-color, #303030);
        box-shadow: var(--dile-select-overlay-box-shadow, 0 4px 10px rgba(0, 0, 0, 0.15));
        display: flex;
        align-items: center;
      }
      .status p {
        margin: 0;
      }
      dile-select-overlay {
        margin-bottom: 0;
        /* Match the search field's own sizing (dile-input-search-like padding/font-size)
           instead of dile-select-overlay's native-select-like defaults, so the visible
           trigger shown in static mode looks consistent with the search field. */
        --dile-input-padding: 5px;
        --dile-select-font-size: 1em;
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `];
  }

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      endpoint: { type: String },
      label: { type: String },
      value: { type: String },
      name: { type: String, reflect: true },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      data: { type: Array },
      placeholder: { type: String },
      emptyMessage: { type: String },
      selectedText: { type: String },
      ajaxErrorMessage: { type: String },
      ajaxError: { type: Boolean },
      queryStringVariable: { type: String },
      /** Use resultDataProperty to declare witch property in the JSON object returned by the endpoint has the data to assign to the select options. Left it blank if the result JSON has directly the array with the data */
      resultDataProperty: { type: String },
      displayProperty: { type: String },
      idProperty: { type: String },
      /** Property in each data object holding a dile-iconlib "family.name" icon string, applied
       *  per option. Leave unset if you don't need per-option icons. */
      iconProperty: { type: String },
      /** dile-iconlib "family.name" icon string applied to every option that has no icon of its
       *  own via iconProperty. */
      icon: { type: String },
      delay: { type: Number },
      keyword: {
        type: String,
        state: true,
       },
      loading: {
        type: Boolean,
        state: true,
      },
      isSelected: {
        type: Boolean,
        state: true,
      },
      /* When static is true there is no posibility to search, then all the options are displayed on the select on initialization */
      static: {
        type: Boolean,
      },
      /** Message Displayed */
      message: { type: String },
      /** Hide errors on input */
      hideErrorOnInput: { type: Boolean },
      /** Additional query string data */
      additionalQueryString: {type: Object },
      /** Text announced in a live region as the user navigates results with the keyboard */
      _liveAnnouncement: { state: true },
    };
  }

  updated(changedProperties) {
    if(changedProperties.has("value")) {
      this.emmitChange();
      this.dispatchSelectedTextChanged();
      this.internals.setFormValue(this.value);
    }
    // In search mode the nested dile-select-overlay's own trigger is hidden and collapsed to
    // zero height, sitting right after this component's real, visible search field. Point its
    // positioning at that real field instead, so a flip-to-top popup correctly leaves room for
    // the field's actual height rather than covering it. Static mode keeps its own visible
    // trigger, which is already the right thing to position against.
    // Re-checked on every update (not just firstUpdated) because clearing a selection swaps
    // back to a *new* dile-select-overlay instance (isSelected toggles the whole template
    // branch), which needs the same wiring the original instance got.
    if (!this.static && this.select && this._wiredTriggerFor !== this.select) {
      const nestedSelect = this.select;
      this._wiredTriggerFor = nestedSelect;
      // The nested element's own firstUpdated() (which sets its default internal trigger
      // reference) runs on its own update cycle, not synchronously with this one — wait for it
      // to resolve first, otherwise it overwrites the external trigger we just set here.
      nestedSelect.updateComplete.then(() => {
        nestedSelect.setTriggerElement(this.shadowRoot.querySelector('.search-wrapper'));
      });
    }
  }

  constructor() {
    super();
    this.placeholder = "Search to choose...";
    this.emptyMessage = "No results found";
    this.ajaxErrorMessage = "Error loading data";
    this.data = [];
    this.keyword = '';
    this.loading = false;
    this.errored = false;
    this.ajaxError = false;
    this.isSelected = false;
    this.static = false;
    this.queryStringVariable = 'q';
    this.delay = 300;
    this.idProperty = 'id';
    this._liveAnnouncement = '';
    this._debounceTimeout = null;
    this.internals = this.attachInternals();
    this.selectId = `dile-select-ajax-overlay-${Math.random().toString(36).substr(2, 9)}`;
  }

  firstUpdated() {
    if(this.value) {
      this.isSelected = true;
      this.searchValueInitial();
    }
    if(this.static) {
      this.loadData();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
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

  get search() {
    return this.shadowRoot.getElementById('search');
  }

  get select() {
    return this.shadowRoot.getElementById('elselect');
  }

  get opened() {
    return this.select ? this.select.opened : false;
  }

  render() {
    return html`
      <div>
        ${this.label
          ? html`<label for="${this.isSelected ? 'result' : 'search'}">${this.label}</label>`
          : ""}
        ${this.isSelected
          ? this.selectedTemplate
          : this.static ? this.dataTemplate : this.searchTemplate
        }
      </div>
      ${this.messageTemplate}
    `;
  }

  get selectedTemplate() {
    return html`
      <dile-input-search
        id="result"
        ?errored=${this.errored}
        ?disabled=${this.disabled}
        value="${this.selectedText}"
        readOnly
        @dile-input-search-cleared=${this.onClearSelected}
        @dile-input-search=${this.hideErrorOnInteraction}
      ></dile-input-search>
    `;
  }

  get searchTemplate() {
    return html`
      <div
        class="search-wrapper ${this.errored ? 'errored' : ''} ${this.disabled ? 'disabled' : ''}"
        @click=${(e) => e.stopPropagation()}
      >
        <input
          type="text"
          id="search"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded="${this.opened}"
          aria-invalid="${this.errored}"
          aria-describedby="${ifDefined(this.message ? `${this.selectId}-message` : undefined)}"
          placeholder="${this.placeholder}"
          .value="${this.keyword}"
          ?disabled=${this.disabled}
          autocomplete="off"
          @input=${this.onSearchInput}
          @keydown=${this.onSearchKeydown}
          @focus=${this.onSearchFocus}
          @focusout=${this.onSearchFocusOut}
        >
        ${this.loading
          ? html`<dile-spinner-icon active aria-hidden="true"></dile-spinner-icon>`
          : html`
            <dile-icon
              @click=${this.onIconClick}
              .icon="${this.keyword.length ? clearIcon : searchIcon}"
            ></dile-icon>
          `
        }
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this._liveAnnouncement}</div>
      ${this.keyword.length > 0 && this.data.length === 0 ? this.statusTemplate : ''}
      ${this.dataTemplate}
    `;
  }

  get statusTemplate() {
    return html`
      <div class="status">
        ${this.loading
          ? html`<dile-spinner-horizontal active></dile-spinner-horizontal>`
          : this.ajaxError
            ? html`<p>${this.ajaxErrorMessage}</p>`
            : html`<p>${this.emptyMessage}</p>`
        }
      </div>
    `;
  }

  get dataTemplate() {
    return html`
        <dile-select-overlay
          id="elselect"
          ?hideTrigger=${!this.static}
          name="generated-select-field"
          placeholder="${this.placeholder}"
          ?disabled=${this.disabled}
          @element-changed=${this.doSelected}
        >
          <select slot="select" data-icon="${ifDefined(this.icon)}">
            ${this.data.map(item => html`
              <option value="${item[this.idProperty]}" data-icon="${ifDefined(this.iconProperty ? item[this.iconProperty] : undefined)}">${item[this.displayProperty]}</option>
            `)}
          </select>
        </dile-select-overlay>
    `;
  }

  get messageTemplate() {
    return html`
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}" id="${this.selectId}-message"><span>${this.message}</span></div>`
        : ''
      }
    `
  }

  onSearchInput(e) {
    this.keyword = e.target.value;
    this.hideErrorOnInteraction();
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }
    // Mark as loading right away, not just once the debounced request actually starts,
    // otherwise the empty-results message flashes for the length of the debounce delay
    // before there's been any real request to come back empty.
    if (this.keyword.length > 0) {
      this.loading = true;
    }
    this._debounceTimeout = setTimeout(() => {
      this.loadData();
    }, this.delay);
  }

  onSearchKeydown(e) {
    if (!NAVIGATION_KEYS.includes(e.key) || !this.select) return;
    this.select.handleExternalKeydown(e);
    this._liveAnnouncement = this.select.highlightedText;
  }

  onSearchFocus() {
    if (this.keyword.length > 0 && this.data.length > 0) {
      this.select?.open();
    }
  }

  onSearchFocusOut(e) {
    if (!this.shadowRoot.contains(e.relatedTarget)) {
      this.select?.close();
    }
  }

  onIconClick() {
    if (!this.keyword.length) return;
    this.keyword = '';
    this.data = [];
    this.select?.close();
    this.search.focus();
  }

  hideErrorOnInteraction() {
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
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
    this.data = this.getResultData(json);
    this.updateComplete.then(() => {
      this.loading = false;
      if (this.keyword.length > 0 && this.data.length > 0) {
        this.select?.open();
      }
    });
  }

  getResultData(json) {
    if (this.resultDataProperty === undefined || this.resultDataProperty === '') {
      return json;
    } else {
      return json[this.resultDataProperty];
    }
  }

  doSelected(e) {
    e.stopPropagation();
    let value = e.detail.value;
    // The nested dile-select-overlay also fires element-changed with an empty value while
    // syncing itself to its placeholder option on mount (before any real selection) since,
    // unlike the original dile-select, it's kept mounted from the start so its MutationObserver
    // is ready to pick up results as soon as they load. Ignore that non-interaction here.
    if(e.detail.name === 'generated-select-field' && value !== '') {
      this.selectedText = this.select.getOptionByValue(value).innerText;
      this.value = value;
      this.isSelected = true;
      this.hideErrorOnInteraction();
    }
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

  onClearSelected() {
    this.value = undefined;
    this.isSelected = false;
    if(! this.static) {
      this.keyword = '';
      this.selectedText = '';
      this.data = [];
      this.updateComplete.then(() => {
        this.search.focus();
      });
    }
    this.hideErrorOnInteraction();
  }

  close() {
    this.select?.close();
  }

  clear() {
    this.isSelected = false;
    this.value = undefined;
    this.selectedText = '';
    // isSelected flipping back to false remounts a brand new nested dile-select-overlay (the
    // read-only and search branches are mutually exclusive templates). Its firstUpdated() syncs
    // its value to the native <select>'s current value, and this component's <select> has no
    // placeholder option — so leftover data/keyword from the previous search would leave a real
    // option in place, get auto-picked as the new instance's value, and re-fire element-changed
    // for the very same item that was just cleared (an infinite loop under addOnSelect).
    if (!this.static) {
      this.keyword = '';
      this.data = [];
    }
  }

  set(value) {
    this.value = value;
    if(value) {
      this.isSelected = true;
      this.searchValueInitial();
    }
  }

  dispatchSelectedTextChanged() {
    this.dispatchEvent(new CustomEvent('dile-select-ajax-selected-text-changed',
      {
        bubbles: true,
        composed: true,
        detail: { selectedText: this.selectedText }
      }
    ));
  }
}
