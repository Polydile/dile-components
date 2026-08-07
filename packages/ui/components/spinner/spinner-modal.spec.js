import { describe, it, expect, afterEach } from 'vitest';
import './spinner-modal.js';

describe('dile-spinner-modal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSpinnerModal(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-spinner-modal');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when inactive', async () => {
    const el = await renderSpinnerModal('<dile-spinner-modal></dile-spinner-modal>');
    expect(el.shadowRoot.querySelector('div')).toBeNull();
  });

  it('renders the modal overlay with a spinner when active', async () => {
    const el = await renderSpinnerModal('<dile-spinner-modal active></dile-spinner-modal>');
    expect(el.shadowRoot.querySelector('div')).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-spinner')).toBeTruthy();
  });
});
