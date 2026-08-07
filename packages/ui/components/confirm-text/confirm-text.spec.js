import { describe, it, expect, afterEach } from 'vitest';
import './confirm-text.js';

describe('dile-confirm-text', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderConfirmText(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-confirm-text');
    await el.updateComplete;
    return el;
  }

  it('renders the title and an input to type the confirmation text', async () => {
    const el = await renderConfirmText('<dile-confirm-text title="Delete item">This cannot be undone</dile-confirm-text>');
    expect(el.shadowRoot.querySelector('.title').textContent.trim()).toBe('Delete item');
    expect(el.shadowRoot.querySelector('dile-input')).toBeTruthy();
  });

  it('shows negative feedback when accepting with an empty text field', async () => {
    const el = await renderConfirmText('<dile-confirm-text>Confirm</dile-confirm-text>');
    el.shadowRoot.querySelector('.accept').click();
    await el.updateComplete;

    expect(el.feedback.shadowRoot.textContent).toContain(el.emptyTextMessage);
  });
});
