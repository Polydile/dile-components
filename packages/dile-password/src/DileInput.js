import { LitElement, html, css } from 'lit-element';
/**
 * # Polydile Input
 *
 * <dile-input></dile-input>
 *
 * Input text field Web Component, with customized design. Based on LitElement.
 *
 * ## Styling
 *
 * ```
 * <dile-input
 *   label="Text to the label"
 *   value="Text to the input"
 *   placeholder="Some text"
 *   disabled
 *   errored
 * ></dile-input>
 * ```
 *
 * Custom property | Description | Default
 * ----------------|-------------|---------
 * --dile-input-width | Input element width | 100%
 * --dile-input-border-width | Input element border width | 1px
 * --dile-input-border-color | Input element border color | #888
 * --dile-input-border-radius | Input element border radius | 5px
 * --dile-input-error-border-color | Input element border on errored property = true | #c00
 * --dile-input-focus-border-color | Input element border on focus | #6af
 * --dile-input-disabled-border-color | Input element border when disabled | #eee
 * --dile-input-font-size | Input element font size | 1em
 * --dile-input-line-height | Input element line height | 1.5em
 * --dile-input-label-font-size | Font size for the label | 1em
 * --dile-input-label-color | Color for the label text | #59e
 * --dile-input-label-font-weight | Label text font weight | normal
 * --dile-input-label-color | Mixin applied to entire element | #59e
 * --dile-input-error-border-color
 * --dile-input-background-color
 *
 --dile-input-border-
 * @customElement
 * @litElement
 */

export class DileInput extends LitElement {

    /**
     * Fired when user press enter key.
     *
     * @event enter-pressed
     */

    /**
     * Liten to the native input event to recive text input updates
     *
     * @event input
     */

    static get properties() {
        return {
            /** Label to the element */
            label: { type: String },

            /** Set a placeholder to the input element */
            placeholder: { type: String },

            /** Disable the input field */
            disabled: { type: Boolean },

            /** Set initial value to the input. This property syncs to the input field value property */
            value: { type: String },

            /** Name for this input field */
            name: { type: String },

            /** Name for this input field */
            errored: { type: Boolean },
        };
    }
    constructor() {
        super();
        this.placeholder = '';
        this.label = '';
        this.value = '';
        this.disabled = false;
        this.name = '';
    }
    static get styles() {
        return css`
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: var(--dile-input-label-margin-bottom, 4px);
      font-size: var(--dile-input-label-font-size, 1em);
      color: var(--dile-input-label-color, #59e);
      font-weight: var(--dile-input-label-font-weight, normal);
    }
    input {
      box-sizing: border-box;
      border-radius: var(--dile-input-border-radius, 5px);
      border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
      font-size: var(--dile-input-font-size, 1em);
      line-height: var(--dile-input-line-height, 1.5em);
      padding: var(--dile-input-padding, 5px);
      width: var(--dile-input-width, 100%);
      background-color: var(--dile-input-background-color, #fff);
    }
    input:focus {
      outline: none;
      border-color: var(--dile-input-focus-border-color, #6af)
    }
    input::placeholder {
      color: #ccc;
    }
    input:disabled {
      background-color: #f5f5f5;
      border-color: var(--dile-input-disabled-border-color, #eee);
    }
    .errored {
      border-color: var(--dile-input-error-border-color, #c00);
    }
    `;
    }
    render() {
        return html`
    <div>
      ${this.label
                ? html`<label for="textField">${this.label}</label>`
                : ''
            }
      <input
        type="text"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @keypress="${this._lookForEnter}"
        @input="${this._input}"
        .value="${this.value}"
        class="${ this.errored ? 'errored' : ''}">
    </div>
    `;
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
    }

}