import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/select/select.js';

export class DemoChangeEssentialAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      actionIds: { type: Array }
    };
  }

  constructor() {
    super();
    this.actionIds = [];
  }

  render() {
    return html`
      <p>Change essential game state of ${this.actionIds.length} elements.</p>
      <dile-select name="essential">
        <select slot="select">
          <option value="0">Not Essential</option>
          <option value="1">Essential</option>
        </select>
      </dile-select>
    `;
  }
}
customElements.define('demo-change-essential-action', DemoChangeEssentialAction);
