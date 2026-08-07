import { describe, it, expect, afterEach } from 'vitest';
import './input-message.js';

describe('dile-input-message', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputMessage(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-message');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when there is no message', async () => {
    const el = await renderInputMessage('<dile-input-message></dile-input-message>');
    expect(el.shadowRoot.querySelector('.message')).toBeNull();
  });

  it('renders the message text when set', async () => {
    const el = await renderInputMessage('<dile-input-message message="Required"></dile-input-message>');
    const message = el.shadowRoot.querySelector('.message span');
    expect(message).toBeTruthy();
    expect(message.textContent.trim()).toBe('Required');
  });
});
