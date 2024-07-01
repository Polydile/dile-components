import { LitElement, html, css } from 'lit';
import '../crud-list-options';
import '../crud-page-size-select';
import { descriptionIcon } from '@dile/icons';

export class DileCrudPageSize extends LitElement {

    static get properties() {
        return {
          pageSizes: { type: Array }
        };
    }

    constructor() {
        super();
        this.pageSizes = [25, 50, 100, 500];
    }

    render() {
        return html`
            <dile-crud-list-options .icon="${descriptionIcon}" label="Page">
                <dile-crud-page-size-select .pageSizes=${this.pageSizes}></dile-crud-page-size-select>
            </dile-crud-list-options>
        `;
    }
}
