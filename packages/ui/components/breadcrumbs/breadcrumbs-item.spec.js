import { describe, it, expect, afterEach } from 'vitest';
import './breadcrumbs-item.js';

describe('dile-breadcrumbs-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderItem(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-breadcrumbs-item');
    await el.updateComplete;
    return el;
  }

  it('renders an anchor when href is set', async () => {
    const el = await renderItem('<dile-breadcrumbs-item href="/home">Home</dile-breadcrumbs-item>');
    const anchor = el.shadowRoot.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('/home');
  });

  it('renders a span when href is not set', async () => {
    const el = await renderItem('<dile-breadcrumbs-item>Current</dile-breadcrumbs-item>');
    expect(el.shadowRoot.querySelector('span')).toBeTruthy();
    expect(el.shadowRoot.querySelector('a')).toBeNull();
  });
});
