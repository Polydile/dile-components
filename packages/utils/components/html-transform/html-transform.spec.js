import { describe, it, expect, afterEach } from 'vitest';
import './html-transform.js';

describe('dile-html-transform', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderHtmlTransform(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-html-transform');
    await el.updateComplete;
    return el;
  }

  it('renders the plain text when no conversion flags are set', async () => {
    const el = await renderHtmlTransform('<dile-html-transform text="hello world"></dile-html-transform>');
    expect(el.shadowRoot.textContent.trim()).toBe('hello world');
  });

  it('converts a link when convertLinks is set', async () => {
    const el = await renderHtmlTransform('<dile-html-transform text="visit example.com" convertLinks></dile-html-transform>');
    expect(el.shadowRoot.querySelector('a')).toBeTruthy();
  });
});
