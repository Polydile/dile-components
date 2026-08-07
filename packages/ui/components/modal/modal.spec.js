import { describe, it, expect, afterEach } from 'vitest';
import './modal.js';

describe('dile-modal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderModal(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-modal');
    await el.updateComplete;
    return el;
  }

  it('renders closed by default with slotted content', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    expect(el.opened).toBe(false);
    expect(el.textContent.trim()).toBe('Modal content');
    expect(el.shadowRoot.querySelector('section').classList.contains('opaque')).toBe(false);
  });

  it('opens the modal via open()', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    expect(el.opened).toBe(true);
    expect(el.shadowRoot.querySelector('section').classList.contains('opened')).toBe(true);
  });

  it('closes and dispatches dile-modal-closed via close()', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    let closed = false;
    el.addEventListener('dile-modal-closed', () => { closed = true; });

    el.close();
    await el.updateComplete;

    expect(el.opened).toBe(false);
    expect(closed).toBe(true);
  });
});
