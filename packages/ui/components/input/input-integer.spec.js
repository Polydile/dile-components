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

    expect(el.value).toBe('5');
  });

  async function typeAndBlur(el, text) {
    const events = [];
    el.addEventListener('element-changed', (e) => events.push(e.detail.value));
    const input = el.shadowRoot.querySelector('input');
    input.value = text;
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;
    return events;
  }

  it('dispatches element-changed once per value change, with string values', async () => {
    const el = await renderInputInteger('<dile-input-integer name="qty"></dile-input-integer>');
    expect(await typeAndBlur(el, '12')).toEqual(['12']);
  });

  it('dispatches element-changed again only when blur changes the value', async () => {
    const el = await renderInputInteger('<dile-input-integer name="qty"></dile-input-integer>');
    expect(await typeAndBlur(el, '12.7')).toEqual(['12.7', '12']);
    expect(el.shadowRoot.querySelector('input').value).toBe('12');
  });
});
