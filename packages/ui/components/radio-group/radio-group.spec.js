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

  it('exposes radiogroup role wired to the visible label', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt" label="Choose one">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);

    const group = el.shadowRoot.querySelector('div');
    const labelId = el.shadowRoot.querySelector('.label').id;
    expect(group.getAttribute('role')).toBe('radiogroup');
    expect(group.getAttribute('aria-labelledby')).toBe(labelId);
  });

  it('gives each radio role=radio with aria-checked reflecting selection', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt" value="a">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);
    await new Promise(resolve => setTimeout(resolve, 210));
    const radios = el.querySelectorAll('dile-radio');
    await Promise.all([...radios].map(r => r.updateComplete));

    const articles = [...radios].map(r => r.shadowRoot.querySelector('article'));
    expect(articles[0].getAttribute('role')).toBe('radio');
    expect(articles[0].getAttribute('aria-checked')).toBe('true');
    expect(articles[1].getAttribute('aria-checked')).toBe('false');
  });

  it('keeps a single roving tab stop that follows the selection', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);
    const radios = el.querySelectorAll('dile-radio');
    await Promise.all([...radios].map(r => r.updateComplete));
    let articles = [...radios].map(r => r.shadowRoot.querySelector('article'));
    expect(articles[0].getAttribute('tabindex')).toBe('0');
    expect(articles[1].getAttribute('tabindex')).toBe('-1');

    radios[1].shadowRoot.querySelector('article').click();
    await el.updateComplete;
    await Promise.all([...radios].map(r => r.updateComplete));
    articles = [...radios].map(r => r.shadowRoot.querySelector('article'));
    expect(articles[0].getAttribute('tabindex')).toBe('-1');
    expect(articles[1].getAttribute('tabindex')).toBe('0');
  });

  it('moves selection with arrow keys', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt" value="a">
        <dile-radio value="a" label="A"></dile-radio>
        <dile-radio value="b" label="B"></dile-radio>
      </dile-radio-group>
    `);
    await new Promise(resolve => setTimeout(resolve, 210));

    el.shadowRoot.querySelector('div').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true })
    );
    await el.updateComplete;

    expect(el.value).toBe('b');
  });

  it('propagates disabled state to the slotted radios', async () => {
    const el = await renderRadioGroup(`
      <dile-radio-group name="opt" disabled>
        <dile-radio value="a" label="A"></dile-radio>
      </dile-radio-group>
    `);
    const radio = el.querySelector('dile-radio');
    await radio.updateComplete;

    expect(radio.disabled).toBe(true);
    const article = radio.shadowRoot.querySelector('article');
    expect(article.getAttribute('tabindex')).toBe('-1');
    expect(article.getAttribute('aria-disabled')).toBe('true');
  });
});
