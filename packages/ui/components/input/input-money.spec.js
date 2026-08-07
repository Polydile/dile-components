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
});
