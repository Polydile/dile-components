import { describe, it, expect, afterEach } from 'vitest';
import './copy-markdown-url.js';

describe('dile-copy-markdown-url', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCopyMarkdownUrl(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-copy-markdown-url');
    await el.updateComplete;
    return el;
  }

  it('renders a dile-copy-text with the slotted content', async () => {
    const el = await renderCopyMarkdownUrl('<dile-copy-markdown-url url="/doc.md">Copy link</dile-copy-markdown-url>');
    expect(el.shadowRoot.querySelector('dile-copy-text')).toBeTruthy();
    expect(el.textContent.trim()).toBe('Copy link');
  });

  it('defaults to an empty url and content', async () => {
    const el = await renderCopyMarkdownUrl('<dile-copy-markdown-url></dile-copy-markdown-url>');
    expect(el.url).toBe('');
    expect(el.content).toBe('');
  });
});
