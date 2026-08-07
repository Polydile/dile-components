import { describe, it, expect, afterEach } from 'vitest';
import './chip-tooltip.js';

describe('dile-chip-tooltip', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderChipTooltip(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-chip-tooltip');
    await el.updateComplete;
    return el;
  }

  it('renders the label inside a dile-tooltip with the message', async () => {
    const el = await renderChipTooltip('<dile-chip-tooltip label="Info" message="More info here"></dile-chip-tooltip>');
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');

    expect(tooltip).toBeTruthy();
    expect(tooltip.getAttribute('tooltip')).toBe('More info here');
    expect(el.shadowRoot.querySelector('.label').textContent.trim()).toBe('Info');
  });

  it('defaults the position to bottom', async () => {
    const el = await renderChipTooltip('<dile-chip-tooltip message="Info"></dile-chip-tooltip>');
    expect(el.position).toBe('bottom');
  });
});
