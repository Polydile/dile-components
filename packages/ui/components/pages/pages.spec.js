import { describe, it, expect, afterEach } from 'vitest';
import './pages.js';

describe('dile-pages', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderPages(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-pages');
    await el.updateComplete;
    return el;
  }

  it('shows only the selected page', async () => {
    const el = await renderPages(`
      <dile-pages selected="1">
        <div>Page 0</div>
        <div>Page 1</div>
      </dile-pages>
    `);

    const [page0, page1] = el.children;
    expect(page0.style.display).toBe('none');
    expect(page1.style.display).toBe('block');
  });

  it('hides the previous page and shows the new one when selected changes', async () => {
    const el = await renderPages(`
      <dile-pages selected="0">
        <div>Page 0</div>
        <div>Page 1</div>
      </dile-pages>
    `);

    el.selected = 1;
    await el.updateComplete;

    const [page0, page1] = el.children;
    expect(page0.style.display).toBe('none');
    expect(page1.style.display).toBe('block');
  });
});
