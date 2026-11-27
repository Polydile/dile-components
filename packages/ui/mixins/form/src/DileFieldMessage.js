import { html } from 'lit';

/**
 *
 * # DileFieldMessage
 *
 * Mixin to display a feedback / validation message in form components.
 * Provides the `message` and `errored` properties, the `messageTemplate`
 * getter and the `clearError()` method.
 *
 * Components using this mixin should include `messageStyles`
 * (from `@dile/ui/components/input`) in their styles.
 *
 */

/** Id of the element rendered by `messageTemplate`, to link it with aria-describedby */
export const FIELD_MESSAGE_ID = 'field-message';

export const DileFieldMessage = (superclass) => class extends superclass {

  static get properties() {
    return {
      /** Message Displayed */
      message: { type: String },

      /** Has error on this field */
      errored: { type: Boolean },
    };
  }

  get messageTemplate() {
    return html`
      ${this.message
        ? html`<div id="${FIELD_MESSAGE_ID}" class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

}
