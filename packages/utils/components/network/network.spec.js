import { describe, it, expect, afterEach } from 'vitest';
import './network.js';

describe('dile-network', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderNetwork(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-network');
    await el.updateComplete;
    return el;
  }

  it('reflects the current navigator.onLine status', async () => {
    const el = await renderNetwork('<dile-network></dile-network>');
    expect(el.onLine).toBe(window.navigator.onLine);
  });

  it('does not render the offline toast when online and showOffLineStatus is unset', async () => {
    const el = await renderNetwork('<dile-network></dile-network>');
    expect(el.shadowRoot.querySelector('#eltoast')).toBeNull();
  });

  it('renders the offline toast when forced offline with showOffLineStatus', async () => {
    const el = await renderNetwork('<dile-network showOffLineStatus></dile-network>');
    el.onLine = false;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('#eltoast')).toBeTruthy();
  });
});
