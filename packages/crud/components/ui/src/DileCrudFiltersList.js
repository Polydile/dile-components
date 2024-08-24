import { LitElement, html, css } from 'lit';
import '../crud-filters-list-item';

export class DileCrudFiltersList extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            div {
                padding: 0.5rem;
                display: flex;
                flex-wrap: wrap;
            }
            dile-crud-filters-list-item {
                margin-right: 0.5rem;
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
        if(! filter.hidden) {
            switch(filter.type) {
                case 'select':
                    return html`
                        <dile-crud-filters-list-item name="${filter.name}" label="${this.findLabelInOption(filter)}" ?active="${filter.active}"></dile-crud-filters-list-item>
                    `;
                default:
                    return html`
                       <dile-crud-filters-list-item name="${filter.name}" label="${filter.label}" ?active="${filter.active}"></dile-crud-filters-list-item>
                    `
            }
        }
    }

    findLabelInOption(filter) {
        let option = filter.options.find((option) => option.name == filter.value);
        if(option) {
            return option.label;
        } else {
            return ''
        }
    }
}