import { describe, it, expect } from 'vitest';
import { deepMerge } from './deepMerge.js';

describe('deepMerge', () => {
  it('replaces a null target property with a plain object from source', () => {
    const target = { grid: null };
    const source = { grid: { columns: [{ field: 'id' }] } };

    const result = deepMerge(target, source);

    expect(result.grid).toEqual({ columns: [{ field: 'id' }] });
  });

  it('preserves array order and content when merging a columns array under a previously-null key', () => {
    const columns = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'continent', header: 'Continent' },
    ];

    const result = deepMerge({ grid: null }, { grid: { columns } });

    expect(result.grid.columns).toEqual(columns);
    expect(result.grid.columns).not.toBe(columns);
  });

  it('does not mutate the source when merging into a null target key', () => {
    const source = { grid: { columns: [{ field: 'id' }] } };

    const result = deepMerge({ grid: null }, source);
    result.grid.columns.push({ field: 'extra' });

    expect(source.grid.columns.length).toBe(1);
  });

  it('overwrites configured overwriteProperties instances as-is instead of merging them', () => {
    class Adapter {}
    const targetAdapter = new Adapter();
    const sourceAdapter = new Adapter();

    const result = deepMerge({ responseAdapter: targetAdapter }, { responseAdapter: sourceAdapter });

    expect(result.responseAdapter).toBe(sourceAdapter);
  });
});
