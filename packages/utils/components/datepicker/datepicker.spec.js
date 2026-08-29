import { describe, it, expect, afterEach } from 'vitest';
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

    calendar.dispatchEvent(new CustomEvent('user-selected-date-changed', {
      detail: { selectedDate: new Date(2024, 0, 15) },
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(el.value).toBeTruthy();
    expect(menu._overlayClass).toBe('');
  });

  it('passes firstDayOfWeek to the dile-calendar child', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate" firstDayOfWeek="1"></dile-datepicker>');
    await el.updateComplete;
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.firstDayOfWeek).toBe(1);
  });
});
