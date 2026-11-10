import { describe, expect, it, afterEach, vi } from 'vitest';
import { html, render } from 'lit';
import './ajax-input-tags.js';

const SUGGESTIONS = [
  { uuid: 'a', name: 'Madrid' },
  { uuid: 'b', name: 'Málaga' },
];

async function mount(template) {
  const container = document.createElement('div');
  document.body.append(container);
  render(template, container);
  const element = container.firstElementChild;
  await element.updateComplete;
  return element;
}

const inputOf = (el) => el.shadowRoot.getElementById('input');
const optionTexts = (el) => [...el.shadowRoot.querySelectorAll('option')].map((o) => o.textContent);
const key = (el, k) => inputOf(el).dispatchEvent(
  new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true, cancelable: true }),
);

async function type(el, text) {
  const input = inputOf(el);
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
}

describe('dile-ajax-input-tags', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  it('requests the suggestions to the endpoint and adds the chosen one', async () => {
    const get = vi.fn(() => Promise.resolve({ status: 200, data: { data: SUGGESTIONS } }));
    window.axiosInstance = { get };
    const el = await mount(html`
      <dile-ajax-input-tags
        name="tags"
        delay="0"
        endpoint="/api/tags"
        queryStringVariable="keyword"
        resultDataProperty="data"
        .additionalQueryString=${{ type: 'customer' }}
        .tags=${[SUGGESTIONS[1]]}
      ></dile-ajax-input-tags>
    `);
    const added = [];
    el.addEventListener('dile-input-tags-add', (e) => added.push(e.detail));

    await type(el, 'ma');
    await expect.poll(() => optionTexts(el)).toEqual(['Madrid']);
    expect(get).toHaveBeenCalledWith('/api/tags', { params: { type: 'customer', keyword: 'ma' } });

    key(el, 'ArrowDown');
    key(el, 'Enter');
    await expect.poll(() => added).toEqual([{ name: 'tags', text: 'Madrid', item: SUGGESTIONS[0] }]);
  });
});
