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

    expect(el.value).toBe('10.5');
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
    const el = await renderInputPercentage('<dile-input-percentage name="rate"></dile-input-percentage>');
    expect(await typeAndBlur(el, '12')).toEqual(['12']);
  });

  it('can call doFormat() several times', async () => {
    const el = await renderInputPercentage('<dile-input-percentage value="12.50"></dile-input-percentage>');
    el.doFormat();
    await el.updateComplete;
    el.doFormat();
    await el.updateComplete;
    expect(el.value).toBe('12.5');
  });

  it('shows an empty field for null values and uses the decimal separator', async () => {
    const el = await renderInputPercentage('<dile-input-percentage decimalSeparator="," value="1.5"></dile-input-percentage>');
    const input = el.shadowRoot.querySelector('input');
    expect(input.value).toBe('1,5');
    el.value = null;
    await el.updateComplete;
    expect(input.value).toBe('');
  });
});
