import { describe, it, expect, afterEach } from 'vitest';
import './confirm.js';

describe('dile-confirm', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderConfirm(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-confirm');
    await el.updateComplete;
    return el;
  }

  it('renders a dile-modal with the default action labels', async () => {
    const el = await renderConfirm('<dile-confirm>Are you sure?</dile-confirm>');
    expect(el.shadowRoot.querySelector('dile-modal')).toBeTruthy();
    expect(el.shadowRoot.querySelector('.accept').textContent.trim()).toBe('Accept');
    expect(el.shadowRoot.querySelector('.cancel').textContent.trim()).toBe('Cancell');
  });

  it('dispatches dile-confirm-accepted when accept is clicked', async () => {
    const el = await renderConfirm('<dile-confirm>Are you sure?</dile-confirm>');
    let accepted = false;
    el.addEventListener('dile-confirm-accepted', () => { accepted = true; });

    el.shadowRoot.querySelector('.accept').click();

    expect(accepted).toBe(true);
  });
});
