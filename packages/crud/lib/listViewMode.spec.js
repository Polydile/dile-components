import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import { CrudConfigBuilder } from './CrudConfigBuilder.js';
import { hasGridView, hasItemView, canSwitchListView } from './listViewMode.js';

describe('listViewMode', () => {
  it('detects a grid view from templates.grid', () => {
    const config = new CrudConfigBuilder('https://example.test/api', {
      templates: { grid: () => html`` },
    }).getConfig();

    expect(hasGridView(config)).toBe(true);
  });

  it('detects a grid view from grid.columns', () => {
    const config = new CrudConfigBuilder('https://example.test/api', {
      grid: { columns: [{ field: 'id', header: 'ID' }] },
    }).getConfig();

    expect(hasGridView(config)).toBe(true);
  });

  it('reports no grid view when neither is configured', () => {
    const config = new CrudConfigBuilder('https://example.test/api', {
      templates: { item: () => html`` },
    }).getConfig();

    expect(hasGridView(config)).toBe(false);
  });

  it('detects an item view only when templates.item was explicitly configured', () => {
    const withItem = new CrudConfigBuilder('https://example.test/api', {
      templates: { item: () => html`` },
    }).getConfig();
    const withoutItem = new CrudConfigBuilder('https://example.test/api', {
      grid: { columns: [{ field: 'id', header: 'ID' }] },
    }).getConfig();

    expect(hasItemView(withItem)).toBe(true);
    expect(hasItemView(withoutItem)).toBe(false);
  });

  it('allows switching only when both views are configured and the switch is not disabled', () => {
    const both = new CrudConfigBuilder('https://example.test/api', {
      grid: { columns: [{ field: 'id', header: 'ID' }] },
      templates: { item: () => html`` },
    }).getConfig();

    expect(canSwitchListView(both)).toBe(true);
  });

  it('disallows switching when customization.disableListWiewSwitch is true', () => {
    const config = new CrudConfigBuilder('https://example.test/api', {
      grid: { columns: [{ field: 'id', header: 'ID' }] },
      templates: { item: () => html`` },
      customization: { disableListWiewSwitch: true },
    }).getConfig();

    expect(canSwitchListView(config)).toBe(false);
  });

  it('disallows switching when only one view is configured', () => {
    const gridOnly = new CrudConfigBuilder('https://example.test/api', {
      grid: { columns: [{ field: 'id', header: 'ID' }] },
    }).getConfig();
    const itemOnly = new CrudConfigBuilder('https://example.test/api', {
      templates: { item: () => html`` },
    }).getConfig();

    expect(canSwitchListView(gridOnly)).toBe(false);
    expect(canSwitchListView(itemOnly)).toBe(false);
  });
});
