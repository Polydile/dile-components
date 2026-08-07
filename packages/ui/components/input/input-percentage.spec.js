import { describe, it, expect, afterEach } from 'vitest';
import './input-percentage.js';

describe('dile-input-percentage', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputPercentage(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-percentage');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value and a % label', async () => {
    const el = await renderInputPercentage('<dile-input-percentage name="rate" value="10"></dile-input-percentage>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('10');
    expect(el.shadowRoot.querySelector('.labelright').textContent.trim()).toBe('%');
  });

  it('formats the value as a float via doFormat()', async () => {
    const el = await renderInputPercentage('<dile-input-percentage name="rate" value="10.5"></dile-input-percentage>');
    el.doFormat();
    await el.updateComplete;

    expect(el.value).toBe(10.5);
  });
});
