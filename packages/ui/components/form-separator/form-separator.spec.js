import { describe, it, expect, afterEach } from 'vitest';
import './form-separator.js';

describe('dile-form-separator', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderFormSeparator(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-form-separator');
    await el.updateComplete;
    return el;
  }

  it('renders without a heading when label is not set', async () => {
    const el = await renderFormSeparator('<dile-form-separator></dile-form-separator>');
    expect(el.shadowRoot.querySelector('div')).toBeTruthy();
    expect(el.shadowRoot.querySelector('h3')).toBeNull();
  });

  it('renders the label as a heading when set', async () => {
    const el = await renderFormSeparator('<dile-form-separator label="Section"></dile-form-separator>');
    const heading = el.shadowRoot.querySelector('h3');
    expect(heading).toBeTruthy();
    expect(heading.textContent.trim()).toBe('Section');
  });
});
