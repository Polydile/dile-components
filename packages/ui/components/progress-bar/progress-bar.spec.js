import { describe, it, expect, afterEach } from 'vitest';
import './progress-bar.js';

describe('dile-progress-bar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderProgressBar(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-progress-bar');
    await el.updateComplete;
    return el;
  }

  it('renders the progress bar width and percentage from the value property', async () => {
    const el = await renderProgressBar('<dile-progress-bar value="42"></dile-progress-bar>');
    const bar = el.shadowRoot.querySelector('.progress-bar');

    expect(bar.getAttribute('style')).toContain('width: 42%');
    expect(bar.querySelector('span').textContent.trim()).toBe('42%');
  });

  it('renders the title when set', async () => {
    const el = await renderProgressBar('<dile-progress-bar title="Loading"></dile-progress-bar>');
    expect(el.shadowRoot.querySelector('.progress-bar-title').textContent.trim()).toBe('Loading');
  });
});
