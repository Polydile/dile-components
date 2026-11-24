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

  it('passes minDate, maxDate and disableDates to the dile-calendar child', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker minDate="2024-03-10" maxDate="2024-03-20"></dile-datetimepicker>');
    const disableDates = () => false;
    el.disableDates = disableDates;
    await el.updateComplete;
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.minDate.getDate()).toBe(10);
    expect(calendar.maxDate.getDate()).toBe(20);
    expect(calendar.disableDates).toBe(disableDates);
  });

  it('marks the date of its value in the calendar when opened', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-15 10:30:00"></dile-datetimepicker>');
    el.openDatepicker();
    await new Promise((resolve) => setTimeout(resolve, 150));
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.selectedDate.getFullYear()).toBe(2024);
    expect(calendar.selectedDate.getMonth()).toBe(2);
    expect(calendar.selectedDate.getDate()).toBe(15);
  });

  it('validates the date of its value without rewriting it', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker validateDate maxDate="2024-03-10"></dile-datetimepicker>');
    const input = el.shadowRoot.querySelector('input');
    input.value = '2024-03-15 10:30:00';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new FocusEvent('blur'));
    await el.updateComplete;
    expect(el.errored).toBe(true);
    expect(el.getDateValidation().reason).toBe('afterMax');
    expect(el.value).toBe('2024-03-15 10:30:00');
  });

  it('renders an accessible accept button with aria-label and type="button"', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment" acceptLabel="Confirm selection"></dile-datetimepicker>');
    const acceptBtn = el.shadowRoot.querySelector('.accept-button');

    expect(acceptBtn).toBeTruthy();
    expect(acceptBtn.tagName.toLowerCase()).toBe('button');
    expect(acceptBtn.getAttribute('type')).toBe('button');
    expect(acceptBtn.getAttribute('aria-label')).toBe('Confirm selection');
    expect(acceptBtn.querySelector('dile-icon')).toBeTruthy();
  });

  it('updates value combining date and time when accepted via method', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    el.acceptTime();
    await el.updateComplete;

    expect(el.value).toMatch(/^\d{4}-\d{2}-\d{2} /);
  });

  it('updates value and closes overlay when accept button is clicked', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    const acceptBtn = el.shadowRoot.querySelector('.accept-button');
    const menu = el.shadowRoot.getElementById('menu');

    acceptBtn.click();
    await el.updateComplete;

    expect(el.value).toMatch(/^\d{4}-\d{2}-\d{2} /);
    expect(menu._overlayClass).toBe('');
  });
});
