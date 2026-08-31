import { describe, it, expect, afterEach } from 'vitest';
import './input-number.js';

describe('dile-input-number', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputNumber(content) {
    document.body.innerHTML = content;
    const el = document.body.querySelector('dile-input-number');
    await el.updateComplete;
    return el;
  }

  it('normalizes comma separator to dot by default', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount"></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    input.value = '12,75';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('12.75');
    expect(input.value).toBe('12.75');
  });

  it('normalizes dot separator to comma when configured', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount" decimalSeparator=","></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    input.value = '12.75';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('12,75');
    expect(input.value).toBe('12,75');
  });

  it('applies min, max and decimals on blur', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount" min="1" max="10" decimals="2"></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    input.value = '10.987';
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(el.value).toBe('10.00');
    expect(input.value).toBe('10.00');
  });

  it('applies step rounding and decimal separator formatting on blur', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount" decimalSeparator="," step="0.25" decimals="2"></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    input.value = '1.37';
    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(el.value).toBe('1,25');
    expect(input.value).toBe('1,25');
  });

  it('normalizes separator only on blur when normalizeOn is blur', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount" decimalSeparator="," normalizeOn="blur"></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    input.value = '12.75';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('12.75');
    expect(input.value).toBe('12.75');

    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;

    expect(el.value).toBe('12,75');
    expect(input.value).toBe('12,75');
  });

  it('falls back to input normalization when normalizeOn is invalid', async () => {
    const el = await renderInputNumber('<dile-input-number name="amount" decimalSeparator="," normalizeOn="foo"></dile-input-number>');
    const input = el.shadowRoot.querySelector('input');

    await el.updateComplete;
    expect(el.normalizeOn).toBe('input');

    input.value = '12.75';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('12,75');
    expect(input.value).toBe('12,75');
  });
});