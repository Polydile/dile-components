import { html, css } from "lit";
import { DileInputIcon } from '@dile/ui/components/input/index.js';
import { DileCloseOnEscPressed } from '@dile/ui/mixins/close-on-esc-pressed';
import '@dile/iconlib/lucide-icons/calendar.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';

import {
  formatDate,
  parseDate,
} from '@lion/ui/localize.js';

function deepActiveElement() {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * Converts the minDate / maxDate values of the datepicker to a Date.
 * Accepts Date objects and strings: "YYYY-MM-DD" is read as a local date.
 * @param {Date|string} value
 * @returns {Date|undefined}
 */
export function toCalendarDate(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  const isoDate = parseIsoDate(value);
  if (isoDate !== null) {
    return isoDate;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Reads the date part of "YYYY-MM-DD" strings (an optional time after a space or a "T" is ignored)
 * as a local date. Returns null when the string has another format and undefined when the date doesn't exist.
 * @param {string} value
 * @returns {Date|undefined|null}
 */
function parseIsoDate(value) {
  const match = /^(\d{1,6})-(\d{1,2})-(\d{1,2})(?:[ T].*)?$/.exec(String(value).trim());
  if (!match) {
    return null;
  }
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(2000, 0, 1);
  date.setFullYear(year, month - 1, day);
  return date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}

/**
 * Converts the text value of the datepicker to a Date: "YYYY-MM-DD" values
 * or dates written in the format of the locale (the page locale by default).
 * @param {string} value
 * @param {string} [locale]
 * @returns {Date|undefined}
 */
export function valueToDate(value, locale) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return undefined;
  }
  const isoDate = parseIsoDate(value);
  return isoDate !== null ? isoDate : parseDate(String(value).trim(), locale ? { locale } : undefined);
}

const VALIDATION_MESSAGES = {
  en: {
    invalid: 'Enter a valid date, for example {example}.',
    beforeMin: 'The date must be on or after {date}.',
    afterMax: 'The date must be on or before {date}.',
    disabled: 'This date is not available.',
  },
  es: {
    invalid: 'Introduce una fecha válida, por ejemplo {example}.',
    beforeMin: 'La fecha debe ser igual o posterior al {date}.',
    afterMax: 'La fecha debe ser igual o anterior al {date}.',
    disabled: 'Esta fecha no está disponible.',
  },
  ca: {
    invalid: 'Introdueix una data vàlida, per exemple {example}.',
    beforeMin: 'La data ha de ser igual o posterior al {date}.',
    afterMax: 'La data ha de ser igual o anterior al {date}.',
    disabled: 'Aquesta data no està disponible.',
  },
  fr: {
    invalid: 'Saisissez une date valide, par exemple {example}.',
    beforeMin: 'La date doit être le {date} ou après.',
    afterMax: 'La date doit être le {date} ou avant.',
    disabled: 'Cette date n’est pas disponible.',
  },
  de: {
    invalid: 'Geben Sie ein gültiges Datum ein, z. B. {example}.',
    beforeMin: 'Das Datum muss am oder nach dem {date} liegen.',
    afterMax: 'Das Datum muss am oder vor dem {date} liegen.',
    disabled: 'Dieses Datum ist nicht verfügbar.',
  },
};

const dayKey = (date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();

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
      weekdayHeaderNotation: { type: String },
      locale: { type: String },
      horizontalAlign: { type: String },
      verticalAlign: { type: String },
      moveTop: { type: Number },
      moveLeft: { type: Number },
      opened: { type: Boolean },
      minYear: { type: Number },
      maxYear: { type: Number },
      minDate: {},
      maxDate: {},
      disableDates: { attribute: false },
      validateDate: { type: Boolean },
      validationMessages: { type: Object },
    };
  }

  constructor() {
    super();
    this.icon = 'lucide.calendar';
    this.firstDayOfWeek = 0;
    this.weekdayHeaderNotation = 'short';
    this.validateDate = false;
    this.validationMessages = {};
    this.horizontalAlign = 'under_right';
    this.verticalAlign = 'center';
    this.moveTop = 0;
    this.moveLeft = 0;
    this.opened = false;
  }

  willUpdate(changedProperties) {
    super.willUpdate?.(changedProperties);
    if (changedProperties.has('minDate')) {
      this._calendarMinDate = toCalendarDate(this.minDate);
    }
    if (changedProperties.has('maxDate')) {
      this._calendarMaxDate = toCalendarDate(this.maxDate);
    }
  }

  renderIconButton() {
    if (this.isDisabled) {
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
        @overlay-ready="${this.overlayReadyHandler}"
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

  get calendar() {
    return this.shadowRoot.querySelector('dile-calendar');
  }

  overlayOpenedHandler() {
    this.opened = true;
    this._focusBeforeOpen = deepActiveElement();
    this.syncCalendarWithValue();
  }

  async overlayReadyHandler() {
    const calendar = this.calendar;
    if (!calendar) {
      return;
    }
    await calendar.updateComplete;
    calendar.focusCentralDate();
  }

  overlayClosedHandler() {
    this.opened = false;
    this.calendar?.closeMonthYearPicker();
    if (this.shadowRoot.activeElement?.closest('.calendar')) {
      const previous = this._focusBeforeOpen;
      const target = previous?.isConnected && previous !== document.body && !this.calendar?.contains(previous) && !this.calendar?.shadowRoot.contains(previous)
        ? previous
        : this.shadowRoot.querySelector('.input-icon-btn');
      target?.focus();
    }
  }

  /**
   * Marks the date of the current value in the calendar and shows its month.
   * Without a valid value, the calendar shows today (or the nearest enabled date).
   */
  syncCalendarWithValue() {
    const calendar = this.calendar;
    if (!calendar) {
      return;
    }
    const date = valueToDate(this.value, this.locale);
    calendar.selectedDate = date;
    calendar.goToDate(date);
  }

  showDate(e) {
    this.value = this.dateToValue(e.detail.selectedDate);
    if (this.validateDate) {
      this.validate();
    }
    const menu = this.shadowRoot.getElementById('menu');
    if (menu) {
      menu.close();
    }
  }

  /**
   * Text written in the input for a date selected in the calendar.
   * @param {Date} date
   * @returns {string}
   */
  dateToValue(date) {
    return formatDate(date, this.locale ? { locale: this.locale } : undefined);
  }

  doBlur(e) {
    super.doBlur?.(e);
    if (!this.validateDate) {
      return;
    }
    if (this.validate()) {
      const { date } = this.getDateValidation();
      const normalized = date ? this.dateToValue(date) : undefined;
      if (normalized && normalized !== this.value) {
        this.value = normalized;
      }
    }
  }

  /**
   * Checks the current value without changing the component state.
   * An empty value is valid (use your form validation to make it required).
   * @param {string} [value]
   * @returns {{valid: boolean, reason?: 'invalid'|'beforeMin'|'afterMax'|'disabled', date?: Date}}
   */
  getDateValidation(value = this.value) {
    if (value === undefined || value === null || String(value).trim() === '') {
      return { valid: true };
    }
    const date = valueToDate(value, this.locale);
    if (!date) {
      return { valid: false, reason: 'invalid' };
    }
    const minDate = toCalendarDate(this.minDate);
    const maxDate = toCalendarDate(this.maxDate);
    if (minDate && dayKey(date) < dayKey(minDate)) {
      return { valid: false, reason: 'beforeMin', date };
    }
    if (maxDate && dayKey(date) > dayKey(maxDate)) {
      return { valid: false, reason: 'afterMax', date };
    }
    if (typeof this.disableDates === 'function' && this.disableDates(date)) {
      return { valid: false, reason: 'disabled', date };
    }
    return { valid: true, date };
  }

  /**
   * Validates the current value, showing or removing the error message.
   * @returns {boolean} true when the value is valid
   */
  validate() {
    const result = this.getDateValidation();
    if (result.valid) {
      if (this._dateErrorShown) {
        this.errored = Boolean(this._stateBeforeDateError.errored);
        this.message = this._stateBeforeDateError.message ?? '';
        this._dateErrorShown = false;
      }
      this.internals?.setValidity({});
      return true;
    }
    if (!this._dateErrorShown) {
      this._stateBeforeDateError = { errored: this.errored, message: this.message };
      this._dateErrorShown = true;
    }
    this.errored = true;
    this.message = this.getValidationMessage(result.reason);
    this.internals?.setValidity({ customError: true }, this.message, this.el);
    return false;
  }

  /**
   * @param {'invalid'|'beforeMin'|'afterMax'|'disabled'} reason
   * @returns {string}
   */
  getValidationMessage(reason) {
    const language = (this.locale || document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    const messages = { ...VALIDATION_MESSAGES.en, ...VALIDATION_MESSAGES[language], ...this.validationMessages };
    const limit = reason === 'beforeMin' ? toCalendarDate(this.minDate) : toCalendarDate(this.maxDate);
    const example = new Date(new Date().getFullYear(), 11, 31);
    return String(messages[reason] || '')
      .replace('{date}', limit ? this.dateToValue(limit) : '')
      .replace('{example}', this.dateToValue(example));
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
        .weekdayHeaderNotation="${this.weekdayHeaderNotation}"
        .locale="${this.locale}"
        .minYear="${this.minYear}"
        .maxYear="${this.maxYear}"
        .minDate="${this._calendarMinDate}"
        .maxDate="${this._calendarMaxDate}"
        .disableDates="${this.disableDates}"
        @user-selected-date-changed=${this.showDate} 
      ></dile-calendar>
    `;
  }
}
