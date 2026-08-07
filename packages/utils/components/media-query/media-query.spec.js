import { describe, it, expect, afterEach } from 'vitest';
import './media-query.js';

describe('dile-media-query', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderMediaQuery(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-media-query');
    await el.updateComplete;
    return el;
  }

  it('renders without throwing and creates a matcher for the query', async () => {
    const el = await renderMediaQuery('<dile-media-query query="(min-width: 10px)"></dile-media-query>');
    await el.updateComplete;
    expect(el.matcher).toBeInstanceOf(MediaQueryList);
    expect(el._match).toBe(true);
  });

  it('dispatches dile-media-query-changed when the match state is set', async () => {
    const el = await renderMediaQuery('<dile-media-query query="(min-width: 10px)"></dile-media-query>');
    let detail = null;
    el.addEventListener('dile-media-query-changed', (e) => { detail = e.detail; });

    el.query = '(max-width: 5px)';
    await el.updateComplete;
    await el.updateComplete;

    expect(detail).toEqual({ value: false });
  });
});
