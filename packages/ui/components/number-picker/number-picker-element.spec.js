import { describe, it, expect, afterEach } from 'vitest';
import './number-picker-element.js';

describe('dile-number-picker-element', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderNumberPickerElement(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-number-picker-element');
    await el.updateComplete;
    return el;
  }

  it('renders an input and increment/decrement icons', async () => {
    const el = await renderNumberPickerElement('<dile-number-picker-element value="3"></dile-number-picker-element>');

    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
    expect(el.shadowRoot.querySelectorAll('dile-icon').length).toBe(2);
  });

  it('increments the value when calling increment()', async () => {
    const el = await renderNumberPickerElement('<dile-number-picker-element value="3" step="1"></dile-number-picker-element>');
    el.increment();
    await el.updateComplete;

    expect(el.value).toBe('4');
  });
});
