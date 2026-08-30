import { html, css } from "lit";
import { DileInputIcon } from '@dile/ui/components/input/index.js';
import { DileCloseOnEscPressed } from '@dile/ui/mixins/close-on-esc-pressed';
import '@dile/iconlib/lucide-icons/calendar.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';

import {
  formatDate,
} from '@lion/ui/localize.js';

export class DileDatepicker extends DileCloseOnEscPressed(DileInputIcon) {
  static get styles() {
    return [
      super.styles,
      css`
        dile-calendar {
          font-size: var(--dile-datepicker-font-size, 0.9rem); 
        }
        dile-menu-overlay {
          display: flex;
          align-items: center;
          --dile-menu-overlay-width: var(--dile-datepicker-width, 280px);
          --dile-menu-overlay-max-width: var(--dile-datepicker-width, 280px);
        }
        .trigger-container {
          display: flex;
          align-items: center;
        }
        .input-icon-btn {
          --dile-input-icon-color: var(--dile-datepicker-trigger-color, var(--dile-on-background-color, #303030));
          --dile-input-icon-size: var(--dile-datepicker-trigger-size, 20px);
          --dile-input-icon-background-color: var(--dile-datepicker-trigger-background-color, transparent);
          --dile-input-icon-hover-background-color: var(--dile-datepicker-trigger-hover-background-color, var(--dile-input-icon-hover-bg, rgba(0, 0, 0, 0.05)));
        }
        .input-icon-btn:disabled {
          --dile-input-icon-color: var(--dile-datepicker-trigger-disabled-color, #ccc);
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
      `
    ];
  }
  
  static get properties() {
    return {
      ...super.properties,
      firstDayOfWeek: { type: Number },
      horizontalAlign: { type: String },
      verticalAlign: { type: String },
      moveTop: { type: Number },
      moveLeft: { type: Number },
      opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.icon = 'lucide.calendar';
    this.firstDayOfWeek = 0;
    this.horizontalAlign = 'under_right';
    this.verticalAlign = 'center';
    this.moveTop = 0;
    this.moveLeft = 0;
    this.opened = false;
  }

  renderIconButton() {
    if (this.disabled) {
      return super.renderIconButton();
    }
    return html`
      <dile-menu-overlay 
        moveTop="${this.moveTop}" 
        moveLeft="${this.moveLeft}" 
        verticalAlign="${this.verticalAlign}" 
        horizontalAlign="${this.horizontalAlign}" 
        id="menu"
        @overlay-opened="${this.overlayOpenedHandler}"
        @overlay-closed="${this.overlayClosedHandler}"
      >
        <div slot="trigger" class="trigger-container">
          ${super.renderIconButton()}
        </div>
        <div slot="content" class="calendar">
          ${this.contentTemplate}
        </div>
      </dile-menu-overlay>
    `;
  }

  overlayOpenedHandler() {
    this.opened = true;
  }

  overlayClosedHandler() {
    this.opened = false;
  }

  showDate(e) {
    let date = formatDate(e.detail.selectedDate);
    this.value = date;
    const menu = this.shadowRoot.getElementById('menu');
    if (menu) {
      menu.close();
    }
  }
  
  close() {
    const menu = this.shadowRoot.getElementById('menu');
    if (menu) {
      menu.close();
    }
  }
  
  openDatepicker() {
    const menu = this.shadowRoot.getElementById('menu');
    if (menu) {
      menu.open();
    }
  }
  
  closeDatepicker() {
    this.close();
  }

  get contentTemplate() {
    return html`
      <dile-calendar 
        class="demo-calendar"
        .firstDayOfWeek="${this.firstDayOfWeek}"
        @user-selected-date-changed=${this.showDate} 
      ></dile-calendar>
    `;
  }
}
