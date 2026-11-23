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

  it('jumps to a typed year and allows selecting a date before 1970', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    el.shadowRoot.querySelector('.year-picker-trigger').click();
    await el.updateComplete;
    const yearInput = el.shadowRoot.querySelector('.year-picker-input');
    expect(yearInput).toBeTruthy();
    expect(yearInput.getAttribute('aria-label')).toBeTruthy();

    yearInput.value = '1940';
    let selectionEvents = 0;
    el.addEventListener('user-selected-date-changed', () => selectionEvents++);
    yearInput.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    }));
    await el.updateComplete;
    await el.updateComplete;

    expect(el.centralDate.getFullYear()).toBe(1940);
    expect(el.centralDate.getMonth()).toBe(0);
    const yearTrigger = el.shadowRoot.querySelector('.year-picker-trigger');
    expect(yearTrigger.textContent.trim()).toBe('1940');
    expect(el.shadowRoot.activeElement).toBe(yearTrigger);
    expect(el.selectedDate).toBeUndefined();

    yearTrigger.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'Enter',
      bubbles: true,
      composed: true,
    }));
    await el.updateComplete;

    expect(selectionEvents).toBe(0);

    const dayButton = [...el.shadowRoot.querySelectorAll('.calendar__day-button')]
      .find(button => button.date.getFullYear() === 1940
        && button.date.getMonth() === 0
        && button.date.getDate() === 15);
    expect(dayButton.getAttribute('aria-disabled')).toBe('false');

    dayButton.click();
    await el.updateComplete;
    expect(el.selectedDate.getFullYear()).toBe(1940);
  });

  it('cancels the year editor with Escape without changing the displayed year', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    el.shadowRoot.querySelector('.year-picker-trigger').click();
    await el.updateComplete;
    const yearInput = el.shadowRoot.querySelector('.year-picker-input');
    yearInput.value = '1940';
    yearInput.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    }));
    await el.updateComplete;

    expect(el.centralDate.getFullYear()).toBe(2026);
    expect(el.shadowRoot.querySelector('.year-picker-input')).toBeNull();
    expect(el.shadowRoot.querySelector('.year-picker-trigger').textContent.trim()).toBe('2026');
  });

  it('applies a valid year when the editor loses focus', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    el.shadowRoot.querySelector('.year-picker-trigger').click();
    await el.updateComplete;
    const yearInput = el.shadowRoot.querySelector('.year-picker-input');
    yearInput.value = '1940';
    yearInput.blur();
    await el.updateComplete;

    expect(el.centralDate.getFullYear()).toBe(1940);
    expect(el.centralDate.getMonth()).toBe(0);
    expect(el.shadowRoot.querySelector('.year-picker-input')).toBeNull();
  });

  it('keeps the year editor open when it loses focus with an invalid value', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 0, 15);
    await el.updateComplete;

    el.shadowRoot.querySelector('.year-picker-trigger').click();
    await el.updateComplete;
    const yearInput = el.shadowRoot.querySelector('.year-picker-input');
    yearInput.value = '';
    yearInput.blur();
    await el.updateComplete;

    expect(el.centralDate.getFullYear()).toBe(2026);
    expect(el.shadowRoot.querySelector('.year-picker-input')).toBe(yearInput);
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
    const yearTrigger = el.shadowRoot.querySelector('.year-picker-trigger').getBoundingClientRect();
    const monthHeading = el.shadowRoot.querySelector('.calendar__navigation__month h2').getBoundingClientRect();
    expect(Math.abs((yearTrigger.top + yearTrigger.bottom) / 2
      - (monthHeading.top + monthHeading.bottom) / 2)).toBeLessThan(1);

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
