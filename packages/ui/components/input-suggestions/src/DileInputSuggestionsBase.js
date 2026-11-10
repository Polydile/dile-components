import { LitElement, html, css, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { labelStyles, messageStyles } from '../../input/index.js';
import '../../select/select-overlay.js';
import '../../spinner/spinner-icon.js';

/**
 * Keys forwarded to the nested dile-select-overlay. Unlike DileSelectSearchableBase's
 * `NAVIGATION_KEYS`, Enter and Escape are handled here: in a free text field the list must
 * not open, nor anything be selected, when no suggestions are visible. Space is never
 * forwarded, so it can be typed.
 */
const FORWARDED_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Tab'];

/** Option parts of the nested dile-select-overlay re-exported by the host. */
const OPTION_PARTS = ['option', 'option-highlighted', 'option-selected', 'option-content'];

/**
 * # DileInputSuggestionsBase
 *
 * Free text field with suggestions (editable combobox, WAI-ARIA APG "list autocomplete"
 * pattern). The field value is always the typed text. Choosing a suggestion copies its
 * `displayProperty` into the field and emits `dile-input-suggestions-selected` with the whole
 * object, so the consumer decides what to do with it.
 *
 * Same composition as DileSelectSearchableBase: its own input plus a nested
 * dile-select-overlay with `hideTrigger`, anchored to the input with `setTriggerElement()`
 * and driven with `handleExternalKeydown()`.
 *
 * Subclasses implement `loadData()`, which gets the suggestions for `keyword` and calls
 * `setResults(data)`.
 *
 * ## Extension points for variants (e.g. dile-input-tags)
 * - `renderBeforeField()`: content between the label and the field.
 * - `renderFieldEnd()`: content inside the field border, after the `suffix` slot.
 * - `filterResults(data)`: filters the received suggestions before showing them.
 * - `onEnterWithoutSuggestion(e)`: Enter with no suggestion highlighted with the keyboard.
 *   By default, if the list is open, it closes it.
 * - `selectItem(item)`: what to do when a suggestion is chosen.
 *
 * ## Templated options
 * - `optionRenderer(item, index)` renders each suggestion with a custom template. The text
 *   from `getOptionText` / `displayProperty` is still the accessible name and the announced text.
 * - The `option`, `option-highlighted`, `option-selected` and `option-content` parts, plus the
 *   ones in `optionParts`, can be styled from outside with `::part()`.
 *
 * ## Slots
 * - `prefix` / `suffix`: content inside the field border, before or after the text
 *   (e.g. an icon button).
 *
 * ## CSS custom properties
 * - `--dile-input-suggestions-min-width` (16rem): minimum width of the suggestions list when
 *   the field is narrower. Never wider than the viewport.
 * - `--dile-input-suggestions-margin-bottom` (10px).
 * - Plus the usual `--dile-input-*` of the field and `--dile-select-overlay-*` of the list.
 *
 * ## Events
 * - `element-changed`: when the text changes (`detail: { name, value }`).
 * - `dile-input-suggestions-selected`: when a suggestion is chosen (`detail: { name, item }`).
 */
export class DileInputSuggestionsBase extends DileEmmitChange(LitElement) {
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
          margin-bottom: var(--dile-input-suggestions-margin-bottom, 10px);
        }
        .wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
          width: var(--dile-input-width, 100%);
          padding: var(--dile-input-padding, 5px);
          border-radius: var(--dile-input-border-radius, 5px);
          border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
          background-color: var(--dile-input-background-color, #fff);
        }
        .wrapper:focus-within {
          border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
        }
        .wrapper.errored {
          border-color: var(--dile-input-error-border-color, #c00);
        }
        .wrapper.disabled {
          opacity: 0.5;
        }
        input {
          flex-grow: 1;
          min-width: 0;
          border: none;
          outline: none;
          padding: 0;
          color: var(--dile-input-color, #303030);
          font-size: var(--dile-input-font-size, 1em);
          line-height: var(--dile-input-line-height, 1.5em);
          background-color: transparent;
          font-family: inherit;
        }
        input::placeholder {
          color: var(--dile-input-placeholder-color, #ccc);
        }
        dile-spinner-icon {
          --dile-icon-size: 16px;
          display: flex;
        }
        ::slotted(*) {
          flex-shrink: 0;
        }
        dile-select-overlay {
          margin-bottom: 0;
          /* The list copies the field width, with a minimum so the suggestions stay readable
             in narrow fields. dile-select-overlay caps it to the viewport width and moves it
             back if it overflows on the right. */
          --dile-select-overlay-min-width: var(--dile-input-suggestions-min-width, 16rem);
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
      `,
    ];
  }

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      value: { type: String },
      name: { type: String, reflect: true },
      label: { type: String },
      /** Accessible name when there is no visible `label`. */
      accessibleLabel: { type: String },
      placeholder: { type: String },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
      /** Minimum number of characters to request suggestions. */
      minLength: { type: Number },
      /** Milliseconds to wait after the last keystroke before requesting suggestions. */
      delay: { type: Number },
      /** Property of the suggested object copied into the field when it is chosen. */
      displayProperty: { type: String },
      /**
       * Optional `(item) => string` function with the text of each suggestion. It is also the
       * accessible name and the announced text, even with `optionRenderer`.
       */
      getOptionText: { type: Object },
      /**
       * Optional renderer for the content of each suggestion: `(item, index) => TemplateResult | string`,
       * with the original data object. Rendered inside the nested dile-select-overlay.
       */
      optionRenderer: { attribute: false },
      /**
       * Extra part names, separated by spaces or commas, used inside `optionRenderer`.
       * They are re-exported so they can be styled from outside with ::part().
       */
      optionParts: { type: String },
      /** Text announced when there are suggestions. Receives the number of results. */
      resultsAnnouncement: { type: Object },
      data: { type: Array },
      keyword: { type: String, state: true },
      loading: { type: Boolean, state: true },
      _liveAnnouncement: { state: true },
    };
  }

  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
    this.disabled = false;
    this.errored = false;
    this.message = '';
    this.minLength = 2;
    this.delay = 300;
    this.displayProperty = 'name';
    this.data = [];
    this.keyword = '';
    this.loading = false;
    this.resultsAnnouncement = (count) =>
      count === 1 ? '1 suggestion available' : `${count} suggestions available`;
    this._liveAnnouncement = '';
    this._debounceTimeout = null;
    this._requestId = 0;
    this._keyboardHighlight = false;
    this.internals = this.attachInternals();
    this.inputId = `${this.localName}-${Math.random().toString(36).slice(2, 11)}`;
  }

  /** Template method: gets the suggestions for `keyword` and calls `setResults(data)`. */
  loadData() {}

  /** Extension point: content between the label and the field. */
  renderBeforeField() {
    return nothing;
  }

  /** Extension point: content inside the field border, at the end. */
  renderFieldEnd() {
    return nothing;
  }

  /** Extension point: filters the received suggestions before showing them. */
  filterResults(data) {
    return data;
  }

  get input() {
    return this.shadowRoot.getElementById('input');
  }

  get select() {
    return this.shadowRoot.getElementById('elselect');
  }

  get opened() {
    return this.select ? this.select.opened : false;
  }

  firstUpdated() {
    this.select.updateComplete.then(() => {
      this.select.setTriggerElement(this.shadowRoot.querySelector('.wrapper'));
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.emmitChange();
      this.internals.setFormValue(this.value ?? '');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._debounceTimeout);
  }

  render() {
    const messageId = this.message ? `${this.inputId}-message` : undefined;
    return html`
      <div>
        ${this.label ? html`<label for="input">${this.label}</label>` : nothing} ${this.renderBeforeField()}
        <div
          class="wrapper ${this.errored ? 'errored' : ''} ${this.disabled ? 'disabled' : ''}"
          @click=${(e) => e.stopPropagation()}
        >
          <slot name="prefix"></slot>
          <input
            type="text"
            id="input"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded="${this.opened}"
            aria-label="${ifDefined(this.label ? undefined : this.accessibleLabel || this.placeholder || undefined)}"
            aria-invalid="${this.errored}"
            aria-describedby="${ifDefined(messageId)}"
            placeholder="${this.placeholder}"
            .value="${this.value ?? ''}"
            ?disabled=${this.disabled}
            autocomplete="off"
            @input=${this.onInput}
            @keydown=${this.onKeydown}
            @focus=${this.onFocus}
            @focusout=${this.onFocusOut}
          />
          ${this.loading ? html`<dile-spinner-icon active aria-hidden="true"></dile-spinner-icon>` : nothing}
          <slot name="suffix"></slot>
          ${this.renderFieldEnd()}
        </div>
        <div class="visually-hidden" role="status" aria-live="polite">${this._liveAnnouncement}</div>
        <div @mousedown=${this.keepFocus} @pointerdown=${this.keepFocus}>
          <dile-select-overlay
            id="elselect"
            hideTrigger
            name="generated-select-field"
            accessibleLabel="${ifDefined(this.label || this.accessibleLabel || this.placeholder || undefined)}"
            exportparts="${this.exportedOptionParts}"
            .optionRenderer=${this.nestedOptionRenderer}
            ?disabled=${this.disabled}
            @element-changed=${this.onOptionSelected}
          >
            <select slot="select">
              ${this.data.map(
                (item, index) => html`<option value="${index}">${this.optionText(item)}</option>`,
              )}
            </select>
          </dile-select-overlay>
        </div>
      </div>
      ${
        this.message
          ? html`<div class="message ${this.errored ? 'errored-msg' : ''}" id="${messageId}">
              <span>${this.message}</span>
            </div>`
          : nothing
      }
    `;
  }

  /** exportparts value of the nested overlay: the option parts plus `optionParts`. */
  get exportedOptionParts() {
    const extra = (this.optionParts || '').split(/[\s,]+/).filter(Boolean);
    return [...new Set([...OPTION_PARTS, ...extra])].join(', ');
  }

  /**
   * Adapts `optionRenderer`, which receives data objects, to the overlay's `(option, index)`
   * signature. Options are generated from `data` in order and their value is the index. Cached
   * per function so the overlay doesn't receive a new function on every render.
   */
  get nestedOptionRenderer() {
    if (typeof this.optionRenderer !== 'function') {
      return undefined;
    }
    if (this._nestedRendererFor !== this.optionRenderer) {
      const renderer = this.optionRenderer;
      this._nestedRendererFor = renderer;
      this._nestedRenderer = (option, index) => {
        const item = this.data[Number(option.value)];
        return item === undefined ? option.text : renderer(item, index);
      };
    }
    return this._nestedRenderer;
  }

  optionText(item) {
    if (typeof this.getOptionText === 'function') {
      return this.getOptionText(item);
    }
    return item?.[this.displayProperty] ?? '';
  }

  /** Prevents pressing a suggestion from blurring the input and closing the list before the click. */
  keepFocus(e) {
    e.preventDefault();
  }

  onInput(e) {
    this.value = e.target.value;
    this.keyword = this.value.trim();
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
    clearTimeout(this._debounceTimeout);
    if (this.keyword.length < this.minLength) {
      this._requestId++;
      this.loading = false;
      this.setResults([]);
      return;
    }
    this._debounceTimeout = setTimeout(() => this.requestData(), this.delay);
  }

  requestData() {
    this._requestId++;
    this.loading = true;
    this.loadData();
  }

  /**
   * Subclasses can pass the request id, taken from `this._requestId` when the request
   * started, so late responses are discarded.
   */
  setResults(data, requestId = this._requestId) {
    if (requestId !== this._requestId) return;
    this.data = this.filterResults(Array.isArray(data) ? data : []);
    this.loading = false;
    this._keyboardHighlight = false;
    this.updateComplete.then(() => {
      // Closing before opening resets the highlighted option, which could otherwise keep
      // pointing to a position of the previous list.
      this.select?.close();
      if (this.data.length > 0 && this.hasFocus) {
        this.select?.open();
        this._liveAnnouncement = this.resultsAnnouncement(this.data.length);
      } else {
        this._liveAnnouncement = '';
      }
    });
  }

  get hasFocus() {
    return this.shadowRoot.activeElement === this.input;
  }

  onKeydown(e) {
    if (!this.select) return;
    if (e.key === 'Escape') {
      this._keyboardHighlight = false;
      if (this.opened) {
        e.preventDefault();
        e.stopPropagation();
        this.select.close();
      }
      return;
    }
    if (e.key === 'Enter') {
      // With a suggestion highlighted with the keyboard, the overlay selects it. Otherwise
      // onEnterWithoutSuggestion decides. With the list closed it isn't forwarded: it must not open it.
      if (this.opened && this._keyboardHighlight) {
        this.select.handleExternalKeydown(e);
      } else {
        this.onEnterWithoutSuggestion(e);
      }
      return;
    }
    if (!FORWARDED_KEYS.includes(e.key)) return;
    if (e.key !== 'Tab' && this.data.length === 0) return;
    this.select.handleExternalKeydown(e);
    // Only keyboard highlights count for Enter: the overlay also highlights options on mouse
    // hover, and Enter must not pick an option the user only pointed at.
    this._keyboardHighlight = this.opened && this.select.highlightedText !== '';
    this._liveAnnouncement = this.select.highlightedText;
  }

  /**
   * Enter with no suggestion highlighted with the keyboard. By default, with the list open,
   * it is forwarded to the overlay, which closes it (or picks the option under the mouse).
   */
  onEnterWithoutSuggestion(e) {
    if (this.opened) {
      this.select.handleExternalKeydown(e);
    }
  }

  onFocus() {
    if (this.data.length > 0 && this.keyword.length >= this.minLength) {
      this.select?.open();
    }
  }

  onFocusOut(e) {
    if (!this.shadowRoot.contains(e.relatedTarget)) {
      this._keyboardHighlight = false;
      this.select?.close();
    }
  }

  onOptionSelected(e) {
    e.stopPropagation();
    if (e.detail.name !== 'generated-select-field' || e.detail.value === '' || e.detail.value == null) {
      return;
    }
    const item = this.data[Number(e.detail.value)];
    // Reset the nested select so the same suggestion can be chosen again later.
    this.select.quietChange('');
    if (!item) return;
    this.selectItem(item);
  }

  /** Applies a suggestion: copies its text into the field and emits the event with the object. */
  selectItem(item) {
    clearTimeout(this._debounceTimeout);
    this._requestId++;
    this.value = item[this.displayProperty] ?? '';
    this.keyword = '';
    this.data = [];
    this.loading = false;
    this._keyboardHighlight = false;
    this.select?.close();
    this._liveAnnouncement = '';
    if (this.hideErrorOnInput && this.errored) {
      this.clearError();
    }
    // Emitted after the element-changed of the new text, so a consumer listening to both can
    // give priority to the chosen suggestion without the text change arriving later and
    // overriding it.
    this.updateComplete.then(() => {
      this.dispatchEvent(
        new CustomEvent('dile-input-suggestions-selected', {
          bubbles: true,
          composed: true,
          detail: { name: this.name, item },
        }),
      );
    });
  }

  focus(options) {
    this.input?.focus(options);
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

  clear() {
    this.value = '';
    this.keyword = '';
    this.data = [];
  }

  set(value) {
    this.value = value ?? '';
  }
}
