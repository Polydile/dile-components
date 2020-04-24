import { LitElement, html } from 'lit-element';

// que rabia!! lo dejo x aki... no me pilla el '@dile/dile-input' bien
// tiene que ver con el --preserve-symlinks del es-dev-server
import { DileInput } from '@dile/dile-input';

// pero si copio el DileInput en esta carpeta y lo importo, sí q funciona
//import { DileInput } from './DileInput';


export class DilePassword extends DileInput {

  render() {
    return html`
    <div>
      ${this.label
        ? html`<label for="textField">${this.label}</label>`
        : ''
      }
      <input
        type="password"
        id="textField"
        name="${this.name}"
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        @keypress="${this._lookForEnter}"
        @input="${this._input}"
        .value="${this.value}"
        class="${ this.errored ? 'errored' : '' }">
    </div>
    `;
  }

}
