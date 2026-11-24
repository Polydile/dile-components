import { describe, it, expect, afterEach } from 'vitest';
import './wheel-picker.js';

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

describe('dile-wheel-picker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderPicker({ items, value, attrs = '' } = {}) {
    document.body.innerHTML = `<dile-wheel-picker ${attrs}></dile-wheel-picker>`;
    const el = document.body.querySelector('dile-wheel-picker');
    el.items = items ?? ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    if (value !== undefined) {
      el.value = value;
    }
    await el.updateComplete;
    await nextFrame();
    return el;
  }

  function options(el) {
    return [...el.shadowRoot.querySelectorAll('[role="option"]')];
  }

  function keydown(el, key) {
    el.shadowRoot.querySelector('[role="listbox"]').dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
    );
  }

  it('renders one option per item, accepting strings and objects', async () => {
    const el = await renderPicker({
      items: ['One', { value: 2, label: 'Two' }, { value: 3 }],
    });
    expect(options(el).map((o) => o.textContent.trim())).toEqual(['One', 'Two', '3']);
  });

  it('marks the current value as selected and scrolls it to the center', async () => {
    const el = await renderPicker({ value: 'D' });
    const selected = options(el).filter((o) => o.getAttribute('aria-selected') === 'true');
    expect(selected.map((o) => o.textContent.trim())).toEqual(['D']);

    const scroller = el.shadowRoot.querySelector('.scroller');
    const itemHeight = options(el)[0].getBoundingClientRect().height;
    expect(Math.round(scroller.scrollTop)).toBe(Math.round(itemHeight * 3));
  });

  it('changes the value with the keyboard and dispatches events', async () => {
    const el = await renderPicker({ value: 'B', attrs: 'name="letter"' });
    const events = [];
    const formEvents = [];
    el.addEventListener('dile-wheel-picker-changed', (e) => events.push(e.detail));
    el.addEventListener('element-changed', (e) => formEvents.push(e.detail));

    keydown(el, 'ArrowDown');
    expect(el.value).toBe('C');
    keydown(el, 'End');
    expect(el.value).toBe('G');
    keydown(el, 'Home');
    expect(el.value).toBe('A');
    keydown(el, 'ArrowUp');
    expect(el.value).toBe('A');

    expect(events.map((d) => d.value)).toEqual(['C', 'G', 'A']);
    expect(events[0].name).toBe('letter');
    expect(events[0].item.label).toBe('C');
    expect(formEvents.map((d) => d.value)).toEqual(['C', 'G', 'A']);
  });

  it('selects an item when it is clicked', async () => {
    const el = await renderPicker({ value: 'A' });
    let detail;
    el.addEventListener('dile-wheel-picker-changed', (e) => (detail = e.detail));

    options(el)[4].click();
    expect(el.value).toBe('E');
    expect(detail.value).toBe('E');
  });

  it('skips disabled items', async () => {
    const el = await renderPicker({
      items: [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two', disabled: true },
        { value: 3, label: 'Three' },
      ],
      value: 1,
    });

    options(el)[1].click();
    expect(el.value).toBe(1);

    keydown(el, 'ArrowDown');
    expect(el.value).toBe(3);
    expect(options(el)[1].getAttribute('aria-disabled')).toBe('true');
  });

  it('commits the centered item when scrolling ends', async () => {
    const el = await renderPicker({ value: 'A' });
    let detail;
    el.addEventListener('dile-wheel-picker-changed', (e) => (detail = e.detail));

    const scroller = el.shadowRoot.querySelector('.scroller');
    const itemHeight = options(el)[0].getBoundingClientRect().height;
    scroller.scrollTop = itemHeight * 5;
    scroller.dispatchEvent(new Event('scrollend'));

    expect(el.value).toBe('F');
    expect(detail.value).toBe('F');
  });

  it('does not dispatch events when the value is set programmatically', async () => {
    const el = await renderPicker({ value: 'A' });
    let count = 0;
    el.addEventListener('dile-wheel-picker-changed', () => count++);

    el.value = 'C';
    await el.updateComplete;
    expect(options(el)[2].getAttribute('aria-selected')).toBe('true');
    expect(count).toBe(0);
  });

  it('ignores interaction while disabled', async () => {
    const el = await renderPicker({ value: 'A', attrs: 'disabled' });
    keydown(el, 'ArrowDown');
    options(el)[3].click();
    expect(el.value).toBe('A');
    expect(el.shadowRoot.querySelector('[role="listbox"]').getAttribute('tabindex')).toBe('-1');
  });
});
