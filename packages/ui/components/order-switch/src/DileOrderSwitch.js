import { html, css, LitElement } from "lit";
import { DileEmmitChange } from '../../../mixins/form/index.js';
import { switchLeftIcon } from '@dile/icons/index.js';
import '../../icon/icon.js';


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
      }
      div {
        align-items: center;
        display: flex;
      }
      span {
        cursor: pointer;
      }
      dile-icon {
        cursor: pointer;
        transform: rotate(-90deg);
        margin-right: 0.4rem;
        transition: transform 0.3s ease-in-out;
      }
      .desc {
        transform: rotate(90deg);
      }
    `;
  }

  render() {
    return html`
      <div>
        <dile-icon 
          .icon="${switchLeftIcon}" 
          class="${this.value}"
           @click=${this.toggle}
        ></dile-icon>
        <span @click=${this.onlyChange}>
          ${this.label}
        </span>
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

  onlyChange() {
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
