import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { switchLeftIcon } from '@dile/icons/index.js';
import '../../button/button-icon.js'


export class DileOrderSwitch extends DileEmmitChange(LitElement) {
  static get properties() {
    return {
      value: { type: String },
      name: { type: String },
      label: { type: String },
      /** Marks this switch as the one currently in effect, e.g. inside a group of
       * order options where only one applies at a time. When true, clicking the
       * label toggles the order (same as clicking the icon) instead of just
       * re-announcing the current value. */
      selected: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.value = "asc";
    this.selected = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 10px;
        --dile-button-border-radius: 2rem;
        --dile-button-padding-x: 0.15rem;
        --dile-button-padding-y: 0.15rem;
        --dile-button-background-color: transparent;
        --dile-button-icon-color: var(--dile-order-switch-icon-color, var(--dile-link-color, #3399ff));
        --dile-button-icon-size: var(--dile-order-switch-icon-size, 1.5rem);
        --dile-button-border-width: 0;
      }
      div {
        align-items: center;
        display: flex;
      }
      a {
        color: inherit;
        text-decoration: var(--dile-order-switch-text-decoration, none);
      }
      dile-button-icon {
        transform: rotate(-90deg);
        margin-right: 0.4rem;
        transition: transform 0.3s ease-in-out;
      }
      .desc {
        transform: rotate(90deg);
      }

      .text-selected {
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <div>
        <dile-button-icon 
          .icon="${switchLeftIcon}" 
          class="${this.value}"
          @click=${this.toggle}
        ></dile-button-icon>
        <a class="${this.selected ? 'text-selected' : ''}" href="#" @click=${this.onlyChange}>
          ${this.label}
        </a>
      </div>
    `;
  }

  updated(changedProperties) {
    if(changedProperties.has('value')) {
      if(this.value != "asc" && this.value != "desc") {
        this.value = "asc";
      } else if(changedProperties.get('value')) {
        this.emmitChange();
      }
    }
  }

  onlyChange(e) {
    e.preventDefault();
    if (this.selected) {
      this.toggle();
    } else {
      this.emmitChange();
    }
  }

  toggle() {
    this.value = this.value === "asc" ? "desc" : "asc";
  }
}
