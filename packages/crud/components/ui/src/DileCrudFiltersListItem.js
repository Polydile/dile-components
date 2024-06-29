import { LitElement, html, css } from 'lit';
import '@dile/ui/components/chip/chip.js';

export class DileCrudFiltersListItem extends LitElement {
    static styles = [
        css`
            :host {
                display: inline-block;
            }
        `
    ];

    static get properties() {
      return {
        name: { type: String },
        active: { type: Boolean },
        label: { type: String },
      };
    }
    render() {
        return html`
           ${this.active
            ? html`<dile-chip name="${ this.name }">${ this.label }</dile-chip>`
            : ''
        }
        `;
    }
}