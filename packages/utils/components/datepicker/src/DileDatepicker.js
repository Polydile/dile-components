import { html, css, LitElement } from "lit";
import { DileInput } from '@dile/ui/components/input/index.js';
import '@dile/ui/components/icon/icon.js';
import { calendarIcon } from '@dile/icons/index.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';

import {
  formatDate,
} from '@lion/ui/localize.js';

export class DileDatepicker extends DileInput {
  static get styles() {
    return [
      super.styles,
      css`
      div.container {
        display: flex;
        align-items: flex-end;
      }
      section.input {
        flex-grow: 1;
        margin-right: 10px;
      }
      dile-icon {
        cursor: pointer;
        --dile-icon-size: var(--dile-datepicker-trigger-size, 36px);
      }
      dile-calendar {
        font-size: var(--dile-datepicker-font-size, 0.9rem); 
      }
      dile-menu-overlay {
        --dile-menu-overlay-width: var(--dile-datepicker-width, 280px);
      }
      dile-icon {
        --dile-icon-color: var(--dile-datepicker-trigger-color, #39c);
      }
      dile-icon.trigger-disabled {
        --dile-icon-color: var(--dile-datepicker-trigger-disabled-color, #ccc);
      }
      span {
        display: flex;
        margin-bottom: var(--dile-datepicker-trigger-margin-bottom, 0.2em);
      }
      @media(min-width: 350px) {
        dile-menu-overlay {
          --dile-menu-overlay-width: var(--dile-datepicker-width, 300px);
          --dile-menu-overlay-max-width: var(--dile-datepicker-width, 300px);
        } 
      }
      @media(min-width: 450px) {
        dile-menu-overlay {
          --dile-menu-overlay-width: var(--dile-datepicker-width, 320px);
          --dile-menu-overlay-max-width: var(--dile-datepicker-width, 320px);
        } 
      }
      @media(min-width: 500px) {
        dile-menu-overlay {
          --dile-menu-overlay-width: var(--dile-datepicker-width, 350px);
          --dile-menu-overlay-max-width: var(--dile-datepicker-width, 350px);
        } 
      }
    `];
  }
  
  static get properties() {
    return {
      firstDayOfWeek: { type: Number },
      horizontalAlign: { type: String },
      verticalAlign: { type: String },
      moveTop: { type: Number },
      moveLeft: { type: Number },
    };
  }

  constructor() {
    super();
    this.firstDayOfWeek = 0;
    this.horizontalAlign = 'under_right';
    this.verticalAlign = 'center';
    this.moveTop = 0;
    this.moveLeft = 0;
  }


  render() {
    return html`
      <div class="container">
        <section class="input">
          ${super.render()}
        </section>
        <span>
          ${this.disabled 
            ? html`<dile-icon class="trigger-disabled" .icon="${calendarIcon}"></dile-icon>`
            : html`
              <dile-menu-overlay moveTop="${this.moveTop}" moveLeft="${this.moveLeft}" verticalAlign="${this.verticalAlign}" horizontalAlign="${this.horizontalAlign}" id="menu">
                ${this.iconTemplate}
                <div slot="content" class="calendar">
                  ${this.contentTemplate}
                </div>
              </dile-menu-overlay>
            `
          }
        </span>
      </div>
    `;
  }

  showDate(e) {
    let date = formatDate(e.detail.selectedDate);
    this.value = date;
    this.shadowRoot.getElementById('menu').close();
  }  

  get iconTemplate() {
    return html`<dile-icon .icon="${calendarIcon}" slot="trigger"></dile-icon>`
  }

  get contentTemplate() {
    return html`
      <dile-calendar 
        class="demo-calendar"
        .firstDayOfWeek="${this.firstDayOfWeek}"
        @user-selected-date-changed=${this.showDate} 
      ></dile-calendar>
    `
  }
}
