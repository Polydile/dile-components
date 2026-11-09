import { describe, it, expect, afterEach } from 'vitest';
import { userEvent } from 'vitest/browser';
import './chip.js';

describe('dile-chip', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderChip(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-chip');
    await el.updateComplete;
    return el;
  }

  const buttonOf = (el) => el.shadowRoot.querySelector('button');

  it('renders the slotted content and a close icon', async () => {
    const el = await renderChip('<dile-chip>Tag</dile-chip>');
    expect(el.textContent.trim()).toBe('Tag');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('dispatches dile-chip-icon-click with the name when the icon is clicked', async () => {
    const el = await renderChip('<dile-chip name="tag1">Tag</dile-chip>');
    let detail = null;
    el.addEventListener('dile-chip-icon-click', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('dile-icon').click();

    expect(detail).toEqual({ name: 'tag1' });
  });

  describe('accessibility', () => {
    it('renders the icon action as a native button with a decorative icon', async () => {
      const el = await renderChip('<dile-chip>Tag</dile-chip>');
      const button = buttonOf(el);
      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
      expect(el.shadowRoot.querySelector('dile-icon').getAttribute('aria-hidden')).toBe('true');
    });

    it('labels the button with the action label and the chip text', async () => {
      const el = await renderChip('<dile-chip>Tag</dile-chip>');
      const ids = buttonOf(el).getAttribute('aria-labelledby').split(' ');
      const label = ids.map((id) => el.shadowRoot.getElementById(id))
        .map((node) => node.id === 'text' ? el.textContent.trim() : node.textContent.trim())
        .join(' ');
      expect(label).toBe('Remove Tag');
    });

    it('allows customizing the action label with the icon-label attribute', async () => {
      const el = await renderChip('<dile-chip icon-label="Quitar">Tag</dile-chip>');
      expect(el.iconLabel).toBe('Quitar');
      expect(el.shadowRoot.getElementById('action').textContent.trim()).toBe('Quitar');
    });

    it('is reachable with the keyboard and focus() moves focus to the button', async () => {
      const el = await renderChip('<dile-chip>Tag</dile-chip>');
      await userEvent.keyboard('{Tab}');
      expect(el.shadowRoot.activeElement).toBe(buttonOf(el));

      buttonOf(el).blur();
      el.focus();
      expect(el.shadowRoot.activeElement).toBe(buttonOf(el));
    });

    it('dispatches dile-chip-icon-click when activated with Enter, Space, Delete or Backspace', async () => {
      const el = await renderChip('<dile-chip name="tag1">Tag</dile-chip>');
      let count = 0;
      el.addEventListener('dile-chip-icon-click', () => { count++; });
      el.focus();

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await userEvent.keyboard('{Delete}');
      await userEvent.keyboard('{Backspace}');

      expect(count).toBe(4);
    });
  });
});
