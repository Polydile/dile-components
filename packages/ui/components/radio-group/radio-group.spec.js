import { describe, it, expect, afterEach } from 'vitest';
import './radio-group.js';

describe('dile-radio-group', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRadioGroup(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-radio-group');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted radios and label', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt" label="Choose one">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);

    expect(el.shadowRoot.querySelector('.label').textContent.trim()).toBe('Choose one');
    expect(el.querySelectorAll('dile-radio').length).toBe(2);
  });

  it('updates value and selection when a radio is clicked', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);

    const radios = el.querySelectorAll('dile-radio');
    radios[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;

    expect(el.value).toBe('b');
    expect(radios[1].selected).toBe(true);
    expect(radios[0].selected).toBe(false);
  });
});
