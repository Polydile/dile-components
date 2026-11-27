import { describe, it, expect, afterEach } from 'vitest';
import './datetimepicker.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pad = (n) => String(n).padStart(2, '0');

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

  async function openPicker(el) {
    el.openDatepicker();
    await wait(150);
    await el.updateComplete;
  }

  async function openTimeLayer(el) {
    el.shadowRoot.querySelector('.time-toggle').click();
    await el.updateComplete;
    await wait(0);
  }

  function dayButton(el, year, month, day) {
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    return [...calendar.shadowRoot.querySelectorAll('.calendar__day-button')]
      .find(button => button.date.getFullYear() === year
        && button.date.getMonth() === month
        && button.date.getDate() === day);
  }

  function wheelItems(wheel) {
    return [...wheel.shadowRoot.querySelectorAll('.item')];
  }

  it('renders the text input, trigger icon, calendar and time toggle inside the overlay', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-iconlib')).toBeTruthy();
    expect(el.icon).toBe('lucide.calendar-clock');
    expect(el.shadowRoot.querySelector('dile-calendar')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.time-toggle')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-time-picker')).toBeNull();
    expect(el.shadowRoot.querySelector('.time-layer')).toBeNull();
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
    await openPicker(el);
    const calendar = el.shadowRoot.querySelector('dile-calendar');
    expect(calendar.selectedDate.getFullYear()).toBe(2024);
    expect(calendar.selectedDate.getMonth()).toBe(2);
    expect(calendar.selectedDate.getDate()).toBe(15);
  });

  it('shows the time of its value when opened', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-15 10:30:45"></dile-datetimepicker>');
    await openPicker(el);
    expect(el.selectedTime).toBe('10:30:45');
    expect(el.shadowRoot.querySelector('.time-toggle').textContent.trim()).toBe('10:30');
  });

  it('shows the current time when opened without value', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker></dile-datetimepicker>');
    const before = new Date();
    before.setSeconds(0, 0);
    await openPicker(el);
    const [hours, minutes, seconds] = el.selectedTime.split(':').map(Number);
    const shown = new Date(before);
    shown.setHours(hours, minutes, 0, 0);
    expect(seconds).toBe(0);
    expect(shown.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(shown.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('rounds the current time down to the minuteStep', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker minuteStep="15"></dile-datetimepicker>');
    await openPicker(el);
    const minutes = Number(el.selectedTime.split(':')[1]);
    expect(minutes % 15).toBe(0);
  });

  it('selecting a day does not close the picker nor change the value', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-10 10:30:00"></dile-datetimepicker>');
    await openPicker(el);
    dayButton(el, 2024, 2, 15).click();
    await el.updateComplete;
    expect(el.opened).toBe(true);
    expect(el.value).toBe('2024-03-10 10:30:00');
  });

  it('accepts the selected day with the selected time', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-10 10:30:00"></dile-datetimepicker>');
    await openPicker(el);
    dayButton(el, 2024, 2, 15).click();
    await openTimeLayer(el);
    const hoursWheel = el.shadowRoot.querySelector('.hours-wheel');
    wheelItems(hoursWheel).find(item => item.textContent.trim() === '08').click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.time-toggle').textContent.trim()).toBe('08:30');

    el.shadowRoot.querySelector('.accept-button').click();
    await el.updateComplete;
    expect(el.value).toBe('2024-03-15 08:30:00');
    expect(el.opened).toBe(false);
  });

  it('opens the time layer with labelled hours and minutes wheels over the calendar', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-10 10:30:00"></dile-datetimepicker>');
    await openPicker(el);
    const toggle = el.shadowRoot.querySelector('.time-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Time: 10:30');
    await openTimeLayer(el);

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(el.timePickerOpened).toBe(true);
    const wheels = el.shadowRoot.querySelectorAll('.time-layer dile-wheel-picker');
    expect(wheels.length).toBe(2);
    expect(wheels[0].label).toBeTruthy();
    expect(wheels[1].label).toBeTruthy();
    expect(wheels[0].value).toBe(10);
    expect(wheels[1].value).toBe(30);
    expect(wheelItems(wheels[0]).length).toBe(24);
    expect(wheelItems(wheels[1]).length).toBe(60);
  });

  it('shows a seconds wheel with showSeconds', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker showSeconds value="2024-03-10 10:30:45"></dile-datetimepicker>');
    await openPicker(el);
    expect(el.shadowRoot.querySelector('.time-toggle').textContent.trim()).toBe('10:30:45');
    await openTimeLayer(el);
    const secondsWheel = el.shadowRoot.querySelector('.seconds-wheel');
    expect(secondsWheel).toBeTruthy();
    expect(secondsWheel.value).toBe(45);
  });

  it('builds the minutes wheel with minuteStep, keeping the minute of the value', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker minuteStep="15" value="2024-03-10 10:20:00"></dile-datetimepicker>');
    await openPicker(el);
    await openTimeLayer(el);
    const labels = wheelItems(el.shadowRoot.querySelector('.minutes-wheel')).map(item => item.textContent.trim());
    expect(labels).toEqual(['00', '15', '20', '30', '45']);
  });

  it('closes the time layer with Escape without closing the picker', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker></dile-datetimepicker>');
    await openPicker(el);
    await openTimeLayer(el);
    el.shadowRoot.querySelector('.time-layer')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.timePickerOpened).toBe(false);
    expect(el.opened).toBe(true);
  });

  it('does not let the events of the inner wheels leave the component', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker name="appointment"></dile-datetimepicker>');
    const changes = [];
    const wheelEvents = [];
    document.addEventListener('element-changed', (e) => changes.push(e.detail));
    document.addEventListener('dile-wheel-picker-changed', (e) => wheelEvents.push(e.detail));
    await openPicker(el);
    await openTimeLayer(el);
    wheelItems(el.shadowRoot.querySelector('.hours-wheel'))[3].click();
    await wait(50);
    expect(wheelEvents).toEqual([]);
    expect(changes.every((detail) => detail.name === 'appointment')).toBe(true);
  });

  it('accepts the day focused in the calendar, respecting minDate, when no day is selected', async () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 10);
    const iso = `${minDate.getFullYear()}-${pad(minDate.getMonth() + 1)}-${pad(minDate.getDate())}`;
    const el = await renderDatetimepicker(`<dile-datetimepicker minDate="${iso}"></dile-datetimepicker>`);
    await openPicker(el);
    const time = el.selectedTime;
    el.acceptTime();
    await el.updateComplete;
    expect(el.value).toBe(`${iso} ${time}`);
  });

  it('converts ISO 8601 values with offset to local "YYYY-MM-DD HH:mm:ss"', async () => {
    const el = await renderDatetimepicker('<dile-datetimepicker value="2024-03-15T10:30:00+02:00"></dile-datetimepicker>');
    const date = new Date('2024-03-15T10:30:00+02:00');
    const expected = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
      + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    expect(el.shadowRoot.querySelector('input').value).toBe(expected);
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

    expect(el.value).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:00$/);
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
