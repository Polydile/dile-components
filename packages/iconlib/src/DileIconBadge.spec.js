import { afterEach, describe, expect, it } from 'vitest';
import './DileIconBadge.js';

describe('dile-icon-badge', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a family-specific icon from the generic family.name value', async () => {
    document.body.innerHTML = '<dile-icon-badge icon="lucide.house" variant="success">Ready</dile-icon-badge>';

    const el = document.body.querySelector('dile-icon-badge');
    await Promise.resolve();

    expect(el).toBeTruthy();
    expect(el.shadowRoot.querySelector('dile-lucide-icon-house')).toBeTruthy();
    expect(el.textContent.trim()).toContain('Ready');
    expect(el.shadowRoot.querySelector('.badge-container').classList.contains('variant-success')).toBe(true);
  });
});
