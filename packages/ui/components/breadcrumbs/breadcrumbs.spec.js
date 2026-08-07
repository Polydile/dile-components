import { describe, it, expect, afterEach } from 'vitest';
import './breadcrumbs.js';

describe('dile-breadcrumbs', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderBreadcrumbs(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-breadcrumbs');
    await el.updateComplete;
    return el;
  }

  it('renders slotted breadcrumb items', async () => {
    const el = await renderBreadcrumbs(`
      <dile-breadcrumbs>
        <dile-breadcrumbs-item href="/">Home</dile-breadcrumbs-item>
        <dile-breadcrumbs-item>Current</dile-breadcrumbs-item>
      </dile-breadcrumbs>
    `);
    expect(el.querySelectorAll('dile-breadcrumbs-item').length).toBe(2);
  });

  it('renders items from the items property', async () => {
    const el = await renderBreadcrumbs('<dile-breadcrumbs></dile-breadcrumbs>');
    el.items = [{ text: 'Home', href: '/' }, { text: 'Page' }];
    await el.updateComplete;

    expect(el.shadowRoot.querySelectorAll('dile-breadcrumbs-item').length).toBe(2);
  });
});
