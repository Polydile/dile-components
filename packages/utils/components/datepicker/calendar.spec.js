import { describe, it, expect, afterEach } from 'vitest';
import './calendar.js';

describe('dile-calendar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCalendar(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-calendar');
    await el.updateComplete;
    return el;
  }

  it('renders the month navigation and day grid', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.calendar__navigation')).toBeTruthy();
    expect(el.shadowRoot.querySelectorAll('.calendar__day-button').length).toBeGreaterThan(0);
  });

  it('has accessible navigation buttons with aria-label', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    const prevButtons = el.shadowRoot.querySelectorAll('.calendar__previous-button');
    const nextButtons = el.shadowRoot.querySelectorAll('.calendar__next-button');

    expect(prevButtons.length).toBe(2); // Year and Month prev
    expect(nextButtons.length).toBe(2); // Year and Month next

    prevButtons.forEach(btn => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });
    nextButtons.forEach(btn => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('has accessible grid semantics and screen-reader day labels', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    const gridcells = el.shadowRoot.querySelectorAll('[role="gridcell"]');
    expect(gridcells.length).toBeGreaterThan(0);

    const dayButtons = el.shadowRoot.querySelectorAll('.calendar__day-button[role="button"]');
    expect(dayButtons.length).toBeGreaterThan(0);

    const srLabels = el.shadowRoot.querySelectorAll('.calendar__day-button .u-sr-only');
    expect(srLabels.length).toBe(dayButtons.length);
    expect(srLabels[0].textContent.trim().length).toBeGreaterThan(0);
    expect(getComputedStyle(el.shadowRoot.querySelector('.calendar__day-button__text')).fontWeight).toBe('400');
  });

  it('supports roving tabindex where only one active date has tabindex 0', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    const focusableDays = el.shadowRoot.querySelectorAll('.calendar__day-button[tabindex="0"]');
    expect(focusableDays.length).toBe(1);

    const unfocusableDays = el.shadowRoot.querySelectorAll('.calendar__day-button[tabindex="-1"]');
    expect(unfocusableDays.length).toBeGreaterThan(0);
  });

  async function openMonthYear(el, column = 'year') {
    el.shadowRoot.querySelector(`.calendar__navigation-toggle--${column}`).click();
    await el.updateComplete;
    const monthWheel = el.shadowRoot.querySelector('.month-wheel');
    const yearWheel = el.shadowRoot.querySelector('.year-wheel');
    await monthWheel?.updateComplete;
    await yearWheel?.updateComplete;
    return { monthWheel, yearWheel };
  }

  function chooseWheelValue(wheel, value) {
    const option = [...wheel.shadowRoot.querySelectorAll('[role="option"]')]
      .find(o => o.textContent.trim() === String(value));
    option.click();
  }

  function keydown(target, key) {
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
  }

  it('opens the month and year layer from the header and hides the days', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    const yearToggle = el.shadowRoot.querySelector('.calendar__navigation-toggle--year');
    expect(yearToggle.textContent.trim()).toBe('2026');
    expect(yearToggle.getAttribute('aria-expanded')).toBe('false');
    expect(el.shadowRoot.querySelector('.month-year-layer')).toBeNull();

    const { monthWheel, yearWheel } = await openMonthYear(el);
    expect(el.monthYearPickerOpened).toBe(true);
    expect(yearToggle.getAttribute('aria-expanded')).toBe('true');
    expect(monthWheel.items).toHaveLength(12);
    expect(monthWheel.value).toBe(0);
    expect(yearWheel.value).toBe(2026);
    expect(el.shadowRoot.activeElement).toBe(yearWheel);
    expect(getComputedStyle(el.shadowRoot.getElementById('js-content-wrapper')).visibility).toBe('hidden');

    yearToggle.click();
    await el.updateComplete;
    expect(el.monthYearPickerOpened).toBe(false);
    expect(el.shadowRoot.querySelector('.month-year-layer')).toBeNull();
  });

  it('changes month and year from the wheels and allows selecting a date before 1970', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;
    let selectionEvents = 0;
    let wheelEventsOutside = 0;
    el.addEventListener('user-selected-date-changed', () => selectionEvents++);
    el.addEventListener('dile-wheel-picker-changed', () => wheelEventsOutside++);
    el.addEventListener('element-changed', () => wheelEventsOutside++);

    const { monthWheel, yearWheel } = await openMonthYear(el);
    chooseWheelValue(yearWheel, 1940);
    await el.updateComplete;
    chooseWheelValue(monthWheel, monthWheel.items[4].label);
    await el.updateComplete;

    expect(el.centralDate.getFullYear()).toBe(1940);
    expect(el.centralDate.getMonth()).toBe(4);
    expect(el.centralDate.getDate()).toBe(15);
    expect(el.selectedDate).toBeUndefined();
    expect(selectionEvents).toBe(0);
    expect(wheelEventsOutside).toBe(0);

    keydown(yearWheel, 'Enter');
    await el.updateComplete;
    expect(el.monthYearPickerOpened).toBe(false);
    expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('.calendar__navigation-toggle--year'));

    const dayButton = [...el.shadowRoot.querySelectorAll('.calendar__day-button')]
      .find(button => button.date.getFullYear() === 1940
        && button.date.getMonth() === 4
        && button.date.getDate() === 15);
    dayButton.click();
    await el.updateComplete;
    expect(el.selectedDate.getFullYear()).toBe(1940);
  });

  it('keeps the day valid when the new month is shorter', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2024, 0, 31);
    await el.updateComplete;

    const { monthWheel } = await openMonthYear(el, 'month');
    expect(el.shadowRoot.activeElement).toBe(monthWheel);
    chooseWheelValue(monthWheel, monthWheel.items[1].label);
    await el.updateComplete;

    expect(el.centralDate.getMonth()).toBe(1);
    expect(el.centralDate.getDate()).toBe(29);
  });

  it('closes the layer with the accept button', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    const { yearWheel } = await openMonthYear(el);
    chooseWheelValue(yearWheel, 2000);
    await el.updateComplete;

    const accept = el.shadowRoot.querySelector('.month-year-accept');
    expect(accept.getAttribute('aria-label')).toBe('OK');
    accept.click();
    await el.updateComplete;

    expect(el.monthYearPickerOpened).toBe(false);
    expect(el.centralDate.getFullYear()).toBe(2000);
    expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('.calendar__navigation-toggle--year'));
  });

  it('closes the layer with Escape without propagating the key', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    let escapesOutside = 0;
    window.addEventListener('keydown', function listener(e) {
      if (e.key === 'Escape') escapesOutside++;
    }, { once: true });

    const { monthWheel } = await openMonthYear(el, 'month');
    keydown(monthWheel, 'Escape');
    await el.updateComplete;

    expect(el.monthYearPickerOpened).toBe(false);
    expect(escapesOutside).toBe(0);
    expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('.calendar__navigation-toggle--month'));
  });

  it('limits the years with minYear, maxYear, minDate and maxDate', async () => {
    const el = await renderCalendar('<dile-calendar min-year="1900"></dile-calendar>');
    el.minYear = 1990;
    el.maxYear = 2030;
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    let { yearWheel } = await openMonthYear(el);
    expect(yearWheel.items[0]).toBe(1990);
    expect(yearWheel.items.at(-1)).toBe(2030);

    el.minDate = new Date(2000, 5, 10);
    el.maxDate = new Date(2027, 2, 1);
    await el.updateComplete;
    await yearWheel.updateComplete;
    expect(yearWheel.items[0]).toBe(2000);
    expect(yearWheel.items.at(-1)).toBe(2027);

    chooseWheelValue(yearWheel, 2000);
    await el.updateComplete;
    const monthWheel = el.shadowRoot.querySelector('.month-wheel');
    await monthWheel.updateComplete;
    expect(monthWheel.items[4].disabled).toBe(true);
    expect(monthWheel.items[5].disabled).toBe(false);
    expect(el.centralDate >= el.minDate).toBe(true);
  });

  it('enables the days of years before 1901', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(1850, 11, 15);
    await el.updateComplete;

    const currentMonthDays = [...el.shadowRoot.querySelectorAll('.calendar__day-button')]
      .filter(button => button.date.getFullYear() === 1850 && button.date.getMonth() === 11);
    expect(currentMonthDays).toHaveLength(31);
    expect(currentMonthDays.every(button => button.getAttribute('aria-disabled') === 'false')).toBe(true);

    currentMonthDays[14].click();
    await el.updateComplete;
    expect(el.selectedDate.getFullYear()).toBe(1850);
    expect(el.selectedDate.getDate()).toBe(15);
  });

  it('uses a range of 100 years around the current year by default', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    const { yearWheel } = await openMonthYear(el);
    const currentYear = new Date().getFullYear();
    expect(yearWheel.items[0]).toBe(currentYear - 100);
    expect(yearWheel.items.at(-1)).toBe(currentYear + 100);
  });

  it('navigates days with keyboard arrow keys', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    const initialDate = new Date(2026, 0, 15);
    el.centralDate = initialDate;
    await el.updateComplete;

    const contentWrapper = el.shadowRoot.getElementById('js-content-wrapper');

    // ArrowRight: next day
    contentWrapper.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.centralDate.getDate()).toBe(16);

    // ArrowLeft: previous day
    contentWrapper.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.centralDate.getDate()).toBe(15);

    // ArrowDown: next week (+7 days)
    contentWrapper.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowDown', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.centralDate.getDate()).toBe(22);

    // ArrowUp: previous week (-7 days)
    contentWrapper.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowUp', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.centralDate.getDate()).toBe(15);
  });

  it('selects date when clicking a day button', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    let selectedDate = null;
    el.addEventListener('user-selected-date-changed', (e) => {
      selectedDate = e.detail.selectedDate;
    });

    const activeDayButton = el.shadowRoot.querySelector('.calendar__day-button[tabindex="0"]');
    activeDayButton.click();
    await el.updateComplete;

    expect(selectedDate).toBeTruthy();
    expect(selectedDate instanceof Date).toBe(true);
  });

  it('marks selected and unavailable dates and ignores clicks on unavailable dates', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    const selectedDate = new Date(2024, 0, 15);
    el.centralDate = selectedDate;
    el.selectedDate = selectedDate;
    el.minDate = new Date(2024, 0, 10);
    el.maxDate = new Date(2024, 0, 20);
    el.disableDates = date => date.getDate() === 16;
    await el.updateComplete;

    const findDayButton = day => [...el.shadowRoot.querySelectorAll('.calendar__day-button')]
      .find(button => button.date.getFullYear() === 2024
        && button.date.getMonth() === 0
        && button.date.getDate() === day);
    const selectedButton = findDayButton(15);
    const beforeMinButton = findDayButton(9);
    const afterMaxButton = findDayButton(21);
    const disabledButton = findDayButton(16);
    let selectionEvents = 0;
    el.addEventListener('user-selected-date-changed', () => selectionEvents++);

    expect(selectedButton.hasAttribute('selected')).toBe(true);
    expect(selectedButton.getAttribute('aria-pressed')).toBe('true');
    expect(beforeMinButton.getAttribute('aria-disabled')).toBe('true');
    expect(afterMaxButton.getAttribute('aria-disabled')).toBe('true');
    expect(disabledButton.getAttribute('aria-disabled')).toBe('true');

    beforeMinButton.click();
    disabledButton.click();
    await el.updateComplete;

    expect(el.selectedDate).toEqual(selectedDate);
    expect(selectionEvents).toBe(0);
  });

  it('navigates next and previous months and years', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 5, 15); // June 2026
    await el.updateComplete;

    const yearNavigation = el.shadowRoot.querySelector('.calendar__navigation__year');
    expect(getComputedStyle(yearNavigation).display).toBe('flex');
    const yearToggle = el.shadowRoot.querySelector('.calendar__navigation-toggle--year').getBoundingClientRect();
    const monthToggle = el.shadowRoot.querySelector('.calendar__navigation-toggle--month').getBoundingClientRect();
    expect(Math.abs((yearToggle.top + yearToggle.bottom) / 2
      - (monthToggle.top + monthToggle.bottom) / 2)).toBeLessThan(1);

    yearNavigation.querySelector('.calendar__previous-button').click();
    await el.updateComplete;
    expect(el.centralDate.getFullYear()).toBe(2025);

    yearNavigation.querySelector('.calendar__next-button').click();
    await el.updateComplete;
    expect(el.centralDate.getFullYear()).toBe(2026);

    el.goToNextMonth();
    await el.updateComplete;
    expect(el.centralDate.getMonth()).toBe(6); // July

    el.goToPreviousMonth();
    await el.updateComplete;
    expect(el.centralDate.getMonth()).toBe(5); // June

    el.goToNextYear();
    await el.updateComplete;
    expect(el.centralDate.getFullYear()).toBe(2027);

    el.goToPreviousYear();
    await el.updateComplete;
    expect(el.centralDate.getFullYear()).toBe(2026);
  });
});
