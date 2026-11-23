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

    calendar.shadowRoot.querySelector('.year-picker-trigger').click();
    await calendar.updateComplete;
    const yearInput = calendar.shadowRoot.querySelector('.year-picker-input');
    yearInput.value = '1940';
    yearInput.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    }));
    await calendar.updateComplete;
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
