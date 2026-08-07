import { describe, it, expect, afterEach } from 'vitest';
import './spinner-horizontal.js';

describe('dile-spinner-horizontal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSpinnerHorizontal(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-spinner-horizontal');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when inactive', async () => {
    const el = await renderSpinnerHorizontal('<dile-spinner-horizontal></dile-spinner-horizontal>');
    expect(el.shadowRoot.querySelector('.loader')).toBeNull();
  });

  it('renders the loader when active', async () => {
    const el = await renderSpinnerHorizontal('<dile-spinner-horizontal active></dile-spinner-horizontal>');
    expect(el.shadowRoot.querySelector('.loader')).toBeTruthy();
  });
});
