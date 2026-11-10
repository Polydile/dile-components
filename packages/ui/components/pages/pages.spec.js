import { describe, it, expect, afterEach } from 'vitest';
import './pages.js';
import '../tabs/tabs.js';

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

  describe('tabpanels mode', () => {
    async function renderTabsAndPages(html) {
      document.body.innerHTML = html;
      const tabs = document.querySelector('dile-tabs');
      const pages = document.querySelector('dile-pages');
      await tabs.updateComplete;
      await pages.updateComplete;
      await pages._linkTabsWhenReady();
      return { tabs, pages };
    }

    it('does not add tab panel semantics by default', async () => {
      const el = await renderPages(`
        <dile-pages>
          <div>Page 0</div>
        </dile-pages>
      `);
      expect(el.children[0].hasAttribute('role')).toBe(false);
    });

    it('marks every page as a tabpanel with an id', async () => {
      const el = await renderPages(`
        <dile-pages tabpanels>
          <div>Page 0</div>
          <div id="custom">Page 1</div>
        </dile-pages>
      `);
      const [page0, page1] = el.children;
      expect(page0.getAttribute('role')).toBe('tabpanel');
      expect(page0.id).not.toBe('');
      expect(page1.id).toBe('custom');
    });

    it('links pages and tabs by index', async () => {
      const { tabs, pages } = await renderTabsAndPages(`
        <dile-tabs selectorId="sel1" selected="0">
          <dile-tab>One</dile-tab>
          <dile-tab>Two</dile-tab>
        </dile-tabs>
        <dile-pages tabpanels selectorId="sel1" selected="0">
          <div>Page 0</div>
          <div>Page 1</div>
        </dile-pages>
      `);
      const tabItems = tabs.querySelectorAll('dile-tab');
      [...pages.children].forEach((page, index) => {
        expect(page.getAttribute('aria-labelledby')).toBe(tabItems[index].id);
        expect(tabItems[index].controlsElement).toBe(page);
      });
      await tabItems[1].updateComplete;
      const inner = tabItems[1].shadowRoot.querySelector('[role="tab"]');
      expect(inner.ariaControlsElements).toEqual([pages.children[1]]);
    });

    it('links pages and tabs by attrForSelected', async () => {
      const { tabs, pages } = await renderTabsAndPages(`
        <dile-tabs selectorId="sel2" attrForSelected="name" selected="b">
          <dile-tab name="a" id="tab-a">A</dile-tab>
          <dile-tab name="b" id="tab-b">B</dile-tab>
        </dile-tabs>
        <dile-pages tabpanels selectorId="sel2" attrForSelected="name" selected="b">
          <div name="b">Page B</div>
          <div name="a">Page A</div>
        </dile-pages>
      `);
      const [pageB, pageA] = pages.children;
      expect(pageB.getAttribute('aria-labelledby')).toBe('tab-b');
      expect(pageA.getAttribute('aria-labelledby')).toBe('tab-a');
      expect(tabs.querySelector('#tab-a').controlsElement).toBe(pageA);
    });

    it('removes the semantics when tabpanels is disabled', async () => {
      const { tabs, pages } = await renderTabsAndPages(`
        <dile-tabs selectorId="sel3">
          <dile-tab>One</dile-tab>
        </dile-tabs>
        <dile-pages tabpanels selectorId="sel3">
          <div>Page 0</div>
        </dile-pages>
      `);
      pages.tabpanels = false;
      await pages.updateComplete;
      const page = pages.children[0];
      expect(page.hasAttribute('role')).toBe(false);
      expect(page.hasAttribute('aria-labelledby')).toBe(false);
      expect(tabs.querySelector('dile-tab').controlsElement).toBe(undefined);
    });
  });
});
