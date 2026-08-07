import { describe, it, expect, afterEach } from 'vitest';
import './avatar.js';

describe('dile-avatar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderAvatar(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-avatar');
    await el.updateComplete;
    return el;
  }

  it('renders an image placeholder div when no initial is set', async () => {
    const el = await renderAvatar('<dile-avatar></dile-avatar>');
    expect(el.shadowRoot.querySelector('#img')).toBeTruthy();
  });

  it('renders the first letter of the initial property', async () => {
    const el = await renderAvatar('<dile-avatar initial="Miguel"></dile-avatar>');
    expect(el.shadowRoot.querySelector('.initial').textContent.trim()).toBe('M');
  });
});
