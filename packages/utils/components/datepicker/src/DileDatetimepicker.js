import { html, css, svg, nothing } from 'lit';
import { DileDatepicker } from './DileDatepicker.js';
import '@dile/iconlib/lucide-icons/calendar-clock.js';
import '@dile/ui/components/wheel-picker/wheel-picker.js';
import '@dile/ui/components/icon/icon.js';
import { doneIcon } from '@dile/icons';

const checkIcon = svg`<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>`;
const pad = n => String(n).padStart(2, '0');

function formatToIsoOnlyDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Converts ISO 8601 date-times ("2024-03-15T10:30:00Z", "2024-03-15T10:30:00+02:00",
 * "2024-03-15T10:30") to the "YYYY-MM-DD HH:mm:ss" format, in local time.
 * Other values are returned without changes.
 * @param {string} dateStr
 * @returns {string}
 */
function formatIfIso8601(dateStr) {
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$/;

  if (!iso8601Regex.test(dateStr)) {
    return dateStr;
  }

  const date = new Date(dateStr);
  if (isNaN(date)) {
    return dateStr;
  }

  return `${formatToIsoOnlyDate(date)} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

/**
 * Reads the "HH:mm" or "HH:mm:ss" time written after the date in the value.
 * @param {string} value
 * @returns {string|undefined} the time as "HH:mm:ss", or undefined when there is no valid time
 */
export function valueToTime(value) {
  const match = /(?:^|[ T])(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/.exec(String(value ?? '').trim());
  if (!match) {
    return undefined;
  }
  const [hours, minutes, seconds = 0] = match.slice(1).map((part) => Number(part ?? 0));
  if (hours > 23 || minutes > 59 || seconds > 59) {
    return undefined;
  }
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function timeToParts(time) {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return { hours, minutes, seconds };
}

function validStep(step) {
  const value = Math.round(Number(step));
  return value >= 1 && value <= 59 ? value : 1;
}

/**
 * Wheel items from 0 to max with the given step. A current value out of the step is also included.
 */
function stepItems(max, step, current) {
  const values = [];
  for (let value = 0; value <= max; value += step) {
    values.push(value);
  }
  if (Number.isInteger(current) && !values.includes(current)) {
    values.push(current);
    values.sort((a, b) => a - b);
  }
  return values.map((value) => ({ value, label: pad(value) }));
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
        .date-time-body {
          position: relative;
        }
        .date-time-body.time-open > dile-calendar {
          visibility: hidden;
        }
        .time-layer {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-sizing: border-box;
          --dile-wheel-picker-width: var(--dile-datetimepicker-wheel-width, 4.5rem);
          --dile-wheel-picker-item-height: var(--dile-calendar-wheel-item-height, 36px);
          --dile-wheel-picker-font-size: var(--dile-calendar-wheel-font-size, 1.1rem);
          --dile-wheel-picker-text-color: var(--dile-calendar-wheel-text-color, color-mix(in srgb, var(--dile-calendar-day-text-color, #303030) 60%, transparent));
          --dile-wheel-picker-selected-text-color: var(--dile-calendar-wheel-selected-text-color, var(--dile-calendar-day-text-color, #303030));
          --dile-wheel-picker-band-background-color: var(--dile-calendar-wheel-band-background-color, var(--dile-calendar-day-background-color, rgba(90, 90, 90, 0.08)));
        }
        .time-columns {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .time-separator {
          font-size: var(--dile-calendar-wheel-font-size, 1.1rem);
          color: var(--dile-calendar-day-text-color, #303030);
        }
        .time-layer-accept {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          padding: 0;
          border: 1px solid var(--dile-calendar-month-year-accept-border-color, color-mix(in srgb, currentColor 35%, transparent));
          border-radius: 50%;
          background: transparent;
          color: var(--dile-calendar-month-year-accept-color, var(--dile-calendar-nav-buttons-color, #303030));
          cursor: pointer;
        }
        .time-layer-accept:hover {
          background-color: var(--dile-calendar-day-background-color, rgba(90, 90, 90, 0.08));
        }
        .time-layer-accept svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }
        .time-area {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .time-toggle {
          min-height: 30px;
          padding: 0 4px;
          border: 0;
          border-bottom: 1px dotted currentColor;
          border-radius: 0;
          background: transparent;
          color: var(--dile-datetimepicker-time-color, var(--dile-calendar-day-text-color, #303030));
          font: inherit;
          font-size: var(--dile-datetimepicker-time-font-size, 1.1rem);
          font-variant-numeric: tabular-nums;
          cursor: pointer;
        }
        .time-toggle[aria-expanded="true"] {
          border-bottom-style: solid;
        }
        .time-toggle:focus-visible,
        .time-layer-accept:focus-visible {
          outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
          outline-offset: 2px;
        }
        .accept-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          border-radius: 50%;
          outline: none;
        }
        .accept-button:focus-visible {
          outline: 2px solid var(--dile-datetimepicker-accept-focus-ring-color, var(--dile-primary-color, #2563eb));
          outline-offset: 2px;
        }
        .time-area dile-icon {
          --dile-icon-size: var(--dile-datetimepicker-accept-icon-size, 24px);
          --dile-icon-color: var(--dile-datetimepicker-accept-icon-color, var(--dile-on-primary-color, #888));
          --dile-icon-rounded-background-color: var(--dile-datetimepicker-accept-icon-background-color, var(--dile-primary-color, #f4f4f4));
          cursor: pointer;
        }
    `];
  }

  static get properties() {
    return {
      ...super.properties,
      acceptLabel: { type: String },
      timeLabel: { type: String },
      timeAcceptLabel: { type: String },
      showSeconds: { type: Boolean },
      minuteStep: { type: Number },
      secondStep: { type: Number },
      _time: { state: true },
      _timeOpen: { state: true },
    };
  }

  constructor() {
    super();
    this.icon = 'lucide.calendar-clock';
    this.acceptLabel = 'Accept date and time';
    this.timeLabel = 'Time';
    this.timeAcceptLabel = 'OK';
    this.showSeconds = false;
    this.minuteStep = 1;
    this.secondStep = 1;
    this._time = undefined;
    this._timeOpen = false;
  }

  get contentTemplate() {
    const time = this.selectedTime;
    const shownTime = this.showSeconds ? time : time.slice(0, 5);
    return html`
      <div class="overlay-view">
        <div class="date-time-body ${this._timeOpen ? 'time-open' : ''}">
          <dile-calendar
            class="demo-calendar"
            .firstDayOfWeek="${this.firstDayOfWeek}"
            .weekdayHeaderNotation="${this.weekdayHeaderNotation}"
            .locale="${this.locale}"
            .minYear="${this.minYear}"
            .maxYear="${this.maxYear}"
            .minDate="${this._calendarMinDate}"
            .maxDate="${this._calendarMaxDate}"
            .disableDates="${this.disableDates}"
          ></dile-calendar>
          ${this._timeOpen ? this.timeLayerTemplate : nothing}
        </div>
        <div class="time-area">
          <button
            type="button"
            class="time-toggle"
            aria-expanded="${this._timeOpen ? 'true' : 'false'}"
            aria-controls="time-layer"
            aria-label="${this.timeLabel}: ${shownTime}"
            title="${this.timeLabel}"
            @click=${this.toggleTimePicker}
          >${shownTime}</button>
          <button
            type="button"
            class="accept-button"
            aria-label="${this.acceptLabel}"
            title="${this.acceptLabel}"
            @click=${this.acceptTime}
          >
            <dile-icon rounded .icon=${doneIcon}></dile-icon>
          </button>
        </div>
      </div>
    `;
  }

  get timeLayerTemplate() {
    const { hours, minutes, seconds } = this._timeParts;
    return html`
      <div
        id="time-layer"
        class="time-layer"
        role="group"
        aria-label="${this.timeLabel}"
        @keydown=${this.timeLayerKeydown}
        @dile-wheel-picker-changed=${this.stopInnerEvent}
        @element-changed=${this.stopInnerEvent}
      >
        <div class="time-columns">
          <dile-wheel-picker
            class="hours-wheel"
            label="${this.fieldLabel('hour')}"
            .items="${stepItems(23, 1, hours)}"
            .value="${hours}"
            @dile-wheel-picker-changed=${(e) => this.setTimePart('hours', e.detail.value)}
          ></dile-wheel-picker>
          <span class="time-separator" aria-hidden="true">:</span>
          <dile-wheel-picker
            class="minutes-wheel"
            label="${this.fieldLabel('minute')}"
            .items="${stepItems(59, validStep(this.minuteStep), minutes)}"
            .value="${minutes}"
            @dile-wheel-picker-changed=${(e) => this.setTimePart('minutes', e.detail.value)}
          ></dile-wheel-picker>
          ${this.showSeconds ? html`
            <span class="time-separator" aria-hidden="true">:</span>
            <dile-wheel-picker
              class="seconds-wheel"
              label="${this.fieldLabel('second')}"
              .items="${stepItems(59, validStep(this.secondStep), seconds)}"
              .value="${seconds}"
              @dile-wheel-picker-changed=${(e) => this.setTimePart('seconds', e.detail.value)}
            ></dile-wheel-picker>
          ` : nothing}
        </div>
        <button
          type="button"
          class="time-layer-accept"
          aria-label="${this.timeAcceptLabel}"
          title="${this.timeAcceptLabel}"
          @click=${this.closeTimePickerAndFocusToggle}
        ><svg viewBox="0 0 24 24" aria-hidden="true">${checkIcon}</svg></button>
      </div>
    `;
  }

  get elmenu() {
    return this.shadowRoot.getElementById('menu');
  }

  /**
   * Time selected in the picker, as "HH:mm:ss".
   * Before the picker is opened, it is the current time.
   * @returns {string}
   */
  get selectedTime() {
    return this._time ?? this.currentTime();
  }

  get timePickerOpened() {
    return this._timeOpen;
  }

  get _timeParts() {
    return timeToParts(this.selectedTime);
  }

  /**
   * Current time (seconds at 00), with the minutes rounded down to the minuteStep.
   * @returns {string}
   */
  currentTime() {
    const now = new Date();
    const step = validStep(this.minuteStep);
    return `${pad(now.getHours())}:${pad(Math.floor(now.getMinutes() / step) * step)}:00`;
  }

  /**
   * Besides the calendar, sets the time of the picker to the time of the current value.
   * Without a valid time in the value, the picker shows the current time.
   */
  syncCalendarWithValue() {
    super.syncCalendarWithValue();
    this._time = valueToTime(this.value) ?? this.currentTime();
    this._timeOpen = false;
  }

  overlayClosedHandler() {
    this._timeOpen = false;
    super.overlayClosedHandler();
  }

  /**
   * Shows the hours and minutes wheels over the calendar.
   */
  async openTimePicker() {
    this._timeOpen = true;
    await this.updateComplete;
    const wheel = this.shadowRoot.querySelector('.hours-wheel');
    await wheel?.updateComplete;
    wheel?.focus();
  }

  /**
   * Hides the time wheels and shows the calendar again.
   */
  closeTimePicker() {
    this._timeOpen = false;
  }

  toggleTimePicker() {
    if (this._timeOpen) {
      this.closeTimePicker();
    } else {
      this.openTimePicker();
    }
  }

  async closeTimePickerAndFocusToggle() {
    this.closeTimePicker();
    await this.updateComplete;
    this.shadowRoot.querySelector('.time-toggle')?.focus();
  }

  timeLayerKeydown(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.closeTimePickerAndFocusToggle();
    }
  }

  // The inner wheels are not fields of the form: their changes must not leave the component.
  stopInnerEvent(e) {
    e.stopPropagation();
  }

  setTimePart(part, value) {
    const parts = { ...this._timeParts, [part]: Number(value) };
    this._time = `${pad(parts.hours)}:${pad(parts.minutes)}:${pad(parts.seconds)}`;
  }

  fieldLabel(field) {
    const fallback = { hour: 'Hour', minute: 'Minute', second: 'Second' }[field];
    try {
      const locale = this.locale || document.documentElement.lang || navigator.language || 'en';
      return new Intl.DisplayNames([locale], { type: 'dateTimeField' }).of(field) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  /**
   * Writes the given date with the selected time in the value and closes the picker.
   * @param {Date} selectedDate
   */
  showDate(selectedDate) {
    this.value = `${formatToIsoOnlyDate(selectedDate)} ${this.selectedTime}`;
    if (this.validateDate) {
      this.validate();
    }
    this.elmenu?.close();
  }

  dateToValue(date) {
    return formatToIsoOnlyDate(date);
  }

  doBlur(e) {
    // The value includes the time, so it is validated but never rewritten on blur.
    if (this.validateDate) {
      this.validate();
    }
  }

  /**
   * Accepts the day selected in the calendar and the selected time.
   * Without a selected day, uses the day focused in the calendar,
   * which is always an enabled date (today or the nearest enabled date by default).
   */
  acceptTime() {
    const calendar = this.calendar;
    const date = calendar?.selectedDate || calendar?.centralDate || new Date();
    this.showDate(date);
  }

  computeValue(value){
    return formatIfIso8601(value);
  }
}
