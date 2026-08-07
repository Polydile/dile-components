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
});
