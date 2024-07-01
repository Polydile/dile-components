import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select';

export class DileCrudPageSizeSelect extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            dile-select {
                margin-top: 0.5rem
            }
        `
    ];

    static get properties() {
      return {
        pageSizes: { type: Array }
      };
    }

    render() {
        return html`
            <dile-select name="page" label="Tamaño de página" @element-changed=${this.pageChanged}>
                <select slot="select">
                    ${this.pageSizes.map( size => html`<option value="${size}">${size}</option>`)}
                </select>
            </dile-select>
        `;
    }

    pageChanged(e) {
        this.dispatchEvent(new CustomEvent('page-size-changed', {
            bubbles: true,
            composed: true,
            detail: {
                pageSize: e.detail.value
            }
        }));
    }
}


