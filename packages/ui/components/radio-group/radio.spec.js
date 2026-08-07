import { describe, it, expect, afterEach } from 'vitest';
import './radio.js';

describe('dile-radio', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRadio(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-radio');
    await el.updateComplete;
    return el;
  }

  it('renders the label and starts unselected', async () => {
    const el = await renderRadio('<dile-radio value="a" label="Option A"></dile-radio>');

    expect(el.selected).toBe(false);
    expect(el.shadowRoot.querySelector('.label').textContent.trim()).toBe('Option A');
  });

  it('dispatches dile-radio-selected with value and label on click', async () => {
    const el = await renderRadio('<dile-radio value="a" label="Option A"></dile-radio>');
    let detail = null;
    el.addEventListener('dile-radio-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('article').click();

    expect(detail).toEqual({ value: 'a', label: 'Option A' });
  });
});
