import { describe, it, expect, afterEach } from 'vitest';
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
});
