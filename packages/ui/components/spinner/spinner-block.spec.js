import { describe, it, expect, afterEach } from 'vitest';
import './spinner-block.js';

describe('dile-spinner-block', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders an active dile-spinner inside the loading section', async () => {
    document.body.innerHTML = '<dile-spinner-block></dile-spinner-block>';
    const el = document.body.querySelector('dile-spinner-block');
    await el.updateComplete;

    const section = el.shadowRoot.querySelector('section.loading');
    expect(section).toBeTruthy();

    const spinner = section.querySelector('dile-spinner');
    expect(spinner).toBeTruthy();
    expect(spinner.hasAttribute('active')).toBe(true);
  });
});
