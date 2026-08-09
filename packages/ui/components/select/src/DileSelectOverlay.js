import { LitElement, html, css } from "lit";
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { DileOverlay } from '../../../mixins/overlay/index.js';
import { DileCloseDocumentClick } from '../../../mixins/close-document-click/index.js';
import { labelStyles, messageStyles } from '../../input/index.js';

const TYPEAHEAD_RESET_DELAY = 500;

export class DileSelectOverlay extends DileOverlay(DileCloseDocumentClick(DileEmmitChange(LitElement))) {
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
        margin-bottom: 10px;
      }
      .select-wrapper {
        position: relative;
        display: block;
        width: 100%;
      }
      #trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        width: var(--dile-input-width, 100%);
        padding: var(--dile-input-padding, 7px 5px);
        line-height: var(--dile-input-line-height, 1.5em);
        font-size: var(--dile-select-font-size, 0.875em);
        font-family: inherit;
        border-radius: var(--dile-input-border-radius, 5px);
        border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
        background-color: var(--dile-input-background-color, #fff);
        color: var(--dile-input-color, #303030);
        cursor: pointer;
        text-align: left;
      }
      #trigger:disabled {
        background-color: #f5f5f5;
        border-color: var(--dile-input-disabled-border-color, #eee);
        cursor: not-allowed;
      }
      #trigger:focus-visible {
        outline: var(--dile-input-focus-ring-width, 3px) solid var(--dile-input-focus-ring-color, rgba(102, 170, 255, 0.5));
        outline-offset: calc(-1 * var(--dile-input-focus-ring-width, 3px));
        border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
      }
      #trigger.errored {
        border-color: var(--dile-input-error-border-color, #c00);
      }
      :host([hideTrigger]) #trigger {
        /* Keep the full width (used to size/position the popup) but collapse
           vertically and hide visually, since a parent composer supplies its
           own visible control and drives open()/close() directly. */
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-top: 0;
        border-bottom: 0;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
      }
      .trigger-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .trigger-text.placeholder {
        color: var(--dile-input-placeholder-color, #ccc);
      }
      .arrow-icon {
        width: 18px;
        height: 18px;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .arrow-icon svg {
        width: 100%;
        height: 100%;
      }
      .arrow-icon path {
        fill: var(--dile-select-arrow-color, #303030);
      }
      #overlay {
        margin: 0;
        list-style: none;
        display: none;
        position: absolute;
        opacity: 0;
        box-sizing: border-box;
        z-index: var(--dile-select-overlay-z-index, 999);
        color: var(--dile-select-overlay-color, #303030);
        background-color: var(--dile-select-overlay-background-color, #fff);
        border-radius: var(--dile-select-overlay-border-radius, 5px);
        max-height: var(--dile-select-overlay-max-height, 260px);
        overflow-y: auto;
        box-shadow: var(--dile-select-overlay-box-shadow, 0 4px 10px rgba(0, 0, 0, 0.15));
        padding: var(--dile-select-overlay-padding, 4px 0);
        transition: var(--dile-select-overlay-transition, ease 0.2s);
        transition-property: transform, opacity;
        transform: translateY(-6px);
      }
      #overlay.opened {
        opacity: 1;
        transform: translateY(0);
      }
      .option {
        padding: var(--dile-select-overlay-option-padding, 7px 10px);
        cursor: pointer;
        color: var(--dile-select-overlay-color, #303030);
      }
      .option.highlighted {
        background-color: var(--dile-select-overlay-highlighted-background-color, #eef6ff);
      }
      .option[aria-selected="true"] {
        font-weight: var(--dile-select-overlay-selected-font-weight, 600);
      }
      @media (forced-colors: active) {
        #trigger {
          border-width: var(--dile-input-border-width, 1px);
        }
        #trigger:focus-visible {
          outline: 3px solid;
        }
        .arrow-icon {
          forced-color-adjust: none;
          color: CanvasText;
        }
      }
    `];
  }

  static get formAssociated() {
    return true;
  }

  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      name: { type: String, reflect: true },
      disabled: { type: Boolean },
      errored: { type: Boolean },
      message: { type: String },
      hideErrorOnInput: { type: Boolean },
      quietOnStart: { type: Boolean },
      /** Text shown on the trigger when no option is selected. Empty by default, matching
       *  dile-select's native <select> (which shows whichever option ends up selected). */
      placeholder: { type: String },
      /** Suppresses the visible trigger box, letting a parent component drive open()/close()
       *  and forward keyboard events via handleExternalKeydown() while supplying its own visible control. */
      hideTrigger: { type: Boolean, reflect: true },
      _activeIndex: { state: true },
      /** Display text of the currently highlighted option, readable by an external composer. */
      highlightedText: { state: true },
    };
  }

  constructor() {
    super();
    this.errored = false;
    this.hideErrorOnInput = false;
    this.hideTrigger = false;
    this.placeholder = '';
    // Sit closer to the trigger than DileOverlay's 10px default gap.
    this.moveTop = -8;
    this.quiet = false;
    this._activeIndex = -1;
    this.highlightedText = '';
    this._typeaheadQuery = '';
    this._typeaheadTimeout = null;
    this.internals = this.attachInternals();
    this.selectId = `dile-select-overlay-${Math.random().toString(36).substr(2, 9)}`;
  }

  get elselect() {
    return this.querySelector("select");
  }

  get opened() {
    return this._overlayClass === 'opened' || this._opening;
  }

  get options() {
    return this.elselect
      ? Array.from(this.elselect.options).map(o => ({ value: o.value, text: o.textContent }))
      : [];
  }

  get selectedOption() {
    return this.options.find(o => o.value === (this.value ?? ''));
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.elselect) {
      throw new Error('Use dile-select-overlay with a select element in the slot "select"');
    }
    if (!this.elselect.id) {
      this.elselect.id = this.selectId;
    }
    // Unlike dile-select, the native <select> is never slotted for display (it's only
    // read as the data source), so browser-native slot projection can't keep the popup
    // in sync when a consumer regenerates its <option> children (e.g. dile-select-ajax-overlay
    // re-rendering options after each search). Watch it directly instead.
    this._optionsObserver = new MutationObserver(() => {
      this.requestUpdate();
      // The option count/height can change (e.g. a search narrowing from many results down
      // to one), but DileOverlay only repositions on open/scroll/resize — without this, a
      // popup that flipped above the trigger for a tall list stays anchored at that old top
      // position once it shrinks, leaving it floating detached from the trigger.
      this.updateComplete.then(() => {
        if (this.opened) {
          this.updatePosition();
        }
      });
    });
    this._optionsObserver.observe(this.elselect, { childList: true, subtree: true, characterData: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._optionsObserver) {
      this._optionsObserver.disconnect();
    }
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
    }
  }

  firstUpdated() {
    super.firstUpdated();
    this.quiet = this.quietOnStart;
    if (this.value) {
      this.elselect.value = this.value;
    } else {
      this.value = this.elselect.value;
    }
  }

  /**
   * Points positioning (open()/updatePosition()'s flip-to-top-or-bottom math) at an external
   * element instead of this component's own trigger. Meant for hideTrigger compositions where
   * a parent's own visible control (e.g. a search field) is the thing the popup should actually
   * avoid covering — the internal trigger is a zero-height point, so flipping "above" it doesn't
   * know to leave room for the parent's real, taller control sitting right before it.
   * Pass no argument (or a falsy value) to revert to this component's own trigger.
   */
  setTriggerElement(el) {
    this.trigger = el || this.shadowRoot.getElementById('trigger');
  }

  updatePosition() {
    // DileOverlay switches #overlay to position:fixed, so a CSS percentage width
    // would resolve against the viewport instead of the trigger. Match it in JS instead.
    if (this.trigger) {
      this.overlay.style.width = `${this.trigger.getBoundingClientRect().width}px`;
    }
    super.updatePosition();
  }

  updated(changedProperties) {
    if (changedProperties.has("value")) {
      if (this.elselect) {
        this.elselect.value = this.value ?? '';
      }
      if (this.quiet) {
        this.quiet = false;
      } else {
        this.emmitChange();
      }
      this.internals.setFormValue(this.value);
    }
  }

  render() {
    const messageId = this.message ? `${this.selectId}-message` : null;
    return html`
      <div>${this.label
          ? html`<label for="trigger">${this.label}</label>`
          : ""
        }<div class="select-wrapper">
          ${this.triggerTemplate}
          ${this.overlayTemplate}
        </div></div>
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}" id="${messageId}" role="status" aria-live="polite"><span>${this.message}</span></div>`
        : ''
      }
    `;
  }

  get triggerTemplate() {
    const selected = this.selectedOption;
    return html`
      <button
        type="button"
        id="trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded="${this.opened}"
        aria-controls="overlay"
        aria-activedescendant="${ifDefined(this._activeIndex >= 0 ? this._optionId(this._activeIndex) : undefined)}"
        aria-invalid="${this.errored}"
        aria-describedby="${ifDefined(this.message ? `${this.selectId}-message` : undefined)}"
        ?disabled="${this.disabled}"
        tabindex="${this.hideTrigger ? '-1' : '0'}"
        class="${this.errored ? 'errored' : ''}"
        @click="${this._onTriggerClick}"
        @keydown="${this.handleExternalKeydown}"
      >
        <span class="trigger-text ${selected ? '' : 'placeholder'}">${selected ? selected.text : this.placeholder}</span>
        <span class="arrow-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 448" enable-background="new 0 0 256 448">
            <path d="M255.9 168c0-4.2-1.6-7.9-4.8-11.2-3.2-3.2-6.9-4.8-11.2-4.8H16c-4.2 0-7.9 1.6-11.2 4.8S0 163.8 0 168c0 4.4 1.6 8.2 4.8 11.4l112 112c3.1 3.1 6.8 4.6 11.2 4.6 4.4 0 8.2-1.5 11.4-4.6l112-112c3-3.2 4.5-7 4.5-11.4z"></path>
          </svg>
        </span>
      </button>
    `;
  }

  get overlayTemplate() {
    const options = this.options;
    return html`
      <ul id="overlay" class="${this._overlayClass}" role="listbox">
        ${options.map((opt, index) => html`
          <li
            id="${this._optionId(index)}"
            role="option"
            class="option ${index === this._activeIndex ? 'highlighted' : ''}"
            aria-selected="${opt.value === (this.value ?? '')}"
            @click="${() => this.selectOption(index)}"
            @mousemove="${() => this._setActiveIndex(index, false)}"
          >${opt.text}</li>
        `)}
      </ul>
    `;
  }

  _optionId(index) {
    return `${this.selectId}-option-${index}`;
  }

  _indexForValue(value) {
    return this.options.findIndex(o => o.value === (value ?? ''));
  }

  _setActiveIndex(index, scroll = true) {
    this._activeIndex = index;
    const opt = this.options[index];
    this.highlightedText = opt ? opt.text : '';
    if (scroll) {
      this.updateComplete.then(() => {
        const el = this.shadowRoot.getElementById(this._optionId(index));
        if (el) {
          el.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  }

  _moveActiveIndex(delta, options = this.options) {
    if (!options.length) return;
    let next = this._activeIndex;
    if (next < 0) {
      next = delta > 0 ? 0 : options.length - 1;
    } else {
      next = Math.min(Math.max(next + delta, 0), options.length - 1);
    }
    this._setActiveIndex(next);
  }

  _onTriggerClick() {
    if (this.disabled) return;
    const wasOpen = this.opened;
    this.toggle();
    if (!wasOpen) {
      this._setActiveIndex(this._indexForValue(this.value), false);
    }
  }

  handleExternalKeydown(e) {
    if (this.disabled) return;
    const options = this.options;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault();
        const wasOpen = this.opened;
        if (!wasOpen) {
          this.open();
          this._setActiveIndex(this._indexForValue(this.value), false);
        }
        this._moveActiveIndex(e.key === 'ArrowDown' ? 1 : -1, options);
        break;
      }
      case 'Home':
        e.preventDefault();
        if (!this.opened) this.open();
        this._setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        if (!this.opened) this.open();
        this._setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.opened) {
          if (this._activeIndex >= 0) {
            this.selectOption(this._activeIndex);
          } else {
            this.close();
          }
        } else {
          this._onTriggerClick();
        }
        break;
      case 'Escape':
        if (this.opened) {
          e.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        this.close();
        break;
      default:
        if (e.key && e.key.length === 1 && /\S/.test(e.key)) {
          this._handleTypeahead(e.key, options);
        }
        break;
    }
  }

  _handleTypeahead(char, options = this.options) {
    if (!options.length) return;
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
    }
    this._typeaheadQuery += char.toLowerCase();
    this._typeaheadTimeout = setTimeout(() => {
      this._typeaheadQuery = '';
    }, TYPEAHEAD_RESET_DELAY);

    const currentIndex = this.opened ? this._activeIndex : this._indexForValue(this.value);
    const startFrom = currentIndex >= 0 ? currentIndex + 1 : 0;
    const ordered = [...options.slice(startFrom), ...options.slice(0, startFrom)];
    const relativeMatch = ordered.findIndex(o => o.text.toLowerCase().startsWith(this._typeaheadQuery));
    if (relativeMatch < 0) return;

    const matchIndex = (startFrom + relativeMatch) % options.length;
    if (this.opened) {
      this._setActiveIndex(matchIndex);
    } else {
      this.selectOption(matchIndex);
    }
  }

  selectOption(index) {
    const opt = this.options[index];
    if (!opt) return;
    this.value = opt.value;
    this.close();
    this.hideErrorOnInteraction();
  }

  hideErrorOnInteraction() {
    if (this.hideErrorOnInput && this.errored) {
      this.errored = false;
      this.message = '';
    }
  }

  close() {
    super.close();
    this._activeIndex = -1;
  }

  clear() {
    this.value = undefined;
  }

  getOptionByValue(id) {
    let options = this.elselect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === id) {
        return options[i];
      }
    }
  }

  quietChange(value) {
    if (value != this.value) {
      this.quiet = true;
      this.value = value;
    }
  }
}
