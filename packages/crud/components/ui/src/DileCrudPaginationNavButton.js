import { LitElement, html, css } from 'lit';
import { doubleArrowLeftIcon, doubleArrowRightIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon';

export class DileCrudPaginationNavButton extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                cursor: pointer;
            }
            dile-icon {
                --dile-icon-color: var(--dile-on-secondary-color, #fff);
                --dile-icon-rounded-background-color: var(--dile-secondary-color, #2962FF);
            }
            dile-icon:hover {
                --dile-icon-color: var(--dile-on-secondary-dark-color, #1942DF);
                --dile-icon-rounded-background-color: var(--dile-secondary-dark-color, #fff);
            }
            dile-icon.disabled {
                --dile-icon-color: #f5f5f5;
                --dile-icon-rounded-background-color: #ddd;
                cursor: default;
            }
        `
    ];

    static get properties() {
      return {
        direction: { type: String },
        disabled: { type: Boolean },
      };
    }

    render() {
        return html`
            <dile-icon 
                rounded 
                class="${this.disabled ? 'disabled' : ''}" 
                .icon="${this.direction == 'right' ? doubleArrowRightIcon : doubleArrowLeftIcon}"
            ></dile-icon>
        `;
    }
}
