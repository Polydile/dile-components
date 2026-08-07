import { describe, it, expect, afterEach } from 'vitest';
import './timer.js';

describe('dile-timer', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTimer(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-timer');
    await el.updateComplete;
    return el;
  }

  it('defaults to a 60s duration shown as 01:00', async () => {
    const el = await renderTimer('<dile-timer></dile-timer>');
    expect(el.duration).toBe(60_000);
    expect(el.shadowRoot.querySelector('.display').textContent.trim()).toBe('01:00');
  });

  it('renders control buttons when controls is set', async () => {
    const el = await renderTimer('<dile-timer controls></dile-timer>');
    expect(el.shadowRoot.querySelectorAll('.controls dile-button').length).toBe(3);
  });

  it('renders the title when provided', async () => {
    const el = await renderTimer('<dile-timer title="Countdown"></dile-timer>');
    expect(el.shadowRoot.querySelector('.title').textContent.trim()).toBe('Countdown');
  });
});
