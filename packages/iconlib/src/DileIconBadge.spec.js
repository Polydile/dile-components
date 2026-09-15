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

  it('does not cause infinite recursion when connected with variant attribute (regression test)', async () => {
    // This test ensures that setting the variant attribute does not trigger
    // an infinite loop through attributeChangedCallback -> render() -> setAttribute
    const el = document.createElement('dile-icon-badge');
    el.setAttribute('icon', 'lucide.check');
    el.setAttribute('variant', 'success');
    el.textContent = 'Test';

    // Should not throw "RangeError: Maximum call stack size exceeded"
    expect(() => {
      document.body.appendChild(el);
    }).not.toThrow();

    await Promise.resolve();
    expect(el).toBeTruthy();
    expect(el.getAttribute('variant')).toBe('success');
  });

  it('handles dynamic variant attribute changes without recursion', async () => {
    document.body.innerHTML = '<dile-icon-badge icon="lucide.check">Dynamic</dile-icon-badge>';

    const el = document.body.querySelector('dile-icon-badge');
    await Promise.resolve();

    // Dynamically set variant attribute
    expect(() => {
      el.setAttribute('variant', 'error');
    }).not.toThrow();

    await Promise.resolve();
    expect(el.getAttribute('variant')).toBe('error');
    expect(el.shadowRoot.querySelector('.badge-container').classList.contains('variant-error')).toBe(true);

    // Change variant again
    expect(() => {
      el.setAttribute('variant', 'warning');
    }).not.toThrow();

    await Promise.resolve();
    expect(el.getAttribute('variant')).toBe('warning');
    expect(el.shadowRoot.querySelector('.badge-container').classList.contains('variant-warning')).toBe(true);
  });

  it('supports property assignment without recursion (variant and icon)', async () => {
    document.body.innerHTML = '<dile-icon-badge>PropertyTest</dile-icon-badge>';

    const el = document.body.querySelector('dile-icon-badge');
    await Promise.resolve();

    // Assign via property (should reflect to attribute and trigger render)
    expect(() => {
      el.variant = 'success';
    }).not.toThrow();

    await Promise.resolve();
    expect(el.variant).toBe('success');
    expect(el.getAttribute('variant')).toBe('success');
    expect(el.shadowRoot.querySelector('.badge-container').classList.contains('variant-success')).toBe(true);

    // Assign via property again (guard should prevent unnecessary render calls)
    expect(() => {
      el.variant = 'success'; // Same value
    }).not.toThrow();

    await Promise.resolve();
    expect(el.variant).toBe('success');

    // Change icon via property
    expect(() => {
      el.icon = 'material.check-circle';
    }).not.toThrow();

    await Promise.resolve();
    expect(el.icon).toBe('material.check-circle');
    expect(el.getAttribute('icon')).toBe('material.check-circle');
    expect(el.shadowRoot.querySelector('dile-material-icon-check-circle')).toBeTruthy();
  });

  it('does not re-render when setting same property value twice', async () => {
    document.body.innerHTML = '<dile-icon-badge icon="lucide.home">SameValue</dile-icon-badge>';

    const el = document.body.querySelector('dile-icon-badge');
    await Promise.resolve();

    // Set the same value again
    el.variant = 'info';
    await Promise.resolve();
    el.variant = 'info'; // Same value again
    await Promise.resolve();

    // The render should have only been called once (for the first assignment)
    expect(el.variant).toBe('info');
    expect(el.shadowRoot.querySelector('.badge-container').classList.contains('variant-info')).toBe(true);
  });
});
