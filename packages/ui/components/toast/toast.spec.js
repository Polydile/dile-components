import { describe, it, expect, afterEach } from 'vitest';
import './toast.js';

describe('dile-toast', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderToast(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-toast');
    await el.updateComplete;
    return el;
  }

  async function openAndGetItem(el, text, toastType) {
    el.open(text, toastType);
    await el.updateComplete;
    const item = el.shadowRoot.querySelector('dile-toast-item');
    await item.updateComplete;
    return item;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it('does not render a close icon by default', async () => {
    const el = await renderToast('<dile-toast duration="10000"></dile-toast>');
    const item = await openAndGetItem(el, 'Hello');

    expect(item.shadowRoot.querySelector('.closeicon')).toBeNull();
  });

  it('renders the message text and status class', async () => {
    const el = await renderToast('<dile-toast duration="10000"></dile-toast>');
    const item = await openAndGetItem(el, 'Saved!', 'success');

    expect(item.shadowRoot.querySelector('.text').textContent.trim()).toBe('Saved!');
    expect(item.shadowRoot.querySelector('div').classList.contains('success')).toBe(true);
  });

  it('renders a close icon when showCloseIcon is set', async () => {
    const el = await renderToast('<dile-toast duration="10000" showCloseIcon></dile-toast>');
    const item = await openAndGetItem(el, 'Hello');

    expect(item.shadowRoot.querySelector('dile-icon.closeicon')).toBeTruthy();
  });

  it('closing a toast dispatches dile-toast-closed-by-user with the message detail', async () => {
    const el = await renderToast('<dile-toast duration="10000" showCloseIcon></dile-toast>');
    const item = await openAndGetItem(el, 'Dismiss me', 'error');

    let detail = null;
    el.addEventListener('dile-toast-closed-by-user', (e) => { detail = e.detail; });

    item.shadowRoot.querySelector('dile-icon.closeicon').click();
    await el.updateComplete;

    expect(detail).toBeTruthy();
    expect(detail.message.text).toBe('Dismiss me');
    expect(detail.message.toastType).toBe('error');
  });

  it('removes the closed toast from the DOM shortly after, without waiting for its duration', async () => {
    const el = await renderToast('<dile-toast duration="10000" showCloseIcon></dile-toast>');
    const item = await openAndGetItem(el, 'Dismiss me');

    item.shadowRoot.querySelector('dile-icon.closeicon').click();
    await el.updateComplete;
    expect(item.shadowRoot.querySelector('div').classList.contains('hidden')).toBe(true);

    await wait(600);

    expect(el.shadowRoot.querySelector('dile-toast-item')).toBeNull();
  });

  it('still auto-hides and cleans up a toast on its own after duration elapses', async () => {
    const el = await renderToast('<dile-toast duration="50"></dile-toast>');
    await openAndGetItem(el, 'Auto dismiss');

    await wait(1200);

    expect(el.shadowRoot.querySelector('dile-toast-item')).toBeNull();
  });
});
