import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudDeleteAction extends DileI18nMixin(DileForm(LitElement)) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <p>${this.translations.delete_confirm_message_plural}</p>
        `;
    }
}
