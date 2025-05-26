import { LitElement, html, css } from 'lit';
import { DileDatepicker } from './DileDatepicker';
import { dateTimeIcon } from '@dile/icons';
import '@dile/ui/components/time-picker/time-picker.js';
import { doneIcon } from '@dile/icons';

function formatToIsoOnlyDate(date) {
    const pad = n => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatIfIso8601(dateStr) {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

  if (!iso8601Regex.test(dateStr)) {
    return dateStr;
  }

  const date = new Date(dateStr);
  if (isNaN(date)) {
    return dateStr;
  }

  const pad = n => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export class DileDatetimepicker extends DileDatepicker {

  static get styles() {
    return [
      ...super.styles,
      css`
        .overlay-view {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }
        .time-area {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .time-area span {
          display: flex;
          align-items: center;
        }
        .time-area dile-icon {
          --dile-icon-size: var(--dile-datetimepicker-accept-icon-size, 24px);
          --dile-icon-color: var(--dile-datetimepicker-accept-icon-color, var(--dile-on-primary-color, #888));
          --dile-icon-rounded-background-color: var(--dile-datetimepicker-accept-icon-background-color, var(--dile-primary-color, #f4f4f4));
          cursor: pointer;
        }
        dile-time-picker {
          margin-bottom: 0;
        }
    `];
  }
  get iconTemplate() {
    return html`<dile-icon .icon="${dateTimeIcon}" slot="trigger"></dile-icon>`
  }

  get contentTemplate() {
    return html`
      <div class="overlay-view">
        <dile-calendar 
          class="demo-calendar"
          .firstDayOfWeek="${this.firstDayOfWeek}"
          @user-selected-date-changed=${this.showDateHandler} 
        ></dile-calendar>
        <div class="time-area">
          <span>
            <dile-time-picker></dile-time-picker>
          </span>
          <dile-icon rounded .icon=${doneIcon} @click=${this.acceptTime}></dile-icon>
        </div>
      </div>
    `
  }

  get eltime() {
    return this.shadowRoot.querySelector('dile-time-picker');
  }

  get elmenu() {
    return this.shadowRoot.getElementById('menu');
  }

  showDateHandler(e) {
    this.showDate(e.detail.selectedDate)
  }

  showDate(selectedDate) {
    let date = formatToIsoOnlyDate(selectedDate);
    let time = this.eltime.value;
    this.value = `${date} ${time}`;
    this.elmenu.close();
  }
  acceptTime() {
    let date = this.shadowRoot.querySelector('dile-calendar').selectedDate;
    if(!date) {
      date = new Date();
    }
    this.showDate(date);
  }  

  computeValue(value){
    return formatIfIso8601(value);
  }
}
