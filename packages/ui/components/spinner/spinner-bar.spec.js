import { describe, it, expect, afterEach } from 'vitest';
import './spinner-bar.js';

describe('dile-spinner-bar', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSpinnerBar(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-spinner-bar');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when inactive', async () => {
    const el = await renderSpinnerBar('<dile-spinner-bar></dile-spinner-bar>');
    expect(el.active).toBe(false);
    expect(el.shadowRoot.querySelector('.bar')).toBeNull();
  });

  it('renders the bar when active', async () => {
    const el = await renderSpinnerBar('<dile-spinner-bar active></dile-spinner-bar>');
    expect(el.shadowRoot.querySelector('.bar')).toBeTruthy();
  });
});
