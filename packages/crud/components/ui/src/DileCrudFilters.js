import { LitElement, html, css } from 'lit';
import { filterIcon } from '@dile/icons';
import '../crud-filters-form.js';
import '../crud-list-options.js'

export class DileCrudFilters extends LitElement {
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
            <dile-crud-list-options .icon="${filterIcon}" label="Filtros" >
                <dile-crud-filters-form 
                    id="elform"
                    .filters=${this.filters} 
                    @dile-form-changed=${this.filtersChanged}
                ></dile-crud-filters-form>
            </dile-crud-list-options>
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
        //console.log(this.filters);
        this.dispatchEvent(new CustomEvent('filters-changed', {
            bubbles: true,
            composed: true,
            detail: {
                filters: this.filters,
            }
        }));
    }
}
