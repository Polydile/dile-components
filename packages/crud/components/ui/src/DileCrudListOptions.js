import { LitElement, html, css } from 'lit';
import '@dile/ui/components/icon/icon.js';
import '@dile/ui/components/button/button-icon.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';

export class DileCrudListOptions extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                --dile-icon-color: #fff;
            }
            .content {
                padding: 0.5rem;
                background: var(--dile-primary-light-color);
                color: var(--dile-on-primary-light-color);
            }
            dile-button-icon {
                display: none;
                --dile-primary-color: var(--dile-crud-action-color, #888);
                --dile-on-primary-color: var(--dile-on-crud-action-color, #fff);
                --dile-primary-dark-color: transparent;
                --dile-button-font-size: var(--dile-crud-list-options-font-size, 1rem);
                --dile-button-font-weight: var(--dile-crud-list-options-font-weight, bold);
                --dile-button-text-transform: var(--dile-crud-list-options-text-transform, none);
                --dile-button-letter-spacing: var(--dile-crud-list-options-letter-spacing, 0);
                --dile-button-padding-y: var(--dile-crud-list-options-padding-y, 0.5rem);
                --dile-button-padding-x: var(--dile-crud-list-options-padding-x, 0.8rem);
            }
            dile-icon {
                cursor: pointer;
                --dile-icon-rounded-background-color: var(--dile-crud-action-color, #888);
            }
            dile-icon:focus-visible {
                outline: 2px solid var(--dile-crud-action-focus-color, #12354d);
                outline-offset: 2px;
            }
            @media (min-width: 605px) {
                dile-button-icon {
                    display: block;
                }   
                dile-icon {
                    display: none;
                }
            }
        `
    ];

    static get properties() {
      return {
        label: { type: String },
        icon: { type: Object },
      };
    }

    render() {
        return html`
            <dile-menu-overlay horizontalAlign="under_right" verticalAlign="bottom">
                <div slot="trigger">
                    <dile-icon
                        rounded
                        tabindex="0"
                        role="button"
                        aria-label="${this.label}"
                        title="${this.label}"
                        .icon="${this.icon}"
                        @keydown=${this.iconKeydown}
                    ></dile-icon>
                    <dile-button-icon label="${this.label}" .icon="${this.icon}" gray>${this.label}</dile-button-icon>
                </div>
                <div class="content" slot="content">
                    <slot></slot>
                </div>
            </dile-menu-overlay>
        `;
    }

    // The small-screen dile-icon has no native focus/activation support, unlike the
    // real <button> inside dile-button-icon shown at wider widths, so it needs its
    // own keyboard handling; the resulting click bubbles up to dile-menu-overlay's
    // trigger listener the same way a pointer click already does.
    iconKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }

    close() {
        this.shadowRoot.querySelector('dile-menu-overlay').close();
    }
}
