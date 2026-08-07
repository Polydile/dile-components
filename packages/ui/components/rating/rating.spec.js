import { describe, it, expect, afterEach } from 'vitest';
import './rating.js';

describe('dile-rating', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderRating(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-rating');
    await el.updateComplete;
    return el;
  }

  it('renders five dile-star elements', async () => {
    const el = await renderRating('<dile-rating value="3"></dile-rating>');
    expect(el.shadowRoot.querySelectorAll('dile-star').length).toBe(5);
    expect(el.value).toBe(3);
  });

  it('updates value and dispatches dile-rating-selected when a star is selected', async () => {
    const el = await renderRating('<dile-rating value="0"></dile-rating>');
    let detail = null;
    el.addEventListener('dile-rating-selected', (e) => { detail = e.detail; });

    el.shadowRoot.querySelectorAll('dile-star')[2].dispatchEvent(new CustomEvent('dile-star-selected', {
      detail: { index: 2 },
    }));

    expect(el.value).toBe(3);
    expect(detail).toEqual({ value: 3 });
  });
});
