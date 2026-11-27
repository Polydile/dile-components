import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DileEmmitChange, DileFieldMessage, FIELD_MESSAGE_ID } from '../../../mixins/form/index.js';
import { labelStyles } from './label-styles.js';
import { messageStyles } from './message-styles.js';

export class DileInput extends DileFieldMessage(DileEmmitChange(LitElement)) {

    /**
     * Fired when user press enter key.
     *
     * @event enter-pressed
     */

    /**
     * Listen to the native input event to receive text input updates
     *
     * @event input
     */

    static get properties() {
        return {
          /** Label to the element */
          label: { type: String },

          /** Accessible name of the input, applied as aria-label only when there is no visible label */
          accessibleLabel: { type: String },

          /** Input type */
          type: { type: String },

          /** Set a placeholder to the input element */
          placeholder: { type: String },

          /** Disable the input field */
          disabled: { type: Boolean },

          /** Set initial value to the input. This property syncs to the input field value property */
          value: { type: String },

          /** Name for this input field */
          name: { type: String, reflect: true },

          /** Disable the autocomplete of the input field */
          disableAutocomplete: { type: Boolean },

          /** Value of the autocomplete attribute of the input field (e.g. "email", "new-password"). Defaults to "on". Ignored when disableAutocomplete is set */
          autocomplete: { type: String },

          /** ReadOnly attribute */
          readonly: { type: Boolean },

          /** Select all content on focus */
          selectOnFocus: { type: Boolean },

          /** Text placed on the right side of the input  */
          labelRight: { type: String },

          /** Hide errors on input */
          hideErrorOnInput: { type: Boolean },

          /** Set the application focus to this the input component after the initialization */
          focusOnStart: { type: Boolean },

          /** Disabled state inherited from an ancestor fieldset or form */
          _formDisabled: { state: true },
        };
    }

    static get formAssociated() {
      return true;
    }

    constructor() {
        super();
        this.placeholder = '';
        this.label = '';
        this.labelRight = '';
        this.value = '';
        this.disabled = false;
        this.disableAutocomplete = false;
        this.name = '';
        this.type = 'text';
        this.types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week'];
        this._formDisabled = false;
        this.internals = this.attachInternals();
    }

    /** Called by the browser when the owner form is reset: restores the value of the value attribute */
    formResetCallback() {
      this.value = this.getAttribute('value') ?? '';
      this.clearError();
    }

    /** Called by the browser when an ancestor fieldset or form is disabled or enabled */
    formDisabledCallback(disabled) {
      this._formDisabled = disabled;
    }

    firstUpdated() {
      if(this.focusOnStart) {
        this.focus();
      }
    }

    updated(changedProperties) {
      if(changedProperties.has('value')) {
        this.emmitChange();
        this.internals.setFormValue(this.value ?? '');
      }
    }

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
            :host([type="hidden"]) {
              display: none;
            }
            main {
              width: var(--dile-input-section-width, 100%);
            }
            input {
              box-sizing: border-box;
              border-radius: var(--dile-input-border-radius, 5px);
              border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
              font-size: var(--dile-input-font-size, 1em);
              line-height: var(--dile-input-line-height, 1.5em);
              padding: var(--dile-input-padding, 5px);
              background-color: var(--dile-input-background-color, #fff);
              color: var(--dile-input-color, #303030);
              text-align: var(--dile-input-text-align, left);
              width: 100%;
              flex-grow: 1;
            }
            input:focus {
              outline: var(--dile-input-focus-ring-width, 3px) solid var(--dile-input-focus-ring-color, rgba(102, 170, 255, 0.5));
              outline-offset: calc(-1 * var(--dile-input-focus-ring-width, 3px));
              border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
            }
            input::placeholder {
              color: var(--dile-input-placeholder-color, #ccc);
            }
            input:disabled {
              background-color: #f5f5f5;
              border-color: var(--dile-input-disabled-border-color, #eee);
            }
            .errored {
              border-color: var(--dile-input-error-border-color, #c00);
              background-color: var(--dile-input-error-background-color, var(--dile-input-background-color, #fff));
            }
            section.for-input {
              display: flex;
              align-items: center;
              width: 100%;
            }
            .labelright {
              margin-left: var(--dile-input-label-right-margin-left, 10px);
              color: var(--dile-input-label-color, var(--dile-on-background-color, #59e));
              font-size: var(--dile-input-label-right-font-size, 1.2em);
            }
          `
        ];
    }

    render() {
        return html`
          <main>
            ${this.labelTemplate}
            <section class="for-input">
              ${this.fieldStartTemplate}
              ${this.inputTemplate}
              ${this.fieldEndTemplate}
              ${this.labelRightTemplate}
            </section>
            ${this.messageTemplate}
          </main>
        `;
    }

    /** Template of the visible label. Override to customize it. */
    get labelTemplate() {
      return this.label
        ? html`<label for="textField">${this.label}</label>`
        : '';
    }

    /**
     * Template of the native input. Subclasses should reuse it instead of copying it,
     * customizing it through `inputType`, `computeValue()`, `computeAutocomplete()`,
     * `inputModeValue` and the event handlers (`_input`, `doKeydown`, `doBlur`, `doFocus`).
     */
    get inputTemplate() {
      return html`
        <input
          type="${this.inputType}"
          id="textField"
          name="${this.name}"
          inputmode="${ifDefined(this.inputModeValue)}"
          aria-label="${ifDefined(this.inputAriaLabel)}"
          aria-invalid="${ifDefined(this.errored ? 'true' : undefined)}"
          aria-describedby="${ifDefined(this.messageDescribedBy)}"
          placeholder="${this.placeholder}"
          ?disabled="${this.isDisabled}"
          ?readonly="${this.readonly}"
          autocomplete="${this.computeAutocomplete()}"
          .value="${this.computeValue(this.value)}"
          class="${this.errored ? 'errored' : ''}"
          @keypress="${this._lookForEnter}"
          @keydown="${this.doKeydown}"
          @input="${this._input}"
          @blur="${this.doBlur}"
          @focus="${this.doFocus}"
        />
      `;
    }

    /** Content placed inside the field row, before the input (e.g. a prefix selector) */
    get fieldStartTemplate() {
      return '';
    }

    /** Content placed inside the field row, after the input (e.g. an action button) */
    get fieldEndTemplate() {
      return '';
    }

    get labelRightTemplate() {
      return this.labelRight
        ? html`<span class="labelright">${this.labelRight}</span>`
        : '';
    }

    /** Type applied to the native input */
    get inputType() {
      return this.availableType(this.type);
    }

    /** inputmode applied to the native input. Undefined means no attribute. */
    get inputModeValue() {
      return undefined;
    }

    /** Value of the autocomplete attribute of the native input */
    computeAutocomplete() {
      if (this.disableAutocomplete) {
        return 'off';
      }
      return this.autocomplete || 'on';
    }

    /** True when the field is disabled by its own property or by a disabled ancestor fieldset/form */
    get isDisabled() {
      return this.disabled || this._formDisabled;
    }

    /** Id of the element describing the input (the message), if any */
    get messageDescribedBy() {
      return this.message ? FIELD_MESSAGE_ID : undefined;
    }

    /** aria-label for the inner input: accessibleLabel, only when there is no visible label */
    get inputAriaLabel() {
      return !this.label && this.accessibleLabel ? this.accessibleLabel : undefined;
    }

    /**
     * Private method to dispatch events on enter key pressed
     */
    _lookForEnter(e) {
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            this.dispatchEvent(new CustomEvent('enter-pressed'));
        }
    }
    _input(e) {
        this.value = e.target.value;
        if (this.hideErrorOnInput && this.errored) {
          this.clearError();
        }
    }

    availableType(type) {
        if(this.types.includes(type)) {
            return type;
        }
        return 'text';
    }

    get el() {
        return this.shadowRoot?.querySelector('input') ?? null;
    }

    /** Hook for the keydown event of the native input */
    doKeydown() {
      //
    }

    doBlur() {
      //
    }

    doFocus() {
      if(this.selectOnFocus) {
        this.el.select();
      }
    }

    computeValue(value) {
      return value ?? '';
    }

    /** Moves the focus to the native input. Waits for the first render if needed. */
    focus(options) {
      if (this.el) {
        this.el.focus(options);
      } else {
        this.updateComplete.then(() => this.el?.focus(options));
      }
    }
}
