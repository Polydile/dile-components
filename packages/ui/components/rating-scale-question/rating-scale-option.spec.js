import { describe, it, expect, afterEach } from 'vitest';
import './rating-scale-option.js';

describe('dile-rating-scale-option', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderOption(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-rating-scale-option');
    await el.updateComplete;
    return el;
  }

  it('renders the label and starts unselected', async () => {
    const el = await renderOption('<dile-rating-scale-option value="3" label="Agree"></dile-rating-scale-option>');

    expect(el.selected).toBe(false);
    expect(el.shadowRoot.querySelector('.radio_label').textContent.trim()).toBe('Agree');
  });

  it('dispatches dile-rating-scale-option-selected with the value on click', async () => {
    const el = await renderOption('<dile-rating-scale-option value="3"></dile-rating-scale-option>');
    let detail = null;
    el.addEventListener('dile-rating-scale-option-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('span').click();

    expect(detail).toEqual({ value: '3' });
  });
});
