import { describe, it, expect, afterEach } from 'vitest';
import './textarea.js';

describe('dile-textarea', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTextarea(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-textarea');
    await el.updateComplete;
    return el;
  }

  it('renders a native textarea with the initial value', async () => {
    const el = await renderTextarea('<dile-textarea name="bio" value="Hello"></dile-textarea>');
    const textarea = el.shadowRoot.querySelector('textarea');

    expect(textarea).toBeTruthy();
    expect(textarea.value).toBe('Hello');
  });

  it('updates the value property on input', async () => {
    const el = await renderTextarea('<dile-textarea name="bio"></dile-textarea>');
    const textarea = el.shadowRoot.querySelector('textarea');
    textarea.value = 'New text';
    textarea.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(el.value).toBe('New text');
  });

  it('renders the label when provided', async () => {
    const el = await renderTextarea('<dile-textarea name="bio" label="Bio"></dile-textarea>');
    const label = el.shadowRoot.querySelector('label');
    expect(label.textContent.trim()).toBe('Bio');
  });
});
