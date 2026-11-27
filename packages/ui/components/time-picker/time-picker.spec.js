import { describe, it, expect, afterEach } from 'vitest';
import './time-picker.js';

describe('dile-time-picker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTimePicker(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-time-picker');
    await el.updateComplete;
    return el;
  }

  it('defaults to 00:00:00 and renders three number pickers', async () => {
    const el = await renderTimePicker('<dile-time-picker name="start"></dile-time-picker>');
    expect(el.value).toBe('00:00:00');
    expect(el.shadowRoot.querySelectorAll('dile-number-picker-element').length).toBe(3);
  });

  it('renders the label when provided', async () => {
    const el = await renderTimePicker('<dile-time-picker label="Start time"></dile-time-picker>');
    expect(el.shadowRoot.querySelector('label').textContent.trim()).toBe('Start time');
  });

  it('marks every inner input as invalid and describes it with the message', async () => {
    const el = await renderTimePicker('<dile-time-picker errored message="Invalid time"></dile-time-picker>');
    const pickers = [...el.shadowRoot.querySelectorAll('dile-number-picker-element')];
    await Promise.all(pickers.map((picker) => picker.updateComplete));

    pickers.forEach((picker) => {
      const input = picker.shadowRoot.querySelector('input');
      expect(input.getAttribute('aria-invalid')).toBe('true');
      expect(input.getAttribute('aria-description')).toBe('Invalid time');
    });
  });
});
