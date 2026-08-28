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

  it('updates value when a date is selected from the calendar', async () => {
    const el = await renderDatepicker('<dile-datepicker name="birthdate"></dile-datepicker>');
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    calendar.dispatchEvent(new CustomEvent('user-selected-date-changed', {
      detail: { selectedDate: new Date(2024, 0, 15) },
    }));
    await el.updateComplete;

    expect(el.value).toBeTruthy();
  });
});
