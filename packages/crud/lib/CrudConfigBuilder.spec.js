import { describe, it, expect } from 'vitest';
import { CrudConfigBuilder } from './CrudConfigBuilder.js';

describe('CrudConfigBuilder', () => {
  it('merges customConfig.grid.columns over the default null grid', () => {
    const columns = [{ field: 'id', header: 'ID' }];

    const config = new CrudConfigBuilder('https://example.test/api/items', {
      grid: { columns },
    }).getConfig();

    expect(config.grid.columns).toEqual(columns);
  });

  it('sets the endpoint from the constructor argument', () => {
    const config = new CrudConfigBuilder('https://example.test/api/items', {}).getConfig();

    expect(config.endpoint).toBe('https://example.test/api/items');
  });

  it('getConfig(endpoint) returns a copy with an overridden endpoint without mutating the original config', () => {
    const builder = new CrudConfigBuilder('https://example.test/api/items', {
      grid: { columns: [{ field: 'id' }] },
    });

    const relatedConfig = builder.getConfig('https://example.test/api/items/1/related');

    expect(relatedConfig.endpoint).toBe('https://example.test/api/items/1/related');
    expect(builder.getConfig().endpoint).toBe('https://example.test/api/items');
    expect(relatedConfig.grid.columns).toEqual([{ field: 'id' }]);
  });
});
