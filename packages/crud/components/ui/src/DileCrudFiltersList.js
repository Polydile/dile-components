import { LitElement, html, css } from 'lit';
import '../crud-filters-list-item.js';

export class DileCrudFiltersList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            div {
                margin: var(--dile-crud-filters-list-margin, 0 0.5rem); 
                display: flex;
                flex-wrap: wrap;
                gap: var(--dile-crud-filters-list-gap, 0.5rem);
            }
        `
    ];

    static get properties() {
      return {
        filters: { type: Array },
        keyword: { type: String },
        hiddenFilters: { type: Array },
      };
    }

    constructor() {
        super();
        this.filters = [];
        this.hiddenFilters = [];
    }

    render() {
        return html`
            <div>
                ${this.keyword 
                    ? html`<dile-crud-filters-list-item name="keyword" label="${this.keyword}" active></dile-crud-filters-list-item>`
                    : ''
                }
                ${this.filters.map(filter => this.filterItemTemplate(filter))}
            </div>
        `;
    }

    filterItemTemplate(filter) {
        if(! filter.hidden && filter.active) {
            return html`
                <dile-crud-filters-list-item name="${filter.name}" label="${this.chipLabel(filter)}" ?active="${filter.active}"></dile-crud-filters-list-item>
            `;
        }
    }

    chipLabel(filter) {
        let valueLabel;
        switch(filter.type) {
            case 'select':
                valueLabel = this.findLabelInOption(filter);
                break;
            case 'select_ajax':
                valueLabel = filter.valueLabel || '';
                if (!valueLabel) {
                    return filter.label;
                }
                break;
            default:
                return filter.label;
        }
        return filter.showLabelInChip && valueLabel ? `${filter.label}: ${valueLabel}` : valueLabel;
    }

    findLabelInOption(filter) {
        let option = (filter.options || []).find((option) => option.value == filter.value);
        if(option) {
            return option.label;
        } else {
            return ''
        }
    }
}