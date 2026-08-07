import { describe, it, expect, afterEach } from 'vitest';
import './info-box.js';

describe('dile-info-box', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInfoBox(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-info-box');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content and a default info icon', async () => {
    const el = await renderInfoBox('<dile-info-box>Some info</dile-info-box>');
    expect(el.textContent.trim()).toBe('Some info');
    expect(el.shadowRoot.querySelector('.info dile-icon, .info svg')).toBeTruthy();
  });

  it('renders the title when set', async () => {
    const el = await renderInfoBox('<dile-info-box title="Heads up">Some info</dile-info-box>');
    const title = el.shadowRoot.querySelector('.title');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('Heads up');
  });

  it('shows the close button only when showCloseButton is set', async () => {
    const el = await renderInfoBox('<dile-info-box>Some info</dile-info-box>');
    expect(el.shadowRoot.querySelector('.close')).toBeNull();

    el.showCloseButton = true;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('.close button')).toBeTruthy();
  });
});
