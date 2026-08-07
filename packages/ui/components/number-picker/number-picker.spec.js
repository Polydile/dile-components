import { describe, it, expect, afterEach } from 'vitest';
import './number-picker.js';

describe('dile-number-picker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderNumberPicker(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-number-picker');
    await el.updateComplete;
    return el;
  }

  it('renders an inner dile-number-picker-element with the given value', async () => {
    const el = await renderNumberPicker('<dile-number-picker name="qty" value="5"></dile-number-picker>');

    const inner = el.shadowRoot.querySelector('dile-number-picker-element');
    expect(inner).toBeTruthy();
    expect(el.value).toBe('5');
  });

  it('renders the label when set', async () => {
    const el = await renderNumberPicker('<dile-number-picker label="Quantity"></dile-number-picker>');
    const label = el.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('Quantity');
  });
});
