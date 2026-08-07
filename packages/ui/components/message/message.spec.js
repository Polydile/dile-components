import { describe, it, expect, afterEach } from 'vitest';
import './message.js';

describe('dile-message', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderMessage(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-message');
    await el.updateComplete;
    return el;
  }

  it('renders closed by default with a close icon', async () => {
    const el = await renderMessage('<dile-message></dile-message>');
    expect(el.opened).toBe(false);
    expect(el.shadowRoot.querySelector('dile-icon.icon')).toBeTruthy();
  });

  it('opens and shows the message text via openMessage()', async () => {
    const el = await renderMessage('<dile-message></dile-message>');
    el.openMessage('Saved successfully');
    await el.updateComplete;

    expect(el.opened).toBe(true);
    expect(el.shadowRoot.querySelector('.content').textContent.trim()).toBe('Saved successfully');
  });

  it('dispatches dile-message-closed-by-user when the close icon is clicked', async () => {
    const el = await renderMessage('<dile-message opened></dile-message>');
    let closed = false;
    el.addEventListener('dile-message-closed-by-user', () => { closed = true; });

    el.shadowRoot.querySelector('dile-icon.icon').click();
    await el.updateComplete;

    expect(closed).toBe(true);
    expect(el.opened).toBe(false);
  });
});
