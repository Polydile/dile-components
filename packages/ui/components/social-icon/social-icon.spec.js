import { describe, it, expect, afterEach } from 'vitest';
import './social-icon.js';

describe('dile-social-icon', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSocialIcon(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-social-icon');
    await el.updateComplete;
    return el;
  }

  it('defaults to the facebook icon and renders an svg', async () => {
    const el = await renderSocialIcon('<dile-social-icon></dile-social-icon>');
    expect(el.icon).toBe('facebook');
    expect(el.shadowRoot.querySelector('svg')).toBeTruthy();
  });

  it('renders a different icon based on the icon property', async () => {
    const el = await renderSocialIcon('<dile-social-icon icon="twitter"></dile-social-icon>');
    expect(el.shadowRoot.querySelector('svg')).toBeTruthy();
  });
});
