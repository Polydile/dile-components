import { describe, it, expect, afterEach, vi } from 'vitest';
import './many-relation.js';
import './many-relation-overlay.js';

const VARIANTS = [
  { tag: 'dile-many-relation', selectTag: 'dile-ajax-select-crud' },
  { tag: 'dile-many-relation-overlay', selectTag: 'dile-ajax-select-crud-overlay' },
];

describe.each(VARIANTS)('$tag (select: $selectTag)', ({ tag, selectTag }) => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  function mockAxios({ get = vi.fn(), post = vi.fn(), delete: del = vi.fn() } = {}) {
    window.axiosInstance = { get, post, delete: del };
    return window.axiosInstance;
  }

  async function renderManyRelation(attrs = '') {
    document.body.innerHTML = `
      <${tag}
        endpointGet="/api/tags"
        endpointList="/api/board-games/1/tags"
        endpointAdd="/api/board-games/1/tags"
        endpointRemove="/api/board-games/1/tags"
        idProperty="id"
        displayProperty="name"
        ${attrs}
      ></${tag}>
    `;
    const el = document.body.querySelector(tag);
    await el.updateComplete;
    return el;
  }

  function select(el) {
    return el.shadowRoot.getElementById('theselect');
  }

  it(`renders a ${selectTag} as the select control`, async () => {
    mockAxios({ get: vi.fn(() => Promise.resolve({ status: 200, data: [] })) });
    const el = await renderManyRelation();

    const theselect = select(el);
    expect(theselect).toBeTruthy();
    expect(theselect.tagName.toLowerCase()).toBe(selectTag);
  });

  it('loads the related items list from endpointList on connect', async () => {
    const get = vi.fn(() =>
      Promise.resolve({ status: 200, data: { data: [{ id: 1, name: 'Strategy' }] } })
    );
    mockAxios({ get });
    const el = await renderManyRelation('loadFromEndpoint');
    await vi.waitFor(() => expect(el._items).toEqual([{ id: 1, name: 'Strategy' }]));

    expect(get).toHaveBeenCalledWith('/api/board-games/1/tags', { params: undefined });
  });

  it('adds the item selected through the select control', async () => {
    const post = vi.fn(() => Promise.resolve({ status: 201, data: {} }));
    const get = vi.fn(() => Promise.resolve({ status: 200, data: { data: [] } }));
    mockAxios({ post, get });
    const el = await renderManyRelation();

    select(el).dispatchEvent(
      new CustomEvent('element-changed', { detail: { value: '5' } })
    );
    await el.updateComplete;
    expect(el._selectedId).toBe('5');

    el.shadowRoot.querySelector('button.add-btn').click();
    // adding successfully triggers a list auto-refresh; wait it out before mocks are torn down
    await vi.waitFor(() => expect(get).toHaveBeenCalled());

    expect(post).toHaveBeenCalledWith('/api/board-games/1/tags', { id: '5' }, undefined);
  });

  it('removes an item and dispatches many-relation-remove-success', async () => {
    const del = vi.fn(() => Promise.resolve({ status: 200, data: {} }));
    const get = vi.fn(() => Promise.resolve({ status: 200, data: { data: [] } }));
    mockAxios({ get, delete: del });
    const el = await renderManyRelation();
    el.relatedItems = [{ id: 9, name: 'Party' }];

    const removeListener = vi.fn();
    el.addEventListener('many-relation-remove-success', removeListener);

    await vi.waitFor(() =>
      expect(el.shadowRoot.querySelector('button.remove-btn')).toBeTruthy()
    );
    el.shadowRoot.querySelector('button.remove-btn').click();
    await vi.waitFor(() => expect(removeListener).toHaveBeenCalled());
    // wait out the list auto-refresh triggered by the removal before mocks are torn down
    await vi.waitFor(() => expect(get).toHaveBeenCalled());

    expect(del).toHaveBeenCalledWith('/api/board-games/1/tags/9', {}, undefined);
  });
});
