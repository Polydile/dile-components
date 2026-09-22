import { describe, it, expect, afterEach } from 'vitest';
import './order-switch.js';

describe('dile-order-switch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderOrderSwitch(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-order-switch');
    await el.updateComplete;
    return el;
  }

  it('defaults to ascending order', async () => {
    const el = await renderOrderSwitch('<dile-order-switch label="Name"></dile-order-switch>');

    expect(el.value).toBe('asc');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
    expect(el.shadowRoot.querySelector('span').textContent.trim()).toBe('Name');
  });

  it('toggles between asc and desc', async () => {
    const el = await renderOrderSwitch('<dile-order-switch></dile-order-switch>');
    el.toggle();
    await el.updateComplete;

    expect(el.value).toBe('desc');
  });

  it('clicking the label re-announces the current value without toggling when not selected', async () => {
    const el = await renderOrderSwitch('<dile-order-switch name="name" label="Name" value="asc"></dile-order-switch>');

    let receivedDetail = null;
    el.addEventListener('element-changed', (e) => { receivedDetail = e.detail; });

    el.shadowRoot.querySelector('span').click();
    await el.updateComplete;

    expect(el.value).toBe('asc'); // unchanged
    expect(receivedDetail).toEqual({ name: 'name', value: 'asc' });
  });

  it('clicking the label toggles the order when selected', async () => {
    const el = await renderOrderSwitch('<dile-order-switch name="name" label="Name" value="asc" selected></dile-order-switch>');

    let receivedDetail = null;
    el.addEventListener('element-changed', (e) => { receivedDetail = e.detail; });

    el.shadowRoot.querySelector('span').click();
    await el.updateComplete;

    expect(el.value).toBe('desc'); // toggled
    expect(receivedDetail).toEqual({ name: 'name', value: 'desc' });
  });
});
