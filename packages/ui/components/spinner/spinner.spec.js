import { describe, it, expect, afterEach } from 'vitest';
import './spinner.js';

describe('dile-spinner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSpinner(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-spinner');
    await el.updateComplete;
    return el;
  }

  it('renders nothing when inactive', async () => {
    const el = await renderSpinner('<dile-spinner></dile-spinner>');
    expect(el.active).toBe(false);
    expect(el.shadowRoot.querySelector('i')).toBeNull();
  });

  it('renders the spinner markup when active', async () => {
    const el = await renderSpinner('<dile-spinner active></dile-spinner>');
    expect(el.shadowRoot.querySelector('i')).toBeTruthy();
  });
});
