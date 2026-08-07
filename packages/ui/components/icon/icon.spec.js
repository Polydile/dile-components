import { describe, it, expect, afterEach } from 'vitest';
import { closeIcon } from '@dile/icons/index.js';
import './icon.js';

describe('dile-icon', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderIcon(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-icon');
    await el.updateComplete;
    return el;
  }

  it('renders the provided icon inside a span', async () => {
    const el = await renderIcon('<dile-icon></dile-icon>');
    el.icon = closeIcon;
    await el.updateComplete;

    const span = el.shadowRoot.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.querySelector('svg')).toBeTruthy();
  });

  it('renders nothing extra when icon is not set', async () => {
    const el = await renderIcon('<dile-icon></dile-icon>');
    expect(el.shadowRoot.querySelector('span').querySelector('svg')).toBeNull();
  });
});
