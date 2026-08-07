import { describe, it, expect, afterEach } from 'vitest';
import './slide-show.js';

describe('dile-slide-show', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSlideShow(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-slide-show');
    await el.updateComplete;
    return el;
  }

  it('renders closed by default with the showLabel text', async () => {
    const el = await renderSlideShow('<dile-slide-show>Content</dile-slide-show>');
    const link = el.shadowRoot.querySelector('a');

    expect(link).toBeTruthy();
    expect(link.textContent.trim()).toBe('Open');
    expect(link.classList.contains('showmoreclose')).toBe(true);
  });

  it('opens and shows the hideLabel text', async () => {
    const el = await renderSlideShow('<dile-slide-show hideLabel="Close it">Content</dile-slide-show>');
    el.toggle();
    await el.updateComplete;

    const link = el.shadowRoot.querySelector('a');
    expect(link.textContent.trim()).toBe('Close it');
    expect(link.classList.contains('showmoreopen')).toBe(true);
  });
});
