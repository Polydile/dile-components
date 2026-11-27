import { describe, it, expect, afterEach } from 'vitest';
import './input-money.js';

describe('dile-input-money', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputMoney(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-money');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value', async () => {
    const el = await renderInputMoney('<dile-input-money name="price" value="9.5"></dile-input-money>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('9.5');
  });

  it('formats the value to two decimals via set()', async () => {
    const el = await renderInputMoney('<dile-input-money name="price"></dile-input-money>');
    el.set('9.5');
    await el.updateComplete;

    expect(el.value).toBe('9.50');
  });

  it('inherits accessibleLabel from dile-input', async () => {
    const el = await renderInputMoney('<dile-input-money accessiblelabel="Price"></dile-input-money>');
    expect(el.shadowRoot.querySelector('input').getAttribute('aria-label')).toBe('Price');
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

  it('dispatches element-changed once per value change', async () => {
    const el = await renderInputMoney('<dile-input-money name="price"></dile-input-money>');
    expect(await typeAndBlur(el, '12')).toEqual(['12', '12.00']);
  });

  it('does not dispatch element-changed on blur when the value is already formatted', async () => {
    const el = await renderInputMoney('<dile-input-money name="price"></dile-input-money>');
    expect(await typeAndBlur(el, '12.00')).toEqual(['12.00']);
  });

  it('formats numeric and null values with doFormat()', async () => {
    const el = await renderInputMoney('<dile-input-money></dile-input-money>');
    el.value = 3;
    el.doFormat();
    await el.updateComplete;
    expect(el.value).toBe('3.00');
    el.value = null;
    el.doFormat();
    await el.updateComplete;
    expect(el.value).toBe('0.00');
  });
});
