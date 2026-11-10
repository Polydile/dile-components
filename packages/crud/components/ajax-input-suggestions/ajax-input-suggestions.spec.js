import { describe, expect, it, afterEach, vi } from 'vitest';
import { html, render } from 'lit';
import './ajax-input-suggestions.js';

const PRODUCTS = [
  { uuid: 'a', name: 'Dominio.es' },
  { uuid: 'b', name: 'Alojamiento' },
  { uuid: 'c', name: 'Dominio.com' },
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

async function type(el, text) {
  const input = inputOf(el);
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
}

describe('dile-ajax-input-suggestions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    delete window.axiosInstance;
  });

  it('requests the suggestions to the endpoint with the keyword', async () => {
    const get = vi.fn(() => Promise.resolve({ status: 200, data: { data: { result: { data: [PRODUCTS[1]] } } } }));
    window.axiosInstance = { get };
    const el = await mount(html`
      <dile-ajax-input-suggestions
        delay="0"
        endpoint="/api/products"
        queryStringVariable="keyword"
        pageParamName="per_page"
        maxResults="8"
        .additionalQueryString=${{ type: 'product' }}
        .getSelectResultList=${(r) => r.data.result.data}
      ></dile-ajax-input-suggestions>
    `);

    await type(el, 'aloj');

    await expect.poll(() => optionTexts(el)).toEqual(['Alojamiento']);
    expect(get).toHaveBeenCalledWith('/api/products', { params: { type: 'product', keyword: 'aloj', per_page: 8 } });
  });

  it('reads the list from resultDataProperty', async () => {
    window.axiosInstance = { get: vi.fn(() => Promise.resolve({ status: 200, data: { data: PRODUCTS } })) };
    const el = await mount(html`
      <dile-ajax-input-suggestions delay="0" endpoint="/api/products" resultDataProperty="data"></dile-ajax-input-suggestions>
    `);

    await type(el, 'dom');

    await expect.poll(() => optionTexts(el)).toEqual(['Dominio.es', 'Alojamiento', 'Dominio.com']);
  });

  it('shows no suggestions when the request fails', async () => {
    window.axiosInstance = { get: vi.fn(() => Promise.reject(new Error('500'))) };
    const el = await mount(html`
      <dile-ajax-input-suggestions delay="0" endpoint="/api/products"></dile-ajax-input-suggestions>
    `);

    await type(el, 'aloj');

    await expect.poll(() => el.loading).toBe(false);
    expect(el.data).toEqual([]);
  });
});
