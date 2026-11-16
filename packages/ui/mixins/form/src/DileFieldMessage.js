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
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    `
  }

  clearError() {
    this.errored = false;
    this.message = '';
  }

}
