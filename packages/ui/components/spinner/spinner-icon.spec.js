import { describe, it, expect, afterEach } from 'vitest';
import './spinner-icon.js';

describe('dile-spinner-icon', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSpinnerIcon(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-spinner-icon');
    await el.updateComplete;
    return el;
  }

  it('is inactive by default', async () => {
    const el = await renderSpinnerIcon('<dile-spinner-icon></dile-spinner-icon>');
    expect(el.active).toBe(false);
  });

  it('renders the loader icon when active', async () => {
    const el = await renderSpinnerIcon('<dile-spinner-icon active></dile-spinner-icon>');
    expect(el.shadowRoot.querySelector('dile-lucide-icon-loader-circle')).toBeTruthy();
  });
});
