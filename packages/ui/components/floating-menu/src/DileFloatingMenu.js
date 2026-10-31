import { LitElement, html, css } from 'lit';
import { DileOverlay } from '../../../mixins/overlay/index.js';
import { DileCloseOnEscPressed } from '../../../mixins/close-on-esc-pressed/index.js';
import './DileFloatingMenuItem.js';

// Distance between the floating button and the overlay.
const OVERLAY_GAP = 10;

// DileOverlay places the overlay next to the button and keeps it inside the viewport.
// The opened property is the source of truth: open(), close() and toggle() only change it.
export class DileFloatingMenu extends DileOverlay(DileCloseOnEscPressed(LitElement)) {
    static styles = [
        css`
            :host {
                display: block;
                position: fixed;
                top: var(--dile-floating-menu-margin-top, var(--dile-floating-menu-margin, 1.5rem));
                left: var(--dile-floating-menu-margin-left, var(--dile-floating-menu-margin, 1.5rem));
                z-index: var(--dile-floating-menu-zindex, 2);
            }
            :host([hidden]) {
                display: none;
            }
            :host([bottom]) {
                top: auto;
                bottom: var(--dile-floating-menu-margin-bottom, var(--dile-floating-menu-margin, 1.5rem));
            }
            :host([right]) {
                left: auto;
                right: var(--dile-floating-menu-margin-right, var(--dile-floating-menu-margin, 1.5rem));
            }
            :host([left]) {
                left: var(--dile-floating-menu-margin-left, var(--dile-floating-menu-margin, 1.5rem));
                right: auto;
            }
            :host([top]) {
                top: var(--dile-floating-menu-margin-top, var(--dile-floating-menu-margin, 1.5rem));
                bottom: auto;
            }

            :host([opened]) #topline {
                transform: rotate(45deg) translate(2px, 2px);
            }

            :host([opened]) #bottomline {
                transform: rotate(-45deg) translate(2px, -2px);
            }

            .line {
                background-color: var(--dile-floating-menu-icon-background-color, aliceblue);
                width: 24px;
                height: 2px;
                transition: transform 0.2s ease-in-out;
            }

            #trigger {
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 4px;
                min-width: var(--dile-floating-menu-button-size, 48px);
                min-height: var(--dile-floating-menu-button-size, 48px);
                padding: var(--dile-floating-menu-button-padding, 0);
                background-color: var(--dile-floating-menu-background-color, navy);
                color: var(--dile-floating-menu-icon-background-color, aliceblue);
                --dile-icon-color: var(--dile-floating-menu-icon-background-color, aliceblue);
                border-radius: var(--dile-floating-menu-button-border-radius, 999px);
                border: none;
                font: inherit;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            #trigger:hover {
                background-color: var(--dile-floating-menu-background-color-hover, mediumblue);
            }

            #trigger:focus-visible {
                outline: 2px solid var(--dile-floating-menu-background-color, navy);
                outline-offset: 2px;
            }

            #overlay {
                box-sizing: border-box;
                display: none;
                position: fixed;
                width: var(--dile-floating-menu-overlay-width, max-content);
                max-width: var(--dile-floating-menu-overlay-max-width, calc(100vw - 25px));
                max-height: var(--dile-floating-menu-overlay-max-height, calc(100vh - 100px));
                overflow-y: auto;
                background-color: var(--dile-floating-menu-overlay-background-color, var(--dile-floating-menu-background-color, navy));
                color: var(--dile-floating-menu-overlay-color, aliceblue);
                border-radius: var(--dile-floating-menu-overlay-border-radius, 4px);
                box-shadow: var(--dile-floating-menu-overlay-box-shadow, 0 0 20px rgba(0, 0, 0, 0.3));
                padding: var(--dile-floating-menu-overlay-padding, 24px);
                opacity: 0;
                transform: translateY(-10px);
                transition: transform 0.3s ease, opacity 0.3s ease;
            }

            :host([bottom]) #overlay {
                transform: translateY(10px);
            }

            :host #overlay.opened {
                opacity: 1;
                transform: translateY(0);
            }

            @media (prefers-reduced-motion: reduce) {
                .line, #trigger, #overlay {
                    transition: none;
                }
            }
        `
    ];

    static properties = {

        opened: {
            type: Boolean,
            reflect: true,
        },

        top: {
            type: Boolean,
            reflect: true,
        },

        bottom: {
            type: Boolean,
            reflect: true,
        },

        right: {
            type: Boolean,
            reflect: true,
        },

        left: {
            type: Boolean,
            reflect: true,
        },

        /**
         * Accessible name of the floating button.
         */
        label: {
            type: String,
        },

        /**
         * If true, the menu closes when any link or button inside it is clicked.
         */
        closeOnClick: {
            type: Boolean,
            attribute: 'close-on-click',
        },
    }

    constructor() {
        super();
        this.opened = false;
        this.top = false;
        this.left = false;
        this.right = false;
        this.bottom = false;
        this.label = 'Menu';
        this.closeOnClick = false;
        this.documentClickHandler = this._onDocumentClick.bind(this);
        this.addEventListener('focusout', this._onFocusOut);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this.documentClickHandler);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this.documentClickHandler);
        this.opened = false;
    }

    updated(changedProperties) {
        if (changedProperties.has('opened')) {
            if (this.opened) {
                this._showOverlay();
            } else if (changedProperties.get('opened')) {
                this._hideOverlay();
            }
        }
    }

    render() {
        return html`
            <button
                id="trigger"
                type="button"
                aria-label="${this.label}"
                aria-expanded="${String(this.opened)}"
                aria-controls="overlay"
                @click="${this.toggle}"
            >
                <slot name="icon">${this._menuIconTpl}</slot>
            </button>
            ${this._listTpl}
        `;
    }

    toggle() {
        if (this.opened) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.opened = true;
    }

    async close() {
        if (!this.opened) {
            return;
        }
        const hadFocus = this.matches(':focus-within');
        this.opened = false;
        await this.updateComplete;
        if (hadFocus) {
            this.trigger.focus({ preventScroll: true });
        }
    }

    _showOverlay() {
        this.verticalAlign = this.bottom ? 'top' : 'bottom';
        this.horizontalAlign = this.right ? 'under_right' : 'under_left';
        // DileOverlay only leaves a gap by itself when the overlay is under the button.
        this.moveTop = this.bottom ? -OVERLAY_GAP : 0;
        super.open();
    }

    _hideOverlay() {
        // Closed during the opening delay of DileOverlay, where its close() would be ignored.
        if (this._opening) {
            this.cancelDelay();
            this._opening = false;
            this._overlayClass = 'opened';
        }
        super.close();
    }

    _onDocumentClick(e) {
        if (this.opened && !e.composedPath().includes(this)) {
            this.opened = false;
        }
    }

    _onFocusOut(e) {
        // relatedTarget is null when the focus does not go to another element, like when the window loses it.
        if (this.opened && e.relatedTarget && !this.contains(e.relatedTarget)) {
            this.opened = false;
        }
    }

    _onOverlayClick(e) {
        const path = e.composedPath();
        const nodes = path.slice(0, path.indexOf(e.currentTarget));
        const closer = nodes.find(node =>
            node instanceof Element &&
            (node.hasAttribute('data-close') || (this.closeOnClick && (node.tagName === 'A' || node.tagName === 'BUTTON')))
        );
        if (closer) {
            this.close();
        }
    }

    get _listTpl() {
        return html`
            <div
                id="overlay"
                class="${this._overlayClass}"
                ?inert="${!this.opened}"
                @click="${this._onOverlayClick}"
            >
                <slot name="content-top"></slot>
                <slot></slot>
                <slot name="content-bottom"></slot>
            </div>
        `;
    }

    get _menuIconTpl() {
        return html`
            <div id="topline" class="line"></div>
            <div id="bottomline" class="line"></div>
        `
    }

}
