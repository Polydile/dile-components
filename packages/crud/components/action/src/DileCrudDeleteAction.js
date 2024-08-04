import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class DileCrudDeleteAction extends DileForm(LitElement) {
    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <p>¿De verdad deseas borrar esos elementos?</p>
        `;
    }
}
