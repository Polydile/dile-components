import { describe, it, expect, afterEach } from 'vitest';
import './tooltip.js';

describe('dile-tooltip', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderTooltip(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-tooltip');
    await el.updateComplete;
    return el;
  }

  it('renders the tooltip text hidden by default', async () => {
    const el = await renderTooltip('<dile-tooltip tooltip="Hello there">Trigger</dile-tooltip>');
    const tooltipText = el.shadowRoot.querySelector('.tooltiptext');

    expect(tooltipText).toBeTruthy();
    expect(tooltipText.textContent.trim()).toBe('Hello there');
    expect(tooltipText.classList.contains('show')).toBe(false);
  });

  it('shows the tooltip on mouseover', async () => {
    const el = await renderTooltip('<dile-tooltip tooltip="Hello there">Trigger</dile-tooltip>');
    el.doMouseover();
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.tooltiptext').classList.contains('show')).toBe(true);
  });
});
