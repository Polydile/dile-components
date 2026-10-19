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

  it('releases the background layer immediately when the animation duration is 0s', async () => {
    const el = await renderModal('<dile-modal style="--dile-modal-animation-duration: 0s">Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    el.close();
    await el.updateComplete;

    const section = el.shadowRoot.querySelector('section');
    expect(getComputedStyle(section).display).toBe('none');
  });

  it('releases the background layer after the close animation even without transitionend', async () => {
    const el = await renderModal('<dile-modal style="--dile-modal-animation-duration: 0.1s">Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    el.close();
    await el.updateComplete;
    const section = el.shadowRoot.querySelector('section');
    expect(getComputedStyle(section).pointerEvents).toBe('none');

    await new Promise((resolve) => setTimeout(resolve, 250));
    await el.updateComplete;
    expect(getComputedStyle(section).display).toBe('none');
  });

  it('ignores transitionend events coming from inner elements', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.open();
    await el.updateComplete;
    el.close();
    await el.updateComplete;

    const section = el.shadowRoot.querySelector('section');
    const content = el.shadowRoot.querySelector('.content');
    content.dispatchEvent(new TransitionEvent('transitionend', { bubbles: true, propertyName: 'opacity' }));
    await el.updateComplete;

    expect(section.classList.contains('opened')).toBe(true);
  });

  it('dispatches dile-modal-closed and animates when the opened property is set to false', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.opened = true;
    await el.updateComplete;

    let closed = false;
    el.addEventListener('dile-modal-closed', () => { closed = true; });

    el.opened = false;
    await el.updateComplete;

    expect(closed).toBe(true);
    expect(el.shadowRoot.querySelector('section').classList.contains('opened')).toBe(true);
  });

  it('opens and closes through the opened attribute', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    let closed = false;
    el.addEventListener('dile-modal-closed', () => { closed = true; });

    el.setAttribute('opened', '');
    await el.updateComplete;
    expect(el.opened).toBe(true);

    el.removeAttribute('opened');
    await el.updateComplete;
    expect(el.opened).toBe(false);
    expect(closed).toBe(true);
  });

  it('reflects the opened property to the attribute', async () => {
    const el = await renderModal('<dile-modal opened>Modal content</dile-modal>');
    el.close();
    await el.updateComplete;
    expect(el.hasAttribute('opened')).toBe(false);

    el.setAttribute('opened', '');
    await el.updateComplete;
    expect(el.opened).toBe(true);
  });

  it('closes a blocking modal when Esc is pressed', async () => {
    const el = await renderModal('<dile-modal blocking>Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;

    expect(el.opened).toBe(false);
  });

  it('closes only the topmost modal when Esc is pressed', async () => {
    document.body.innerHTML = '<dile-modal id="first">First</dile-modal><dile-modal id="second">Second</dile-modal>';
    const first = document.getElementById('first');
    const second = document.getElementById('second');
    await first.updateComplete;
    await second.updateComplete;
    first.open();
    second.open();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(second.opened).toBe(false);
    expect(first.opened).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(first.opened).toBe(false);
  });

  it('exposes the content as an accessible modal dialog', async () => {
    const el = await renderModal('<dile-modal label="Settings">Modal content</dile-modal>');
    const dialog = el.shadowRoot.querySelector('[role="dialog"]');

    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-label')).toBe('Settings');
  });

  it('renders the close icon as an accessible button', async () => {
    const el = await renderModal('<dile-modal showCloseIcon closeLabel="Cerrar">Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    const button = el.shadowRoot.querySelector('button.closebutton');
    expect(button.getAttribute('aria-label')).toBe('Cerrar');

    button.click();
    expect(el.opened).toBe(false);
  });

  it('moves the focus into the modal and restores it on close', async () => {
    document.body.innerHTML = '<button id="opener">Open</button><dile-modal>Modal content</dile-modal>';
    const opener = document.getElementById('opener');
    const el = document.querySelector('dile-modal');
    await el.updateComplete;

    opener.focus();
    el.open();
    await el.updateComplete;
    expect(el.shadowRoot.activeElement).toBe(el.shadowRoot.querySelector('.content'));

    el.close();
    expect(document.activeElement).toBe(opener);
  });

  it('keeps the focus on content focused by the user when opening', async () => {
    const el = await renderModal('<dile-modal><input id="field"></dile-modal>');
    const field = document.getElementById('field');

    el.open();
    await el.updateComplete;
    field.focus();
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(document.activeElement).toBe(field);
  });

  it('dispatches dile-modal-opened when opened', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    let opened = false;
    el.addEventListener('dile-modal-opened', () => { opened = true; });

    el.open();
    expect(opened).toBe(true);
  });

  it('becomes opaque after opening', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.open();
    await el.updateComplete;

    const section = el.shadowRoot.querySelector('section');
    await expect.poll(() => section.classList.contains('opaque')).toBe(true);
  });

  it('locks the page scroll while any modal is opened', async () => {
    document.body.innerHTML = '<dile-modal id="first">First</dile-modal><dile-modal id="second">Second</dile-modal>';
    const first = document.getElementById('first');
    const second = document.getElementById('second');
    await second.updateComplete;
    const root = document.documentElement;

    first.open();
    second.open();
    expect(root.style.overflow).toBe('hidden');

    second.close();
    expect(root.style.overflow).toBe('hidden');

    first.close();
    expect(root.style.overflow).toBe('');
  });

  it('unlocks the page scroll when an opened modal is removed from the document', async () => {
    const el = await renderModal('<dile-modal>Modal content</dile-modal>');
    el.open();
    expect(document.documentElement.style.overflow).toBe('hidden');

    el.remove();
    expect(document.documentElement.style.overflow).toBe('');
  });
});
