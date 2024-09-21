import { LitElement, html, css } from 'lit';
import '../crud-list-options';
import '../crud-page-size-select';
import { descriptionIcon } from '@dile/icons';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudPageSize extends DileI18nMixin(LitElement) {

    static get properties() {
        return {
          pageSizes: { type: Array },
            pageSize: { type: Number },
        };
    }

    constructor() {
        super();
        this.pageSizes = [25, 50, 100, 500];
    }

    render() {
        return html`
            <dile-crud-list-options .icon="${descriptionIcon}" label="${this.translations.page_label}">
                <dile-crud-page-size-select pageSize="${this.pageSize}" .pageSizes=${this.pageSizes}></dile-crud-page-size-select>
            </dile-crud-list-options>
        `;
    }
}
