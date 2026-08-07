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
});
