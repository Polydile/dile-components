import { describe, it, expect, afterEach } from 'vitest';
import './web-visor.js';

describe('dile-web-visor', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderWebVisor(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-web-visor');
    await el.updateComplete;
    return el;
  }

  it('renders an iframe pointing at the url', async () => {
    const el = await renderWebVisor('<dile-web-visor url="https://example.com" title="Example"></dile-web-visor>');
    const iframe = el.shadowRoot.querySelector('iframe');

    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toBe('https://example.com');
  });

  it('increases zoom when zoom in is clicked', async () => {
    const el = await renderWebVisor('<dile-web-visor url="https://example.com"></dile-web-visor>');
    const zoomInButton = el.shadowRoot.querySelectorAll('.controls dile-button')[1];
    zoomInButton.click();
    await el.updateComplete;

    expect(el._zoom).toBeCloseTo(1.1);
  });
});
