import { LitElement, html } from 'lit';
import { DileInput } from '@dile/dile-input';

export class DilePassword extends DileInput {

  render() {
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <section class="for-input">
        <input
          type="password"
          id="textField"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?disabled="${this.disabled}"
          @keypress="${this._lookForEnter}"
          @input="${this._input}"
          .value="${this.value}"
          class="${ this.errored ? 'errored' : '' }"
        >
      </section>
      ${this.message
        ? html`<div class="message ${this.errored ? 'errored-msg' : ''}"><span>${this.message}</span></div>`
        : ''
      }
    </div>
    `;
  }

}
