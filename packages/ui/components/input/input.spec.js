import { describe, it, expect, afterEach } from 'vitest';
import './input.js';

describe('dile-input', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInput(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input with the given value', async () => {
    const el = await renderInput('<dile-input name="first" value="hello"></dile-input>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('hello');
  });

  it('renders the label when set', async () => {
    const el = await renderInput('<dile-input label="First name"></dile-input>');
    const label = el.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('First name');
  });

  it('updates the value property on user input', async () => {
    const el = await renderInput('<dile-input name="first"></dile-input>');
    const input = el.shadowRoot.querySelector('input');
    input.value = 'typed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('typed');
  });

  it('renders a message when the message property is set', async () => {
    const el = await renderInput('<dile-input></dile-input>');
    el.message = 'Required field';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.message span').textContent.trim()).toBe('Required field');
  });
});
