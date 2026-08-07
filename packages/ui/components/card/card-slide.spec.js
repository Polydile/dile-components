import { describe, it, expect, afterEach } from 'vitest';
import './card-slide.js';

describe('dile-card-slide', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCardSlide(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-card-slide');
    await el.updateComplete;
    return el;
  }

  it('renders the title as a toggle button', async () => {
    const el = await renderCardSlide('<dile-card-slide title="My title">Content</dile-card-slide>');
    const button = el.shadowRoot.querySelector('.card-title button');
    expect(button).toBeTruthy();
    expect(el.opened).toBe(false);
  });

  it('toggles opened state when clicked', async () => {
    const el = await renderCardSlide('<dile-card-slide title="My title">Content</dile-card-slide>');
    el.shadowRoot.querySelector('.card-title button').click();
    await el.updateComplete;

    expect(el.opened).toBe(true);
  });
});
