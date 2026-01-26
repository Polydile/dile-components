import { LitElement, html, css } from 'lit';
import { DileFormChangeDetect, DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/checkbox/checkbox.js';
import '@dile/ui/components/select/select.js';

export class DileCrudFiltersForm extends DileFormChangeDetect(DileForm(LitElement)) {
  static styles = css`
        :host {
            display: block;
        }
        p {
            margin: 0.4rem 0;
            
        }
    `;

  static get properties() {
    return {
      filters: { type: Array }
    };
  }

  constructor() {
    super();
    this.filters = [];
  }

  render() {
    return html`
            ${this.filters.map(filter => this.getFilterField(filter))}
        `;
  }

  getFilterField(filter) {
    if (filter.hidden) {
      return '';
    }
    switch (filter.type) {
      case 'select':
        return html`
            <dile-select label="${filter.label}" name="${filter.name}" value="">
                <select slot="select">
                    <option value="">-</option>
                    ${filter.options.map(option => html`
                        <option value="${option.value}">${option.label}</option>
                    `)}
                </select>
            </dile-select>
        `;
      default:
        return html`
            <p>
                <dile-checkbox ?checked=${filter.active} name="${filter.name}">${filter.label}</dile-checkbox>
            </p>
        `;
    }
  }
}