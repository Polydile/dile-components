import { describe, it, expect, afterEach } from 'vitest';
import './local-time.js';

describe('dile-local-time', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderLocalTime(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-local-time');
    await el.updateComplete;
    return el;
  }

  it('renders the formatted local time from isoDatetime', async () => {
    const el = await renderLocalTime('<dile-local-time isoDatetime="2024-01-15T10:30:00Z"></dile-local-time>');
    expect(el.shadowRoot.textContent.trim().length).toBeGreaterThan(0);
  });

  it('renders empty when isoDatetime is not set', async () => {
    const el = await renderLocalTime('<dile-local-time></dile-local-time>');
    expect(el.shadowRoot.textContent.trim()).toBe('');
  });
});
