import { html, css, LitElement } from "lit";
import { DileInput } from '@dile/dile-input';
import '@dile/dile-icon/dile-icon.js';
import { calendarIcon } from '@dile/icons';
import '@dile/dile-menu-overlay/dile-menu-overlay.js';
import { formatDate } from '@lion/localize';

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
        --dile-icon-size: 32px;
      }
      dile-calendar {
        font-size: var(--dile-datepicker-font-size, 0.9rem); 
      }
      dile-menu-overlay {
        --dile-menu-overlay-width: 300px;
      }
      dile-icon {
        --dile-icon-color: var(--dile-datepicker-trigger-color, #39c);
      }
      dile-icon.trigger-disabled {
        --dile-icon-color: var(--dile-datepicker-trigger-disabled-color, #ccc);
      }
      @media(min-width: 350px) {
        dile-menu-overlay {
          --dile-menu-overlay-width: 340px;
          --dile-menu-overlay-max-width: 340px;
        } 
      }
      @media(min-width: 400px) {
        dile-menu-overlay {
          --dile-menu-overlay-padding: 0.5rem;
          --dile-menu-overlay-width: 380px;
          --dile-menu-overlay-max-width: 380px;
        } 
      }
      @media(min-width: 500px) {
        dile-menu-overlay {
          --dile-menu-overlay-padding: 1rem;
          --dile-menu-overlay-width: 450px;
          --dile-menu-overlay-max-width: 450px;

        } 
      }
    `];
  }
  
  static get properties() {
    return {
      firstDayOfWeek: { type: Number },
    };
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
              <dile-menu-overlay>
                <dile-icon .icon="${calendarIcon}" slot="trigger"></dile-icon>
                <div slot="content" class="calendar">
                  <dile-calendar 
                    class="demo-calendar"
                    .firstDayOfWeek="${this.firstDayOfWeek}"
                    @user-selected-date-changed=${this.showDate} 
                  ></dile-calendar> 
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
  }  
}
