import { LitElement, html, css } from 'lit';
import { filterIcon } from '@dile/icons';
import '../crud-filters-form.js';
import '../crud-list-options.js'
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudFilters extends DileI18nMixin(LitElement) {
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
            <dile-crud-list-options .icon="${filterIcon}" label="${this.translations.filters_label}" >
                ${this.formTemplate}
            </dile-crud-list-options>
        `;
    }

    get formTemplate() {
        return html`
            <dile-crud-filters-form 
                id="elform"
                .filters=${this.filters} 
                @dile-form-changed=${this.filtersChanged}
            ></dile-crud-filters-form>
        `;
    }

    removeFilter(filterName) {
        this.shadowRoot.getElementById('elform').resetField(filterName);
    }

    filtersChanged(e) {
        let data = e.detail.data;
        this.filters = this.filters.map(filter => {
            if (filter.name in data) {
                switch(filter.type) {
                    case 'select':
                    case 'select_ajax':
                        if(data[filter.name] === '') {
                            filter.active = false;
                        } else {
                            filter.active = true;
                            filter.value = data[filter.name];
                        }
                        break;
                    default:
                        filter.active = data[filter.name];
                        filter.value = data[filter.name];
                }
            }
            return filter;
        });
        this.dispatchEvent(new CustomEvent('filters-changed', {
            bubbles: true,
            composed: true,
            detail: {
                filters: this.filters,
            }
        }));
    }
}
