import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { html } from 'lit';
import './crud-item-delete.js';

describe('dile-crud-item-delete confirm message', () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  beforeEach(() => {
    window.axiosInstance = {
      delete: vi.fn(() => Promise.resolve({ status: 200, data: { message: 'Deleted' } })),
    };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  async function mount(props = {}) {
    const el = document.createElement('dile-crud-item-delete');
    el.endpoint = 'https://example.test/api/tags';
    Object.assign(el, props);
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
  }

  function message(el) {
    return el.shadowRoot.querySelector('dile-confirm .message');
  }

  function confirmElement(el) {
    return el.shadowRoot.querySelector('dile-confirm');
  }

  const tagTemplate = (item) => html`The tag <strong>${item.name}</strong> will be removed from ${item.usage_count} customers.`;

  it('without template uses the translation', async () => {
    const el = await mount();
    el.translations = { delete_confirm_message: 'Translated message' };
    el.delete(1, { id: 1, name: 'VIP' });
    await el.updateComplete;
    expect(message(el).textContent.trim()).toBe('Translated message');
    expect(confirmElement(el).shadowRoot.querySelector('dile-modal').opened).toBe(true);
  });

  it('without template uses confirmMessage when provided', async () => {
    const el = await mount({ confirmMessage: 'Custom message' });
    el.delete(1, { id: 1, name: 'VIP' });
    await el.updateComplete;
    expect(message(el).textContent.trim()).toBe('Custom message');
  });

  it('renders the template with the item, including HTML', async () => {
    const el = await mount({ confirmMessageTemplate: tagTemplate });
    el.delete(1, { id: 1, name: 'VIP', usage_count: 12 });
    await el.updateComplete;
    const strong = message(el).querySelector('strong');
    expect(strong).toBeTruthy();
    expect(strong.textContent).toBe('VIP');
    expect(message(el).textContent.replace(/\s+/g, ' ').trim())
      .toBe('The tag VIP will be removed from 12 customers.');
  });

  it('accepts a template returning a plain string', async () => {
    const el = await mount({ confirmMessageTemplate: (item) => `Delete ${item.name}?` });
    el.delete(1, { id: 1, name: 'VIP' });
    await el.updateComplete;
    expect(message(el).textContent.trim()).toBe('Delete VIP?');
  });

  it('falls back to the default message when delete() is called without item', async () => {
    const el = await mount({ confirmMessageTemplate: tagTemplate, confirmMessage: 'Fallback message' });
    el.delete(1);
    await el.updateComplete;
    expect(message(el).querySelector('strong')).toBeNull();
    expect(message(el).textContent.trim()).toBe('Fallback message');
  });

  it('still throws when no item id is provided', async () => {
    const el = await mount();
    expect(() => el.delete('')).toThrow();
  });

  it('clears the stored item when the confirm is cancelled', async () => {
    const el = await mount({ confirmMessageTemplate: tagTemplate });
    el.delete(1, { id: 1, name: 'VIP', usage_count: 12 });
    await el.updateComplete;
    confirmElement(el).cancel();
    await el.updateComplete;
    expect(el.itemToDelete).toBeNull();
    expect(message(el).querySelector('strong')).toBeNull();
  });

  it('sends the DELETE request on accept and clears the item on success', async () => {
    const el = await mount({ confirmMessageTemplate: tagTemplate });
    const onSuccess = vi.fn();
    el.addEventListener('delete-success', onSuccess);
    el.delete(7, { id: 7, name: 'VIP', usage_count: 12 });
    await el.updateComplete;
    confirmElement(el).accept();
    await wait(0);
    await el.updateComplete;

    expect(window.axiosInstance.delete).toHaveBeenCalledTimes(1);
    expect(window.axiosInstance.delete.mock.calls[0][0]).toBe('https://example.test/api/tags/7');
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(el.itemToDelete).toBeNull();
  });

  it('clears the stored item on error', async () => {
    window.axiosInstance.delete = vi.fn(() => Promise.reject({ response: { status: 500, data: { message: 'Error' } } }));
    const el = await mount({ confirmMessageTemplate: tagTemplate });
    const onError = vi.fn();
    el.addEventListener('delete-error', onError);
    el.delete(7, { id: 7, name: 'VIP', usage_count: 12 });
    await el.updateComplete;
    confirmElement(el).accept();
    await wait(0);
    await el.updateComplete;

    expect(onError).toHaveBeenCalledTimes(1);
    expect(el.itemToDelete).toBeNull();
  });
});
