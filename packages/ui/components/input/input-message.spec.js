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

  it('applies the errored class to the message when errored', async () => {
    const el = await renderInputMessage('<dile-input-message message="Required" errored></dile-input-message>');
    expect(el.shadowRoot.querySelector('.message').classList.contains('errored-msg')).toBe(true);
  });

  it('clearError() removes the message and the errored state', async () => {
    const el = await renderInputMessage('<dile-input-message message="Required" errored></dile-input-message>');
    el.clearError();
    await el.updateComplete;
    expect(el.errored).toBe(false);
    expect(el.message).toBe('');
    expect(el.shadowRoot.querySelector('.message')).toBeNull();
  });

  it('does not dispatch element-changed', async () => {
    let fired = false;
    document.addEventListener('element-changed', () => { fired = true; }, { once: true });
    const el = await renderInputMessage('<dile-input-message name="info"></dile-input-message>');
    el.message = 'Updated';
    el.errored = true;
    await el.updateComplete;
    expect(fired).toBe(false);
  });

  it('does not render an input element', async () => {
    const el = await renderInputMessage('<dile-input-message message="Hi"></dile-input-message>');
    expect(el.shadowRoot.querySelector('input')).toBeNull();
  });
});
