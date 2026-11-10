import { describe, expect, it, afterEach } from 'vitest';
import { html, render } from 'lit';
import './input-suggestions.js';

async function mount(template) {
  const container = document.createElement('div');
  document.body.append(container);
  render(template, container);
  const element = container.firstElementChild;
  await element.updateComplete;
  return element;
}

const PRODUCTS = [
  { uuid: 'a', name: 'Dominio.es' },
  { uuid: 'b', name: 'Alojamiento' },
  { uuid: 'c', name: 'Dominio.com' },
];

const inputOf = (el) => el.shadowRoot.getElementById('input');

async function type(el, text) {
  const input = inputOf(el);
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
}

const key = (el, k) => inputOf(el).dispatchEvent(
  new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true, cancelable: true }),
);

const optionTexts = (el) => [...el.shadowRoot.querySelectorAll('option')].map((o) => o.textContent);

const mountSimple = () => mount(html`
  <dile-input-suggestions name="name" delay="0" .suggestions=${PRODUCTS}></dile-input-suggestions>
`);

describe('dile-input-suggestions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not request suggestions below minLength', async () => {
    const el = await mountSimple();
    await type(el, 'd');
    expect(el.data).toEqual([]);
  });

  it('filters the suggestions ignoring case and accents', async () => {
    const el = await mountSimple();
    await type(el, 'DOMÍ');
    await expect.poll(() => optionTexts(el)).toEqual(['Dominio.es', 'Dominio.com']);
    await expect.poll(() => el.opened).toBe(true);
  });

  it('uses getOptionText for the list text', async () => {
    const el = await mount(html`
      <dile-input-suggestions
        delay="0"
        .suggestions=${PRODUCTS}
        .getOptionText=${(item) => `${item.name} (${item.uuid})`}
      ></dile-input-suggestions>
    `);
    await type(el, 'aloj');
    await expect.poll(() => optionTexts(el)).toEqual(['Alojamiento (b)']);
  });

  it('chooses the suggestion with arrow down and Enter', async () => {
    const el = await mountSimple();
    const selected = [];
    el.addEventListener('dile-input-suggestions-selected', (e) => selected.push(e.detail));
    await type(el, 'dom');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'ArrowDown');
    key(el, 'ArrowDown');
    key(el, 'Enter');

    await expect.poll(() => selected).toEqual([{ name: 'name', item: PRODUCTS[2] }]);
    expect(el.value).toBe('Dominio.com');
    expect(inputOf(el).value).toBe('Dominio.com');
    expect(el.opened).toBe(false);
  });

  it('allows choosing the same suggestion again', async () => {
    const el = await mountSimple();
    const selected = [];
    el.addEventListener('dile-input-suggestions-selected', (e) => selected.push(e.detail.item.uuid));

    for (let i = 1; i <= 2; i++) {
      await type(el, 'aloj');
      await expect.poll(() => el.opened).toBe(true);
      key(el, 'ArrowDown');
      key(el, 'Enter');
      await expect.poll(() => selected.length).toBe(i);
    }

    expect(selected).toEqual(['b', 'b']);
  });

  it('keeps the free text when pressing Enter with no highlighted suggestion', async () => {
    const el = await mountSimple();
    const selected = [];
    el.addEventListener('dile-input-suggestions-selected', (e) => selected.push(e.detail));
    await type(el, 'dom');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'Enter');
    await el.updateComplete;

    expect(selected).toEqual([]);
    expect(el.value).toBe('dom');
    expect(el.opened).toBe(false);
  });

  it('closes the list with Escape without touching the text', async () => {
    const el = await mountSimple();
    await type(el, 'dom');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'Escape');
    await el.updateComplete;

    expect(el.opened).toBe(false);
    expect(el.value).toBe('dom');
  });

  it('emits element-changed with the typed text', async () => {
    const el = await mountSimple();
    const changes = [];
    el.addEventListener('element-changed', (e) => changes.push(e.detail));
    await type(el, 'Texto libre');
    expect(changes.at(-1)).toEqual({ name: 'name', value: 'Texto libre' });
  });

  it('does not let the inner select element-changed events out', async () => {
    const el = await mountSimple();
    const names = [];
    el.addEventListener('element-changed', (e) => names.push(e.detail.name));
    await type(el, 'aloj');
    await expect.poll(() => el.opened).toBe(true);
    key(el, 'ArrowDown');
    key(el, 'Enter');
    await el.updateComplete;
    expect(names.every((name) => name === 'name')).toBe(true);
  });
  it('closes the list when choosing even if it has not finished opening', async () => {
    const el = await mountSimple();
    await type(el, 'aloj');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'ArrowDown');
    key(el, 'Enter');
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(el.opened).toBe(false);
    expect(el.value).toBe('Alojamiento');
  });

  it('renders the suggestions with optionRenderer and keeps the text as accessible name', async () => {
    const el = await mount(html`
      <dile-input-suggestions
        delay="0"
        .suggestions=${PRODUCTS}
        .getOptionText=${(item) => `${item.name} (${item.uuid})`}
        .optionRenderer=${(item) => html`<strong part="option-name">${item.name}</strong> <small>${item.uuid}</small>`}
        optionParts="option-name"
      ></dile-input-suggestions>
    `);
    await type(el, 'aloj');
    await expect.poll(() => el.opened).toBe(true);
    await el.select.updateComplete;

    const option = el.select.shadowRoot.querySelector('li[role="option"]');
    expect(option.querySelector('strong').textContent).toBe('Alojamiento');
    expect(option.getAttribute('aria-label')).toBe('Alojamiento (b)');
    expect(el.select.getAttribute('exportparts')).toContain('option-name');
  });

  it('chooses with the keyboard a suggestion rendered with optionRenderer', async () => {
    const el = await mount(html`
      <dile-input-suggestions
        delay="0"
        .suggestions=${PRODUCTS}
        .optionRenderer=${(item) => html`<b>${item.name}</b>`}
      ></dile-input-suggestions>
    `);
    const selected = [];
    el.addEventListener('dile-input-suggestions-selected', (e) => selected.push(e.detail.item.uuid));
    await type(el, 'dom');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'ArrowDown');
    key(el, 'ArrowDown');
    key(el, 'Enter');

    await expect.poll(() => selected).toEqual(['c']);
  });

  it('gives an accessible name to the list without a visible label', async () => {
    const el = await mount(html`
      <dile-input-suggestions accessibleLabel="Concept" .suggestions=${PRODUCTS}></dile-input-suggestions>
    `);
    await el.select.updateComplete;
    expect(inputOf(el).getAttribute('aria-label')).toBe('Concept');
    expect(el.select.shadowRoot.querySelector('[role="listbox"]').getAttribute('aria-label')).toBe('Concept');
  });
});
