import { LitElement, html, css } from 'lit';
import { DileFormChangeDetect, DileForm } from '@dile/ui/mixins/form/index.js';
import '@dile/ui/components/checkbox/checkbox.js';
import '@dile/ui/components/select/select.js';
import '@dile/crud/components/select-ajax-simple/select-ajax-simple.js';

export class DileCrudFiltersForm extends DileFormChangeDetect(DileForm(LitElement)) {
  static styles = css`
    :host {
      display: block;
      font-size: var(--dile-crud-filters-label-font-size, var(--dile-input-label-font-size, 1em));
      --dile-select-font-size: var(--dile-crud-filters-select-font-size, var(--dile-select-font-size, 0.875em));
      --dile-input-label-font-size: var(--dile-crud-filters-label-font-size, var(--dile-input-label-font-size, 1em));
      --dile-input-padding: var(--dile-crud-filters-input-padding, var(--dile-input-padding, 5px));
      --dile-input-label-margin-bottom: var(--dile-crud-filters-label-margin-bottom, var(--dile-input-label-margin-bottom, 4px));
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
      case 'select_ajax':
        return html`
            <dile-select-ajax-simple
                label="${filter.label}"
                name="${filter.name}"
                value="${filter.value || ''}"
                endpoint="${filter.endpoint}"
                displayProperty="${filter.optionLabelField || 'name'}"
                idProperty="${filter.optionValueField || 'id'}"
                resultDataProperty="${filter.resultDataProperty || 'data'}"
                selectDefaultPlaceholder="${filter.selectDefaultPlaceholder || ''}"
                emptyMessage="${filter.emptyMessage || ''}"
                ajaxErrorMessage="${filter.ajaxErrorMessage || ''}"
                message="${filter.message || ''}"
                pageParamName="${filter.pageParamName || ''}"
                .maxResults=${filter.maxResults}
                .getSelectResultList=${filter.getSelectResultList}
                .additionalQueryString=${filter.additionalQueryString}
                ?disabled=${filter.disabled || false}
                ?errored=${filter.errored || false}
            ></dile-select-ajax-simple>
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