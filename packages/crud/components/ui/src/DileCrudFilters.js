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
        const form = this.shadowRoot.getElementById('elform');
        if (form) {
            form.clearField(filterName);
        }

        this.filters = this.filters.map(filter => {
            if (filter.name === filterName) {
                const isSelectType = filter.type === 'select' || filter.type === 'select_ajax';
                this.setFilterValue(filter, isSelectType ? '' : false);
            }
            return filter;
        });
        this.dispatchFiltersChanged();
    }

    filtersChanged(e) {
        const data = e.detail.data;
        this.filters = this.filters.map(filter => {
            if (filter.name in data) {
                this.setFilterValue(filter, data[filter.name]);
            }
            return filter;
        });
        this.dispatchFiltersChanged();
    }

    setFilterValue(filter, value) {
        switch (filter.type) {
            case 'select':
            case 'select_ajax':
                filter.active = value !== '';
                filter.value = value;
                break;
            default:
                filter.active = value;
                filter.value = value;
        }
    }

    dispatchFiltersChanged() {
        this.dispatchEvent(new CustomEvent('filters-changed', {
            bubbles: true,
            composed: true,
            detail: {
                filters: this.filters,
            }
        }));
    }
}
