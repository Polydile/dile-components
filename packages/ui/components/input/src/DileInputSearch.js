import { LitElement, html, css } from 'lit';
import '../../icon/icon.js';
import { searchIcon, clearIcon } from '@dile/icons/index.js';

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
            div:focus-within {
                border-color: var(--dile-input-focus-border-color, #6af);
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
            .errored {
                border-color: var(--dile-input-error-border-color, #c00);
            }
        `
    ];

    static get properties() {
      return {
        delay: { type: Number },
        placeholder: { type: String },
        value: { type: String },
        disabled: { type: Boolean },
        readOnly: { type: Boolean },
        errored: { type: Boolean },
        /** Name for this input field */
        name: { type: String },
      };
    }

    constructor() {
        super();
        this.delay = 300;
        this.timeout = null;
        this.value = '';
        this.readOnly = false;
        this.errored = false;
    }

    firstUpdated() {
        this.input = this.shadowRoot.getElementById('elinput');
    }

    render() {
        return html`
        <div class="${this.errored ? "errored" : ""}">
            <input 
                id="elinput"
                type="text" 
                placeholder="${this.placeholder}" 
                @input=${this.inputHandler}
                autocomplete="off"
                .value="${this.value}"
                ?disabled="${this.disabled}"
                ?readonly="${this.readOnly}"
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
        this.dispatchEvent(new CustomEvent('@dile-input-search=${this.hideErrorOnInteraction}', {
            bubbles: true,
            composed: true,
            detail: {
                keyword: key
            }
        }));
    }

    dispatchClear() {
        this.dispatchEvent(new CustomEvent('dile-input-search-cleared', {
            bubbles: true,
            composed: true,
        }));
    }

    clear() {
        if(this.value.length) {
            this.value = '';
            this.dispatchSearch(this.value);
            this.dispatchClear();
        }
    }

    focus() {
        this.input.focus();
    }

    set(value) {
        if (this.input) {
            this.value = value;
            this.dispatchSearch(value);
        } else {
            setTimeout( () => this.set(value), 200);
        }
    }
}