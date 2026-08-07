import { describe, it, expect, afterEach } from 'vitest';
import './star.js';

describe('dile-star', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderStar(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-star');
    await el.updateComplete;
    return el;
  }

  it('renders an inner dile-icon', async () => {
    const el = await renderStar('<dile-star value="1" index="0"></dile-star>');
    expect(el.shadowRoot.querySelector('dile-icon')).toBeTruthy();
  });

  it('dispatches dile-star-selected with the index on click', async () => {
    const el = await renderStar('<dile-star value="1" index="2"></dile-star>');
    let detail = null;
    el.addEventListener('dile-star-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelector('dile-icon').dispatchEvent(new Event('click'));

    expect(detail).toEqual({ index: 2 });
  });
});
