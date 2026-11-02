import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import './selector-item.js';

describe('dile-selector-item', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSelectorItem(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-selector-item');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content and starts unselected', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');

    expect(el.selected).toBe(false);
    expect(el.textContent.trim()).toBe('Option A');
    expect(el.shadowRoot.querySelector('button')).toBeTruthy();
  });

  it('dispatches dile-item-selected with itself when clicked', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
    let detail = null;
    el.addEventListener('dile-item-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('button').click();

    expect(detail).toBe(el);
  });

  it('wraps content in a link when href is set', async () => {
    const el = await renderSelectorItem('<dile-selector-item href="/foo">Go</dile-selector-item>');
    const link = el.shadowRoot.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/foo');
  });

  it('renders a native button, without a role of its own by default', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
    const button = el.shadowRoot.querySelector('button');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.hasAttribute('role')).toBe(false);
  });

  it('receives the focus through focus()', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
    el.focus();
    expect(document.activeElement).toBe(el);
    expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('button'));
  });

  for (const [keyName, key] of [['Enter', '{Enter}'], ['Space', '[Space]']]) {
    it(`dispatches dile-item-selected when activated with ${keyName}`, async () => {
      const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
      let times = 0;
      el.addEventListener('dile-item-selected', () => { times++; });
      el.focus();
      await userEvent.keyboard(key);
      expect(times).toBe(1);
    });

    it(`dispatches dile-item-selected when a link item is activated with ${keyName}`, async () => {
      const el = await renderSelectorItem('<dile-selector-item href="#selector-item-no-target">Go</dile-selector-item>');
      let times = 0;
      el.addEventListener('dile-item-selected', () => { times++; });
      el.focus();
      await userEvent.keyboard(key);
      expect(times).toBe(1);
      expect(window.location.hash).toBe('#selector-item-no-target');
      expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('a'));
      window.location.hash = '';
    });
  }

  it('exposes the selected state with aria-current', async () => {
    const el = await renderSelectorItem('<dile-selector-item>Option A</dile-selector-item>');
    const button = el.shadowRoot.querySelector('button');
    expect(button.hasAttribute('aria-current')).toBe(false);

    el.selected = true;
    await el.updateComplete;
    expect(button.getAttribute('aria-current')).toBe('true');

    el.selected = false;
    await el.updateComplete;
    expect(button.hasAttribute('aria-current')).toBe(false);
  });

  it('exposes the selected state of link items with aria-current', async () => {
    const el = await renderSelectorItem('<dile-selector-item href="/foo" selected>Go</dile-selector-item>');
    expect(el.shadowRoot.querySelector('a').getAttribute('aria-current')).toBe('true');
  });

  it('shows a focus ring configurable with CSS custom properties, only for keyboard focus', async () => {
    const el = await renderSelectorItem(`
      <dile-selector-item style="--dile-selector-focus-ring-width: 4px; --dile-selector-focus-ring-color: rgb(255, 0, 0);">Option A</dile-selector-item>
      <button id="before">Before</button>
    `);
    const button = el.shadowRoot.querySelector('button');

    await userEvent.click(el);
    expect(button.matches(':focus-visible')).toBe(false);

    document.getElementById('before').focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    expect(button.matches(':focus-visible')).toBe(true);
    const styles = getComputedStyle(button);
    expect(styles.outlineWidth).toBe('4px');
    expect(styles.outlineColor).toBe('rgb(255, 0, 0)');
  });
});
