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
                @dile-select-ajax-data-loaded=${this.selectAjaxDataLoaded}
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
        const form = this.shadowRoot.getElementById('elform');
        this.filters = this.filters.map(filter => {
            if (filter.name in data) {
                const valueLabel = filter.type === 'select_ajax' && form
                    ? form.getSelectedLabel(filter.name)
                    : '';
                this.setFilterValue(filter, data[filter.name], valueLabel);
            }
            return filter;
        });
        this.dispatchFiltersChanged();
    }

    setFilterValue(filter, value, valueLabel = '') {
        switch (filter.type) {
            case 'select':
                filter.active = value !== '';
                filter.value = value;
                break;
            case 'select_ajax':
                filter.active = value !== '';
                filter.value = value;
                filter.valueLabel = value !== '' ? valueLabel : '';
                break;
            default:
                filter.active = value;
                filter.value = value;
        }
    }

    // Options of a select_ajax filter were loaded: resolve the chip label without
    // dispatching filters-changed (that would reload the list).
    selectAjaxDataLoaded(e) {
        const { name, value, selectedLabel } = e.detail;
        const filter = this.filters.find(f => f.name === name && f.type === 'select_ajax');
        if (!filter || !filter.active || String(filter.value) !== String(value ?? '')) {
            return;
        }
        if ((filter.valueLabel || '') !== (selectedLabel || '')) {
            filter.valueLabel = selectedLabel || '';
            this.dispatchEvent(new CustomEvent('filters-display-changed', {
                bubbles: true,
                composed: true,
                detail: {
                    filters: this.filters,
                }
            }));
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
