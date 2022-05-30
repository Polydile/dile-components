import { html, css, LitElement } from "lit";
import { DileEmmitChangeMixin } from '@dile/dile-form-mixin'; 
import { switchLeftIcon } from '@dile/icons';
import '@dile/dile-icon/dile-icon.js';


export class DileOrderSwitch extends DileEmmitChangeMixin(LitElement) {
  static get properties() {
    return {
      value: { type: String },
      name: { type: String },
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.value = "asc";
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
      dile-icon {
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
      <div @click=${this.doClick}>
        <dile-icon .icon="${switchLeftIcon}" class="${this.value}"></dile-icon>
        <span>
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

  doClick(e) {
    if (this.value === "asc") {
      this.value = "desc";
    } else {
      this.value = "asc";
    }
  }
}
