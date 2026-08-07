import { describe, it, expect, afterEach } from 'vitest';
import './range.js';

describe('dile-range', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRange(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-range');
    await el.updateComplete;
    return el;
  }

  it('renders a native range input with min/max/value', async () => {
    const el = await renderRange('<dile-range name="vol" min="0" max="20" value="5"></dile-range>');
    const input = el.shadowRoot.querySelector('input[type="range"]');

    expect(input).toBeTruthy();
    expect(input.min).toBe('0');
    expect(input.max).toBe('20');
    expect(input.value).toBe('5');
  });

  it('updates the value property when the input changes', async () => {
    const el = await renderRange('<dile-range name="vol"></dile-range>');
    const input = el.shadowRoot.querySelector('input[type="range"]');

    input.value = '7';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('7');
  });
});
