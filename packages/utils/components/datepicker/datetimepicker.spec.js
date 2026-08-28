import { describe, it, expect, afterEach } from 'vitest';
import './datetimepicker.js';

describe('dile-datetimepicker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderDatetimepicker(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-datetimepicker');
    await el.updateComplete;
    return el;
  }

  it('renders the text input, trigger icon, calendar and time picker inside the overlay', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-iconlib')).toBeTruthy();
    expect(el.icon).toBe('lucide.calendar-clock');
    expect(el.shadowRoot.querySelector('dile-calendar')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-time-picker')).toBeTruthy();
  });

  it('updates value combining date and time when accepted', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    el.acceptTime();
    await el.updateComplete;

    expect(el.value).toMatch(/^\d{4}-\d{2}-\d{2} /);
  });
});
