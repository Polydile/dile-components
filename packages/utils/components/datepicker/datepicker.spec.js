import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import { formatDate } from '@lion/ui/localize.js';
import './datepicker.js';

describe('dile-datepicker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderDatepicker(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-datepicker');
    await el.updateComplete;
    return el;
  }

  it('renders the text input and a calendar trigger icon', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate" label="Birthdate"></dile-datepicker>');
    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-menu-overlay')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-iconlib')).toBeTruthy();
  });

  it('updates value when a date is selected from the calendar and closes overlay', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    const menu = el.shadowRoot.getElementById('menu');
    const selectedDate = new Date(2024, 0, 15);

    calendar.dispatchEvent(new CustomEvent('user-selected-date-changed', {
      detail: { selectedDate },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(el.value).toBe(formatDate(selectedDate));
    expect(menu._overlayClass).toBe('');
  });

  it('jumps to and selects a date before 1970 through the datepicker', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    calendar.centralDate = new Date(2026, 0, 15);
    await calendar.updateComplete;

    calendar.shadowRoot.querySelector('.calendar__navigation-toggle--year').click();
    await calendar.updateComplete;
    const yearWheel = calendar.shadowRoot.querySelector('.year-wheel');
    await yearWheel.updateComplete;
    [...yearWheel.shadowRoot.querySelectorAll('[role="option"]')]
      .find(o => o.textContent.trim() === '1940')
      .click();
    calendar.closeMonthYearPicker();
    await calendar.updateComplete;

    expect(el.value).toBe('');
    expect(calendar.centralDate.getFullYear()).toBe(1940);

    const dayButton = [...calendar.shadowRoot.querySelectorAll('.calendar__day-button')]
      .find(button => button.date.getFullYear() === 1940
        && button.date.getMonth() === 0
        && button.date.getDate() === 15);
    dayButton.click();
    await el.updateComplete;

    expect(el.value).toBe(formatDate(new Date(1940, 0, 15)));
    expect(el.opened).toBe(false);
  });

  it('passes firstDayOfWeek to the dile-calendar child', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate" firstDayOfWeek="1"></dile-datepicker>');
    await el.updateComplete;
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.firstDayOfWeek).toBe(1);
  });

  function dayButtons(calendar, year, month) {
    return [...calendar.shadowRoot.querySelectorAll('.calendar__day-button')]
      .filter(button => button.date.getFullYear() === year && button.date.getMonth() === month);
  }

  it('limits the selectable dates with minDate and maxDate attributes', async () => {
    const el = await renderDatepicker('<dile-datepicker minDate="2024-03-10" maxDate="2024-03-20"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.updateComplete;

    expect(calendar.minDate.getFullYear()).toBe(2024);
    expect(calendar.minDate.getMonth()).toBe(2);
    expect(calendar.minDate.getDate()).toBe(10);
    expect(calendar.maxDate.getDate()).toBe(20);
    expect(calendar.centralDate.getFullYear()).toBe(2024);
    expect(calendar.centralDate.getMonth()).toBe(2);

    const days = dayButtons(calendar, 2024, 2);
    const enabled = days.filter(button => button.getAttribute('aria-disabled') === 'false')
      .map(button => button.date.getDate());
    expect(enabled).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  });

  it('accepts Date objects and disableDates, and updates the calendar when they change', async () => {
    const el = await renderDatepicker('<dile-datepicker></dile-datepicker>');
    el.minDate = new Date(2030, 0, 1);
    el.disableDates = date => date.getDay() === 0 || date.getDay() === 6;
    await el.updateComplete;
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.updateComplete;

    expect(calendar.centralDate >= new Date(2030, 0, 1)).toBe(true);
    const weekend = dayButtons(calendar, 2030, 0).find(button => button.date.getDay() === 6);
    const weekday = dayButtons(calendar, 2030, 0).find(button => button.date.getDay() === 3);
    expect(weekend.getAttribute('aria-disabled')).toBe('true');
    expect(weekday.getAttribute('aria-disabled')).toBe('false');

    el.minDate = undefined;
    el.disableDates = undefined;
    await el.updateComplete;
    await calendar.updateComplete;
    expect(calendar.minDate.getFullYear()).toBe(100);
    expect(typeof calendar.disableDates).toBe('function');
    const central = calendar.centralDate;
    const saturday = dayButtons(calendar, central.getFullYear(), central.getMonth())
      .find(button => button.date.getDay() === 6);
    expect(saturday.getAttribute('aria-disabled')).toBe('false');
  });

  it('ignores invalid minDate values', async () => {
    const el = await renderDatepicker('<dile-datepicker minDate="not a date"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.updateComplete;
    expect(calendar.minDate.getFullYear()).toBe(100);
  });

  it('passes minYear and maxYear to the dile-calendar child', async () => {
    const el = await renderDatepicker('<dile-datepicker minYear="1900" maxYear="2010"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.minYear).toBe(1900);
    expect(calendar.maxYear).toBe(2010);
  });

  it('closes the month and year layer with Escape but keeps the calendar open', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate"></dile-datepicker>');
    el.openDatepicker();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.openMonthYearPicker('year');

    await userEvent.keyboard('{Escape}');
    await calendar.updateComplete;

    expect(calendar.monthYearPickerOpened).toBe(false);
    expect(el.opened).toBe(true);
  });

  it('shows the days again when the calendar is reopened', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate"></dile-datepicker>');
    el.openDatepicker();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.openMonthYearPicker('year');

    el.close();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(calendar.monthYearPickerOpened).toBe(false);
  });

  function deepActiveElement() {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  async function openAndWait(el) {
    el.openDatepicker();
    await new Promise((resolve) => setTimeout(resolve, 150));
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.updateComplete;
    return calendar;
  }

  it('marks the current value in the calendar and focuses it when opened', async () => {
    const el = await renderDatepicker('<dile-datepicker></dile-datepicker>');
    el.value = formatDate(new Date(1940, 4, 15));
    await el.updateComplete;

    const calendar = await openAndWait(el);
    expect(calendar.selectedDate.getFullYear()).toBe(1940);
    expect(calendar.selectedDate.getMonth()).toBe(4);
    expect(calendar.selectedDate.getDate()).toBe(15);
    expect(calendar.centralDate.getFullYear()).toBe(1940);
    expect(calendar.centralDate.getMonth()).toBe(4);

    const focused = deepActiveElement();
    expect(focused.classList.contains('calendar__day-button')).toBe(true);
    expect(focused.date.getDate()).toBe(15);
    expect(focused.hasAttribute('selected')).toBe(true);
  });

  it('reads ISO values and shows today when the value is empty or invalid', async () => {
    const el = await renderDatepicker('<dile-datepicker value="2024-02-29"></dile-datepicker>');
    let calendar = await openAndWait(el);
    expect(calendar.selectedDate.getMonth()).toBe(1);
    expect(calendar.selectedDate.getDate()).toBe(29);
    el.close();
    await new Promise((resolve) => setTimeout(resolve, 100));

    el.value = 'not a date';
    await el.updateComplete;
    calendar = await openAndWait(el);
    const today = new Date();
    expect(calendar.selectedDate).toBeUndefined();
    expect(calendar.centralDate.getFullYear()).toBe(today.getFullYear());
    expect(calendar.centralDate.getMonth()).toBe(today.getMonth());
  });

  it('returns the focus to the trigger after selecting a day with the keyboard', async () => {
    const el = await renderDatepicker('<dile-datepicker></dile-datepicker>');
    el.shadowRoot.querySelector('.input-icon-btn').focus();
    await openAndWait(el);
    expect(deepActiveElement().classList.contains('calendar__day-button')).toBe(true);

    await userEvent.keyboard('{Enter}');
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(el.value).not.toBe('');
    expect(el.opened).toBe(false);
    expect(deepActiveElement()).toBe(el.shadowRoot.querySelector('.input-icon-btn'));
  });

  it('passes weekdayHeaderNotation to the calendar', async () => {
    const el = await renderDatepicker('<dile-datepicker weekdayHeaderNotation="narrow"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    await calendar.updateComplete;
    expect(calendar.weekdayHeaderNotation).toBe('narrow');
    const headers = [...calendar.shadowRoot.querySelectorAll('.calendar__weekday-header')];
    expect(headers).toHaveLength(7);
    headers.forEach(header => expect(header.textContent.trim()).toHaveLength(1));
    expect(headers[0].getAttribute('aria-label').length).toBeGreaterThan(1);
  });

  it('uses its own locale for the calendar and the value', async () => {
    const el = await renderDatepicker('<dile-datepicker locale="es-ES"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    calendar.centralDate = new Date(2024, 10, 15);
    await calendar.updateComplete;
    expect(calendar.locale).toBe('es-ES');
    expect(calendar.shadowRoot.querySelector('.calendar__navigation-toggle--month').textContent.trim()).toBe('noviembre');

    calendar.dispatchEvent(new CustomEvent('user-selected-date-changed', {
      detail: { selectedDate: new Date(2024, 10, 5) },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;
    expect(el.value).toBe('05/11/2024');

    const opened = await openAndWait(el);
    expect(opened.selectedDate.getMonth()).toBe(10);
    expect(opened.selectedDate.getDate()).toBe(5);
  });

  describe('validateDate', () => {
    async function typeAndBlur(el, text) {
      const input = el.shadowRoot.querySelector('input');
      input.focus();
      input.value = text;
      input.dispatchEvent(new Event('input'));
      input.dispatchEvent(new FocusEvent('blur'));
      await el.updateComplete;
    }

    function messageText(el) {
      return el.shadowRoot.querySelector('.message')?.textContent.trim() ?? '';
    }

    it('does not validate unless enabled', async () => {
      const el = await renderDatepicker('<dile-datepicker></dile-datepicker>');
      await typeAndBlur(el, 'not a date');
      expect(el.errored).toBeFalsy();
      expect(el.value).toBe('not a date');
    });

    it('shows an error for text that is not a date and marks the field invalid', async () => {
      const el = await renderDatepicker('<dile-datepicker validateDate locale="es-ES"></dile-datepicker>');
      await typeAndBlur(el, '31/02/2024');
      expect(el.errored).toBe(true);
      expect(messageText(el)).toBe(`Introduce una fecha válida, por ejemplo 31/12/${new Date().getFullYear()}.`);
      expect(el.internals.validity.valid).toBe(false);
    });

    it('checks minDate, maxDate and disableDates', async () => {
      const el = await renderDatepicker('<dile-datepicker validateDate locale="es-ES" minDate="2024-01-10" maxDate="2024-12-20"></dile-datepicker>');
      await typeAndBlur(el, '09/01/2024');
      expect(messageText(el)).toBe('La fecha debe ser igual o posterior al 10/01/2024.');
      await typeAndBlur(el, '21/12/2024');
      expect(messageText(el)).toBe('La fecha debe ser igual o anterior al 20/12/2024.');

      el.disableDates = date => date.getDay() === 0;
      await typeAndBlur(el, '14/01/2024');
      expect(messageText(el)).toBe('Esta fecha no está disponible.');
      expect(el.getDateValidation().reason).toBe('disabled');
    });

    it('normalizes a valid date and restores the previous message', async () => {
      const el = await renderDatepicker('<dile-datepicker validateDate locale="es-ES" message="Your birthdate"></dile-datepicker>');
      await typeAndBlur(el, 'nope');
      expect(el.errored).toBe(true);

      await typeAndBlur(el, '5/3/2024');
      expect(el.value).toBe('05/03/2024');
      expect(el.errored).toBe(false);
      expect(messageText(el)).toBe('Your birthdate');
      expect(el.internals.validity.valid).toBe(true);
    });

    it('accepts an empty value and custom messages', async () => {
      const el = await renderDatepicker('<dile-datepicker validateDate></dile-datepicker>');
      el.validationMessages = { invalid: 'Wrong date' };
      await typeAndBlur(el, '');
      expect(el.errored).toBeFalsy();
      await typeAndBlur(el, 'abc');
      expect(messageText(el)).toBe('Wrong date');
      expect(el.validate()).toBe(false);
    });

    it('clears the error when a date is selected in the calendar', async () => {
      const el = await renderDatepicker('<dile-datepicker validateDate></dile-datepicker>');
      await typeAndBlur(el, 'abc');
      expect(el.errored).toBe(true);

      el.shadowRoot.querySelector('dile-calendar').dispatchEvent(new CustomEvent('user-selected-date-changed', {
        detail: { selectedDate: new Date(2024, 0, 15) },
        bubbles: true,
        composed: true,
      }));
      await el.updateComplete;
      expect(el.errored).toBe(false);
      expect(el.value).toBe(formatDate(new Date(2024, 0, 15)));
    });
  });

  it('closes the calendar with Escape', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate" label="Birthdate"></dile-datepicker>');
    el.openDatepicker();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(el.opened).toBe(true);

    await userEvent.keyboard('{Escape}');

    expect(el.opened).toBe(false);
    expect(el.shadowRoot.querySelector('dile-menu-overlay')._overlayClass).toBe('');
  });
});
