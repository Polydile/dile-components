import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import './tabs.js';

describe('dile-tabs', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTabs(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-tabs');
    await el.updateComplete;
    return el;
  }

  it('renders slotted dile-tab items', async () => {
    const el = await renderTabs(`
      <dile-tabs selected="0">
        <dile-tab>One</dile-tab>
        <dile-tab>Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    expect(tabs.length).toBe(2);
    await tabs[0].updateComplete;
    expect(tabs[0].selected).toBe(true);
  });

  it('selects a tab when clicked', async () => {
    const el = await renderTabs(`
      <dile-tabs>
        <dile-tab>One</dile-tab>
        <dile-tab>Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await tabs[1].updateComplete;
    tabs[1].shadowRoot.querySelector('button').click();
    await el.updateComplete;

    expect(el.selected).toBe(1);
  });

  it('renders a native link when the tab has an href', async () => {
    const el = await renderTabs(`
      <dile-tabs>
        <dile-tab href="/one">One</dile-tab>
        <dile-tab href="https://example.com" target="_blank">Two</dile-tab>
        <dile-tab>Three</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await Promise.all([...tabs].map((tab) => tab.updateComplete));

    const link1 = tabs[0].shadowRoot.querySelector('a');
    expect(link1.getAttribute('href')).toBe('/one');
    expect(link1.hasAttribute('target')).toBe(false);
    expect(link1.getAttribute('role')).toBe('tab');

    const link2 = tabs[1].shadowRoot.querySelector('a');
    expect(link2.getAttribute('target')).toBe('_blank');

    expect(tabs[2].shadowRoot.querySelector('a')).toBeNull();
  });

  it('keeps selection working for tabs with href', async () => {
    const el = await renderTabs(`
      <dile-tabs attrForSelected="name" selected="two">
        <dile-tab name="one" href="#one">One</dile-tab>
        <dile-tab name="two" href="#two">Two</dile-tab>
      </dile-tabs>
    `);

    const tabs = el.querySelectorAll('dile-tab');
    await tabs[1].updateComplete;
    expect(tabs[1].selected).toBe(true);

    tabs[0].shadowRoot.querySelector('a').click();
    await el.updateComplete;
    expect(el.selected).toBe('one');
  });

  describe('keyboard and ARIA', () => {
    const threeTabs = `
      <dile-tab>One</dile-tab>
      <dile-tab>Two</dile-tab>
      <dile-tab>Three</dile-tab>
    `;

    async function renderSurrounded(html) {
      window.location.hash = '';
      document.body.innerHTML = `<button id="before">Before</button>${html}<button id="after">After</button>`;
      const el = document.body.querySelector('dile-tabs');
      await el.updateComplete;
      const tabs = el.querySelectorAll('dile-tab');
      await Promise.all([...tabs].map((tab) => tab.updateComplete));
      return { el, tabs };
    }

    const roleControl = (tab) => tab.shadowRoot.querySelector('[role="tab"]');

    it('applies the tablist and tab roles, and aria-selected', async () => {
      const { el, tabs } = await renderSurrounded(`<dile-tabs selected="1">${threeTabs}</dile-tabs>`);

      expect(el.getAttribute('role')).toBe('tablist');
      expect(roleControl(tabs[0]).getAttribute('aria-selected')).toBe('false');
      expect(roleControl(tabs[1]).getAttribute('aria-selected')).toBe('true');

      el.selected = 2;
      await el.updateComplete;
      await tabs[2].updateComplete;
      await tabs[1].updateComplete;
      expect(roleControl(tabs[1]).getAttribute('aria-selected')).toBe('false');
      expect(roleControl(tabs[2]).getAttribute('aria-selected')).toBe('true');
    });

    it('respects a role set by the page', async () => {
      const { el } = await renderSurrounded(`<dile-tabs role="navigation">${threeTabs}</dile-tabs>`);
      expect(el.getAttribute('role')).toBe('navigation');
    });

    it('is only one stop in the tab sequence, on the selected tab', async () => {
      const { tabs } = await renderSurrounded(`<dile-tabs selected="1">${threeTabs}</dile-tabs>`);

      document.getElementById('before').focus();
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(tabs[1]);
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(document.getElementById('after'));
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      expect(document.activeElement).toBe(tabs[1]);
    });

    it('enters on the first tab when nothing is selected', async () => {
      const { tabs } = await renderSurrounded(`<dile-tabs>${threeTabs}</dile-tabs>`);
      document.getElementById('before').focus();
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('moves with the arrows, wrapping, and with Home and End, without changing the selection', async () => {
      const { el, tabs } = await renderSurrounded(`<dile-tabs selected="0">${threeTabs}</dile-tabs>`);
      let changes = 0;
      el.addEventListener('dile-selected-changed', () => { changes++; });
      tabs[0].focus();

      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(tabs[1]);
      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(tabs[0]);
      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(tabs[2]);
      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(tabs[0]);
      await userEvent.keyboard('{End}');
      expect(document.activeElement).toBe(tabs[2]);
      await userEvent.keyboard('{Home}');
      expect(document.activeElement).toBe(tabs[0]);

      expect(el.selected).toBe('0');
      expect(changes).toBe(0);
    });

    it('inverts the left and right arrows in right to left pages', async () => {
      const { tabs } = await renderSurrounded(`<dile-tabs dir="rtl" selected="0">${threeTabs}</dile-tabs>`);
      tabs[0].focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(tabs[1]);
      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('does not capture the arrows with modifier keys', async () => {
      const { tabs } = await renderSurrounded(`<dile-tabs selected="0">${threeTabs}</dile-tabs>`);
      tabs[0].focus();
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight', altKey: true, bubbles: true, composed: true, cancelable: true });
      roleControl(tabs[0]).dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
      expect(document.activeElement).toBe(tabs[0]);
    });

    for (const [keyName, key] of [['Enter', '{Enter}'], ['Space', '[Space]']]) {
      it(`selects the focused tab with ${keyName}`, async () => {
        const { el, tabs } = await renderSurrounded(`<dile-tabs selected="0">${threeTabs}</dile-tabs>`);
        const changes = [];
        el.addEventListener('dile-selected-changed', (e) => changes.push(e.detail.selected));

        tabs[0].focus();
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard(key);
        await el.updateComplete;

        expect(changes).toEqual([1]);
        expect(el.selected).toBe(1);
        expect(tabs[1].selected).toBe(true);
        expect(document.activeElement).toBe(tabs[1]);
      });

      it(`selects and follows a link tab with ${keyName}`, async () => {
        const { el, tabs } = await renderSurrounded(`
          <dile-tabs attrForSelected="name" selected="one">
            <dile-tab name="one" href="#tabs-no-target-one">One</dile-tab>
            <dile-tab name="two" href="#tabs-no-target-two">Two</dile-tab>
          </dile-tabs>
        `);
        tabs[0].focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement).toBe(tabs[1]);
        expect(window.location.hash).toBe('');

        await userEvent.keyboard(key);
        await el.updateComplete;

        expect(el.selected).toBe('two');
        expect(window.location.hash).toBe('#tabs-no-target-two');
        window.location.hash = '';
      });
    }

    it('returns to the selected tab after leaving a tab that is not selected', async () => {
      const { tabs } = await renderSurrounded(`<dile-tabs selected="0">${threeTabs}</dile-tabs>`);
      tabs[0].focus();
      await userEvent.keyboard('{ArrowRight}');
      await userEvent.keyboard('{Tab}');
      expect(document.activeElement).toBe(document.getElementById('after'));
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      expect(document.activeElement).toBe(tabs[0]);
    });

    it('works with attrForSelected, hashSelection and selectorId', async () => {
      const { el, tabs } = await renderSurrounded(`
        <dile-tabs attrForSelected="name" selected="kb-one" hashSelection selectorId="tabs-keyboard">
          <dile-tab name="kb-one">One</dile-tab>
          <dile-tab name="kb-two">Two</dile-tab>
        </dile-tabs>
      `);
      const details = [];
      el.addEventListener('dile-selected-changed', (e) => details.push(e.detail));

      tabs[0].focus();
      await userEvent.keyboard('{End}');
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;

      expect(el.selected).toBe('kb-two');
      expect(window.location.hash).toBe('#kb-two');
      expect(details.at(-1).selected).toBe('kb-two');
      expect(details.at(-1).selectorId).toBe('tabs-keyboard');
      expect(document.activeElement).toBe(tabs[1]);
      window.location.hash = '';
    });

    it('selects with a real mouse click, without showing a focus ring', async () => {
      const { el, tabs } = await renderSurrounded(`<dile-tabs selected="0">${threeTabs}</dile-tabs>`);
      await userEvent.click(tabs[1]);
      await el.updateComplete;
      expect(el.selected).toBe(1);
      expect(roleControl(tabs[1]).matches(':focus-visible')).toBe(false);
    });

    it('shows a focus ring configurable with CSS custom properties', async () => {
      const { tabs } = await renderSurrounded(`
        <dile-tabs selected="0" style="--dile-tab-focus-ring-width: 4px; --dile-tab-focus-ring-color: rgb(255, 0, 0);">${threeTabs}</dile-tabs>
      `);
      document.getElementById('before').focus();
      await userEvent.keyboard('{Tab}');
      const control = roleControl(tabs[0]);
      expect(control.matches(':focus-visible')).toBe(true);
      const styles = getComputedStyle(control);
      expect(styles.outlineWidth).toBe('4px');
      expect(styles.outlineColor).toBe('rgb(255, 0, 0)');
    });
  });
});
