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
  });

  it('supports roving tabindex where only one active date has tabindex 0', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    await el.updateComplete;

    const focusableDays = el.shadowRoot.querySelectorAll('.calendar__day-button[tabindex="0"]');
    expect(focusableDays.length).toBe(1);

    const unfocusableDays = el.shadowRoot.querySelectorAll('.calendar__day-button[tabindex="-1"]');
    expect(unfocusableDays.length).toBeGreaterThan(0);
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

  it('navigates next and previous months and years', async () => {
    const el = await renderCalendar('<dile-calendar></dile-calendar>');
    el.centralDate = new Date(2026, 5, 15); // June 2026
    await el.updateComplete;

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
