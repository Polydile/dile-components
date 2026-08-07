import { describe, it, expect, afterEach } from 'vitest';
import './input-integer.js';

describe('dile-input-integer', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputInteger(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-integer');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value', async () => {
    const el = await renderInputInteger('<dile-input-integer name="qty" value="5"></dile-input-integer>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('5');
  });

  it('formats the value to an integer on blur', async () => {
    const el = await renderInputInteger('<dile-input-integer name="qty" value="5.9"></dile-input-integer>');
    const input = el.shadowRoot.querySelector('input');
    input.value = '5.9';
    input.dispatchEvent(new Event('blur'));

    expect(el.value).toBe(5);
  });
});
