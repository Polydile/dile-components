import { describe, it, expect, afterEach } from 'vitest';
import './form-group.js';

const nextFrames = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

describe('dile-form-group', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderGroup(markup) {
    document.body.innerHTML = markup;
    const el = document.body.querySelector('dile-form-group');
    await el.updateComplete;
    await nextFrames();
    await el.updateComplete;
    return el;
  }

  function columnCount(el, selector = '.grid') {
    const template = getComputedStyle(el.shadowRoot.querySelector(selector)).gridTemplateColumns;
    return template.split(' ').length;
  }

  it('renders label and description linked to the group', async () => {
    const el = await renderGroup('<dile-form-group label="Personal data" description="Help text"><input></dile-form-group>');
    const group = el.shadowRoot.querySelector('[role="group"]');
    expect(el.shadowRoot.querySelector('#label').textContent.trim()).toBe('Personal data');
    expect(el.shadowRoot.querySelector('#description').textContent.trim()).toBe('Help text');
    expect(group.getAttribute('aria-labelledby')).toBe('label');
    expect(group.getAttribute('aria-describedby')).toBe('description');
  });

  it('hides the header when there is no label or description', async () => {
    const el = await renderGroup('<dile-form-group><input></dile-form-group>');
    expect(el.shadowRoot.querySelector('header').hidden).toBe(true);
    expect(el.shadowRoot.querySelector('[role="group"]').hasAttribute('aria-labelledby')).toBe(false);
  });

  it('exposes the label as a heading when label-level is set', async () => {
    const el = await renderGroup('<dile-form-group label="Title" label-level="3"></dile-form-group>');
    const label = el.shadowRoot.querySelector('#label');
    expect(label.getAttribute('role')).toBe('heading');
    expect(label.getAttribute('aria-level')).toBe('3');
  });

  it('accepts a custom label through the label slot', async () => {
    const el = await renderGroup('<dile-form-group><h3 slot="label">Custom</h3></dile-form-group>');
    expect(el.shadowRoot.querySelector('header').hidden).toBe(false);
    expect(el.shadowRoot.querySelector('slot[name="label"]').assignedElements()[0].textContent).toBe('Custom');
  });

  it('lays out the default slot in the requested number of columns', async () => {
    const el = await renderGroup('<div style="width: 900px"><dile-form-group columns="3"><input><input><input></dile-form-group></div>');
    expect(el.collapsed).toBe(false);
    expect(columnCount(el)).toBe(3);
  });

  it('collapses to one column below the breakpoint', async () => {
    const el = await renderGroup('<div style="width: 400px"><dile-form-group columns="2" breakpoint="500"><input><input></dile-form-group></div>');
    expect(el.collapsed).toBe(true);
    expect(el.hasAttribute('collapsed')).toBe(true);
    expect(columnCount(el)).toBe(1);

    el.breakpoint = 300;
    await el.updateComplete;
    await el.updateComplete;
    expect(el.collapsed).toBe(false);
    expect(columnCount(el)).toBe(2);
  });

  it('makes data-span="full" items take the whole row', async () => {
    const el = await renderGroup('<div style="width: 900px"><dile-form-group columns="3"><input><textarea data-span="full"></textarea></dile-form-group></div>');
    const textarea = el.querySelector('textarea');
    expect(getComputedStyle(textarea).gridColumnStart).toBe('1');
    expect(getComputedStyle(textarea).gridColumnEnd).toBe('-1');
  });

  it('shows the split layout only when left or right slots have content', async () => {
    let el = await renderGroup('<dile-form-group><input></dile-form-group>');
    expect(getComputedStyle(el.shadowRoot.querySelector('.split')).display).toBe('none');

    el = await renderGroup('<div style="width: 900px"><dile-form-group><input slot="left"><input slot="right"></dile-form-group></div>');
    expect(getComputedStyle(el.shadowRoot.querySelector('.split')).display).toBe('grid');
    expect(columnCount(el, '.split')).toBe(2);
  });
});
