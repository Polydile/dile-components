import { describe, it, expect, afterEach } from 'vitest';
import './input-number-mask.js';

describe('dile-input-number-mask', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputNumberMask(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-number-mask');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input', async () => {
    const el = await renderInputNumberMask('<dile-input-number-mask name="code" mask="00-00"></dile-input-number-mask>');
    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
  });

  it('masks digit keydowns following the given pattern', async () => {
    const el = await renderInputNumberMask('<dile-input-number-mask name="code" mask="00-00"></dile-input-number-mask>');
    const input = el.shadowRoot.querySelector('input');

    ['1', '2', '3'].forEach((key) => {
      input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    });
    await el.updateComplete;

    expect(el.maskedValue).toBe('12-3');
  });
});
