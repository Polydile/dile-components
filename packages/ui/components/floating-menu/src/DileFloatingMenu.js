import { LitElement, html, css } from 'lit';
import './DileFloatingMenuItem.js';

export class DileFloatingMenu extends LitElement {
    static styles = [
        css`
            :host {
                --dile-floating-menu-margin: 1.5rem;
                --dile-floating-menu-margin-bottom: var(--dile-floating-menu-margin-bottom);
                --dile-floating-menu-margin-top: var(--dile-floating-menu-margin-top);
                --dile-floating-menu-margin-left: var(--dile-floating-menu-margin-left);
                --dile-floating-menu-margin-right: var(--dile-floating-menu-margin-right);
                --dile-floating-menu-background-color: navy;
                --dile-floating-menu-background-color-hover: mediumblue;
                --dile-floating-menu-icon-background-color: aliceblue;

                position: absolute;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;
                top: var(--dile-floating-menu-margin-top, var(--dile-floating-menu-margin));
                left: var(--dile-floating-menu-margin-left, var(--dile-floating-menu-margin));
            }
            :host([bottom]) {
                bottom: var(--dile-floating-menu-margin-bottom, var(--dile-floating-menu-margin));
                flex-direction: column-reverse;
                top: inherit;
            }
            :host([right]) {
                right: var(--dile-floating-menu-margin-right, var(--dile-floating-menu-margin));
                align-items: flex-end;
                left: inherit;
            }
            :host([left]) {
                left: var(--dile-floating-menu-margin-left, var(--dile-floating-menu-margin));
                right: inherit;
            }
            :host([top]) {
                top: var(--dile-floating-menu-margin-top, var(--dile-floating-menu-margin));
                flex-direction: column;
                bottom: inherit;
            }

            :host([opened]) #topline {
                transform: rotate(45deg) translate(2px, 2px);
            }

            :host([opened]) #bottomline {
                transform: rotate(-45deg) translate(2px, -2px);
            }

            .line {
                background-color: var(--dile-floating-menu-icon-background-color);
                width: 24px;
                height: 2px;
                transition: transform 0.2s ease-in-out;
            }

            button {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 4px;
                background-color: var(--dile-floating-menu-background-color);
                border-radius: 50%;
                width: 48px;
                height: 48px;
                border: none;
                cursor: pointer;
                transition: background-color 1s, gap 0.5s;
            }

            button:hover {
                background-color: var(--dile-floating-menu-background-color-hover);
            }

            @keyframes opacity {
                from {opacity: 0; scale: 90%;}
                to {opacity: 1; scale:100%;}
            }

            .opened {
                display: block
                animation: opacity;
                animation-duration: 0.5s;
                background-color: var(--dile-floating-menu-background-color);
                border-radius: 4px;
                padding: 24px;
            }

            .closed {
                display: none;
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
    }

    constructor() {
        super();
        this.opened = false;
        this.top = false;
        this.left = false;
        this.right = false;
        this.bottom = false;
    }

    render() {
        return html`
            <button @click="${this.toggle}" type="button">
                ${this._menuIconTpl}
            </button>
            ${this._listTpl}
        `;
    }

    toggle(e) {
        this.opened = !this.opened;
    }

    get _listTpl() {
        return html`
            <div class="${this.opened ? 'opened' : 'closed'}">
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