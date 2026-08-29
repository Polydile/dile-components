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

  it('handles dontCloseOnAccept and can be reset with resetProcessing()', async () => {
    const el = await renderConfirm('<dile-confirm dontCloseOnAccept>Are you sure?</dile-confirm>');
    let acceptCount = 0;
    el.addEventListener('dile-confirm-accepted', () => { acceptCount++; });

    el.shadowRoot.querySelector('.accept').click();
    await el.updateComplete;
    expect(acceptCount).toBe(1);
    expect(el._isProcessing).toBe(true);
    expect(el.shadowRoot.querySelector('.accept').classList.contains('disabled')).toBe(true);

    // Clicking again while processing should not trigger accept
    el.shadowRoot.querySelector('.accept').click();
    expect(acceptCount).toBe(1);

    // Calling resetProcessing should unlock the buttons
    el.resetProcessing();
    await el.updateComplete;
    expect(el._isProcessing).toBe(false);
    expect(el.shadowRoot.querySelector('.accept').classList.contains('disabled')).toBe(false);

    el.shadowRoot.querySelector('.accept').click();
    expect(acceptCount).toBe(2);
  });
});
