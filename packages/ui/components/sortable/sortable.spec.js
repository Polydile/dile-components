import { describe, expect, it, afterEach } from 'vitest';
import { html, render } from 'lit';
import './sortable.js';
import { moveItem } from './index.js';

async function mount(template) {
  const container = document.createElement('div');
  document.body.append(container);
  render(template, container);
  const element = container.firstElementChild;
  await element.updateComplete;
  return element;
}

const template = html`
  <dile-sortable>
    <div style="height: 40px"><span data-sortable-handle tabindex="0">≡</span> A</div>
    <div style="height: 40px"><span data-sortable-handle tabindex="0">≡</span> B</div>
    <div style="height: 40px"><span data-sortable-handle tabindex="0">≡</span> C</div>
    <div style="height: 40px">D without handle</div>
  </dile-sortable>
`;

const listen = (el) => {
  const events = [];
  el.addEventListener('dile-sortable-change', (e) => events.push(e.detail));
  return events;
};

const pointer = (target, type, clientY) => {
  target.dispatchEvent(new PointerEvent(type, {
    bubbles: true,
    composed: true,
    pointerId: 1,
    isPrimary: true,
    button: 0,
    clientY,
  }));
};

const handleOf = (el, index) => el.children[index].querySelector('[data-sortable-handle]');
const centerOf = (el, index) => {
  const rect = el.children[index].getBoundingClientRect();
  return rect.top + rect.height / 2;
};

describe('dile-sortable', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('emits from/to when dragging an item by its handle', async () => {
    const el = await mount(template);
    const events = listen(el);
    const start = centerOf(el, 0);

    pointer(handleOf(el, 0), 'pointerdown', start);
    pointer(el, 'pointermove', start + 90);
    pointer(el, 'pointerup', start + 90);

    expect(events).toEqual([{ from: 0, to: 2 }]);
  });

  it('emits the upward movement', async () => {
    const el = await mount(template);
    const events = listen(el);
    const start = centerOf(el, 2);

    pointer(handleOf(el, 2), 'pointerdown', start);
    pointer(el, 'pointermove', start - 50);
    pointer(el, 'pointerup', start - 50);

    expect(events).toEqual([{ from: 2, to: 1 }]);
  });

  it('emits nothing when dropped at the same position', async () => {
    const el = await mount(template);
    const events = listen(el);
    const start = centerOf(el, 1);

    pointer(handleOf(el, 1), 'pointerdown', start);
    pointer(el, 'pointermove', start + 5);
    pointer(el, 'pointerup', start + 5);

    expect(events).toEqual([]);
    expect(el.children[1].style.transform).toBe('');
  });

  it('ignores drags that do not start on a handle', async () => {
    const el = await mount(template);
    const events = listen(el);
    const start = centerOf(el, 3);

    pointer(el.children[3], 'pointerdown', start);
    pointer(el, 'pointermove', start - 90);
    pointer(el, 'pointerup', start - 90);

    expect(events).toEqual([]);
  });

  it('emits nothing when the drag is cancelled', async () => {
    const el = await mount(template);
    const events = listen(el);
    const start = centerOf(el, 0);

    pointer(handleOf(el, 0), 'pointerdown', start);
    pointer(el, 'pointermove', start + 90);
    pointer(el, 'pointercancel', start + 90);

    expect(events).toEqual([]);
  });

  it('moves with Alt+arrows from the handle', async () => {
    const el = await mount(template);
    const events = listen(el);
    const key = (index, k) => handleOf(el, index).dispatchEvent(
      new KeyboardEvent('keydown', { key: k, altKey: true, bubbles: true, composed: true }),
    );

    key(1, 'ArrowDown');
    key(1, 'ArrowUp');
    key(0, 'ArrowUp');

    expect(events).toEqual([{ from: 1, to: 2 }, { from: 1, to: 0 }]);
  });

  it('does nothing when disabled', async () => {
    const el = await mount(template);
    el.disabled = true;
    const events = listen(el);
    handleOf(el, 0).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true, bubbles: true, composed: true }),
    );
    expect(events).toEqual([]);
  });
});

describe('moveItem', () => {
  it('returns a copy with the item moved', () => {
    const original = ['a', 'b', 'c', 'd'];
    expect(moveItem(original, 0, 2)).toEqual(['b', 'c', 'a', 'd']);
    expect(moveItem(original, 3, 1)).toEqual(['a', 'd', 'b', 'c']);
    expect(original).toEqual(['a', 'b', 'c', 'd']);
  });
});
