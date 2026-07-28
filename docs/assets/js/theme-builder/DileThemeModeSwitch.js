import { LitElement, html, css } from 'lit';

/**
 * Switch with a label on each side ("light only" / "light and dark").
 * Emits the generic `element-changed` event ({ name, value }) whenever
 * `checked` changes, same convention used by the rest of this tool.
 */
export class DileThemeModeSwitch extends LitElement {

  static get properties() {
    return {
      name: { type: String },
      checked: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      span {
        opacity: 0.7;
      }
      span.active {
        opacity: 1;
        font-weight: bold;
      }
    `;
  }

  constructor() {
    super();
    this.name = '';
    this.checked = false;
  }

  updated(changedProperties) {
    if (changedProperties.has('checked')) {
      this.dispatchEvent(new CustomEvent('element-changed', {
        bubbles: true,
        composed: true,
        detail: { name: this.name, value: this.checked },
      }));
    }
  }

  render() {
    return html`
      <span class="${!this.checked ? 'active' : ''}">Usar solo tema claro</span>
      <dile-switch
        name="${this.name}"
        ?checked="${this.checked}"
        @element-changed="${this._onSwitchChange}"
      ></dile-switch>
      <span class="${this.checked ? 'active' : ''}">Usar tema claro y oscuro</span>
    `;
  }

  _onSwitchChange(e) {
    this.checked = e.detail.value;
  }
}
