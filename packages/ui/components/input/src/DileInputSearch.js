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
                border-color: var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                /* Outline adicional para mayor visibilidad */
                outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                outline-offset: 2px;
            }
            input {
                flex-grow: 1;
                border: none;
                color: var(--dile-input-color, #303030);
                font-size: var(--dile-input-font-size, 1em);
                line-height: var(--dile-input-line-height, 1.5em);
                background-color: var(--dile-input-background-color, #fff);
                padding: 2px 4px;
            }
            input:focus {
                outline: none;
            }
            input::placeholder {
              /* WCAG AA contrast: #666 sobre #fff = 7.5:1 */
              color: var(--dile-input-placeholder-color, #666);
            }
            .icon-button {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                margin-left: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
                color: var(--dile-input-color, #303030);
                font-size: 1em;
            }
            .icon-button:focus {
                outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                outline-offset: 1px;
            }
            .icon-button:hover:not(:disabled) {
                background-color: var(--dile-input-hover-background, rgba(0,0,0,0.05));
            }
            .icon-button:disabled {
                cursor: not-allowed;
                opacity: 0.5;
            }
            dile-icon {
                display: flex;
            }
            :host([disabled]) {
                opacity: 0.5;
            }
            .errored {
                border-color: var(--dile-input-error-border-color, #c00);
            }
            .error-message {
                color: var(--dile-input-error-border-color, #c00);
                font-size: 0.875em;
                margin-top: 4px;
                padding: 4px 0;
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
        const iconLabel = this.value.length 
            ? 'Limpiar búsqueda'
            : 'Buscar';
        
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
                aria-label="${this.name || 'Búsqueda'}"
                ?aria-invalid="${this.errored}"
                aria-describedby="${this.errored ? 'error-msg' : null}"
            >
            <button
              @click=${this.iconClick}
              @keydown=${this.iconKeydown}
              class="icon-button"
              aria-label="${iconLabel}"
              type="button"
              ?disabled="${this.disabled}"
            >
              <dile-icon 
                .icon="${this.value.length ? clearIcon : searchIcon}"
                aria-hidden="true"
              ></dile-icon>
            </button>
        </div>
        ${this.errored ? html`
          <div id="error-msg" class="error-message" role="alert">
            <slot name="error"></slot>
          </div>
        ` : ''}
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

    iconKeydown(e) {
        // Permitir Space y Enter para activar el icono
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.clear();
            this.input.focus();
        }
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