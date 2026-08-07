import { describe, it, expect, afterEach, vi } from 'vitest';
import './copy-text.js';

describe('dile-copy-text', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCopyText(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-copy-text');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content inside a clickable link', async () => {
    const el = await renderCopyText('<dile-copy-text content="hello">Copy me</dile-copy-text>');
    const link = el.shadowRoot.querySelector('a');
    expect(link).toBeTruthy();
    expect(el.textContent.trim()).toBe('Copy me');
  });

  it('dispatches dile-text-copied with the content on copy()', async () => {
    const el = await renderCopyText('<dile-copy-text content="hello">Copy me</dile-copy-text>');
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });

    let detail = null;
    el.addEventListener('dile-text-copied', (e) => { detail = e.detail; });

    await el.copy();

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(detail).toEqual({ text: 'hello' });

    vi.unstubAllGlobals();
  });
});
