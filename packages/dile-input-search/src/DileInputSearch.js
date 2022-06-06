import { LitElement, html, css } from 'lit';
import '@dile/dile-icon/dile-icon.js';
import { searchIcon } from '@dile/icons';
import { clearIcon } from '@dile/icons';

export class DileInputSearch extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            div {
                display: flex;
                box-sizing: border-box;
                border-radius: var(--dile-input-border-radius, 5px);
                border: var(--dile-input-border-width, 1px) solid var(--dile-input-border-color, #888);
                padding: var(--dile-input-padding, 5px);
                width: var(--dile-input-width, 100%);
                background-color: var(--dile-input-background-color, #fff);
            }
            input {
                flex-grow: 1;
                border: none;
                outline: none;
                color: var(--dile-input-color, #303030);
                font-size: var(--dile-input-font-size, 1em);
                line-height: var(--dile-input-line-height, 1.5em);
                background-color: var(--dile-input-background-color, #fff);
            }
            input::placeholder {
              color: var(--dile-input-placeholder-color, #ccc);
            }
            dile-icon {
                margin-left: 1px;
                display: flex;
            }
            :host([disabled]) {
                opacity: 0.5;
            }
        `
    ];

    static get properties() {
      return {
        delay: { type: Number },
        placeholder: { type: String },
        value: { type: String },
        disabled: { type: Boolean },
      };
    }

    constructor() {
        super();
        this.delay = 300;
        this.timeout = null;
        this.value = '';
    }

    firstUpdated() {
        this.input = this.shadowRoot.getElementById('elinput');
    }

    render() {
        return html`
        <div>
            <input 
                id="elinput"
                type="text" 
                placeholder="${this.placeholder}" 
                @input=${this.inputHandler}
                autocomplete="off"
                .value="${this.value}"
                ?disabled="${this.disabled}"
            >
            <dile-icon 
              @click=${this.iconClick}
              .icon="${this.value.length ? clearIcon : searchIcon}"
            ></dile-icon>
        </div>
        `;
    }

    inputHandler(e) {
        this.value = e.target.value;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.dispatchSearch(this.value);
        }, this.delay);
    }

    iconClick(e) {
        this.clear();
        this.input.focus();
    }

    dispatchSearch(key) {
        this.dispatchEvent(new CustomEvent('dile-input-search', {
            bubbles: true,
            composed: true,
            detail: {
                keyword: key
            }
        }));
    }

    clear() {
        if(this.value.length) {
            this.value = '';
            this.dispatchSearch(this.value);
        }
    }
}