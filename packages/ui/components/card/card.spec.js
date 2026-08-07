import { describe, it, expect, afterEach } from 'vitest';
import './card.js';

describe('dile-card', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderCard(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-card');
    await el.updateComplete;
    return el;
  }

  it('renders the title and slotted content', async () => {
    const el = await renderCard('<dile-card title="My title">Content</dile-card>');
    expect(el.shadowRoot.querySelector('.card-title').textContent.trim()).toBe('My title');
    expect(el.textContent.trim()).toBe('Content');
  });

  it('does not render a title element when title is not set', async () => {
    const el = await renderCard('<dile-card>Content</dile-card>');
    expect(el.shadowRoot.querySelector('.card-title')).toBeNull();
  });
});
