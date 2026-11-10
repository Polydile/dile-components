import { LitElement, html, css } from 'lit';

/**
 * # dile-sortable
 *
 * Container that lets the user reorder its children dragging them with the mouse, a finger or
 * the keyboard.
 *
 * The component does NOT move the DOM. It only previews the movement with transforms and, on
 * drop, emits `dile-sortable-change` with the `from` and `to` indexes. The consumer reorders
 * its data and renders again (in Lit, with `repeat()` and a stable key so the children keep
 * their state). The `moveItem(array, from, to)` helper returns the reordered copy.
 *
 * ## Usage
 *
 * ```html
 * <dile-sortable @dile-sortable-change=${this.reorder}>
 *   ${repeat(items, (i) => i.id, (i) => html`<my-item .item=${i}></my-item>`)}
 * </dile-sortable>
 * ```
 *
 * Each child must contain a handle marked with `data-sortable-handle`. It can live inside the
 * child's shadow DOM: it is found with `composedPath()`. The handle should have
 * `touch-action: none` (so the gesture doesn't scroll on mobile) and `tabindex="0"` (to move
 * it with the keyboard: Alt+↑ / Alt+↓).
 *
 * While dragging, the child gets the `data-sortable-dragging` attribute, useful to style it
 * from the child itself with `:host([data-sortable-dragging])`.
 *
 * ## Properties
 * - `disabled`: disables reordering.
 *
 * ## Events
 * - `dile-sortable-change`: `detail: { from, to }`.
 *
 * ## CSS custom properties
 * - `--dile-sortable-transition-duration` (150ms)
 * - `--dile-sortable-dragging-shadow` (0 6px 16px rgba(0, 0, 0, 0.18))
 * - `--dile-sortable-dragging-background-color` (unset: the background doesn't change)
 */

const AUTOSCROLL_EDGE = 48;
const AUTOSCROLL_SPEED = 12;

export class DileSortable extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    :host([dragging]) {
      cursor: grabbing;
      user-select: none;
      -webkit-user-select: none;
    }
  `;

  static properties = {
    disabled: { type: Boolean },
    dragging: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.disabled = false;
    this.dragging = false;
    this._drag = null;
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._autoScroll = this._autoScroll.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerdown', this._onPointerDown);
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this._onPointerDown);
    this.removeEventListener('keydown', this._onKeyDown);
    this._finishDrag(false);
  }

  render() {
    return html`<slot></slot>`;
  }

  get items() {
    return Array.from(this.children);
  }

  /** Returns the handle and the direct child involved in an event, if any. */
  _resolveTarget(e) {
    const path = e.composedPath();
    const handle = path.find((node) => node instanceof Element && node.hasAttribute('data-sortable-handle'));
    if (!handle) return null;
    const item = path.find((node) => node instanceof Element && node.parentElement === this);
    if (!item) return null;
    return { handle, item };
  }

  _onPointerDown(e) {
    if (this.disabled || this._drag || !e.isPrimary || e.button !== 0) return;
    const target = this._resolveTarget(e);
    if (!target) return;
    e.preventDefault();

    const items = this.items;
    const from = items.indexOf(target.item);
    const rects = items.map((item) => item.getBoundingClientRect());
    const draggedRect = rects[from];
    const gap =
      items.length > 1
        ? Math.max(
            0,
            from > 0 ? draggedRect.top - rects[from - 1].bottom : rects[from + 1].top - draggedRect.bottom,
          )
        : 0;

    this._drag = {
      pointerId: e.pointerId,
      handle: target.handle,
      item: target.item,
      items,
      rects,
      from,
      to: from,
      startY: e.clientY,
      startScrollY: window.scrollY,
      lastClientY: e.clientY,
      shift: draggedRect.height + gap,
      rafId: null,
    };

    this.setPointerCapture(e.pointerId);
    this.addEventListener('pointermove', this._onPointerMove);
    this.addEventListener('pointerup', this._onPointerUp);
    this.addEventListener('pointercancel', this._onPointerUp);

    this.dragging = true;
    const style = getComputedStyle(this);
    const duration = this._transitionDuration(style);
    target.item.setAttribute('data-sortable-dragging', '');
    Object.assign(target.item.style, {
      position: 'relative',
      zIndex: '2',
      transition: 'none',
      boxShadow:
        style.getPropertyValue('--dile-sortable-dragging-shadow').trim() || '0 6px 16px rgba(0, 0, 0, 0.18)',
    });
    const background = style.getPropertyValue('--dile-sortable-dragging-background-color').trim();
    if (background) {
      target.item.style.backgroundColor = background;
    }
    items.forEach((item) => {
      if (item !== target.item) {
        item.style.transition = `transform ${duration}`;
      }
    });
  }

  _transitionDuration(style = getComputedStyle(this)) {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return '0ms';
    }
    return style.getPropertyValue('--dile-sortable-transition-duration').trim() || '150ms';
  }

  _onPointerMove(e) {
    if (!this._drag || e.pointerId !== this._drag.pointerId) return;
    this._drag.lastClientY = e.clientY;
    this._updatePositions();
    this._scheduleAutoScroll();
  }

  _updatePositions() {
    const drag = this._drag;
    const dy = drag.lastClientY - drag.startY + (window.scrollY - drag.startScrollY);
    drag.item.style.transform = `translateY(${dy}px)`;

    const draggedRect = drag.rects[drag.from];
    const center = draggedRect.top + draggedRect.height / 2 + dy;
    // The target position is the number of siblings whose center is above the dragged one.
    const to = drag.rects.filter(
      (rect, index) => index !== drag.from && rect.top + rect.height / 2 < center,
    ).length;
    drag.to = to;

    drag.items.forEach((item, index) => {
      if (index === drag.from) return;
      let offset = 0;
      if (drag.from < to && index > drag.from && index <= to) offset = -drag.shift;
      if (drag.from > to && index < drag.from && index >= to) offset = drag.shift;
      item.style.transform = offset ? `translateY(${offset}px)` : '';
    });
  }

  _scheduleAutoScroll() {
    if (this._drag && this._drag.rafId === null) {
      this._drag.rafId = requestAnimationFrame(this._autoScroll);
    }
  }

  _autoScroll() {
    const drag = this._drag;
    if (!drag) return;
    drag.rafId = null;
    const y = drag.lastClientY;
    let delta = 0;
    if (y < AUTOSCROLL_EDGE) delta = -AUTOSCROLL_SPEED;
    else if (y > window.innerHeight - AUTOSCROLL_EDGE) delta = AUTOSCROLL_SPEED;
    if (!delta) return;
    const before = window.scrollY;
    window.scrollBy(0, delta);
    if (window.scrollY !== before) {
      this._updatePositions();
      this._scheduleAutoScroll();
    }
  }

  _onPointerUp(e) {
    if (!this._drag || e.pointerId !== this._drag.pointerId) return;
    this._finishDrag(e.type === 'pointerup');
  }

  _finishDrag(commit) {
    const drag = this._drag;
    if (!drag) return;
    this._drag = null;
    if (drag.rafId !== null) cancelAnimationFrame(drag.rafId);
    if (this.hasPointerCapture?.(drag.pointerId)) {
      this.releasePointerCapture(drag.pointerId);
    }
    this.removeEventListener('pointermove', this._onPointerMove);
    this.removeEventListener('pointerup', this._onPointerUp);
    this.removeEventListener('pointercancel', this._onPointerUp);
    this.dragging = false;

    drag.item.removeAttribute('data-sortable-dragging');
    drag.items.forEach((item) => {
      item.style.transform = '';
      item.style.transition = '';
      item.style.position = '';
      item.style.zIndex = '';
      item.style.boxShadow = '';
      item.style.backgroundColor = '';
    });

    if (commit && drag.to !== drag.from) {
      this._emitChange(drag.from, drag.to);
    }
  }

  _onKeyDown(e) {
    if (this.disabled || this._drag || !e.altKey) return;
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    const target = this._resolveTarget(e);
    if (!target) return;
    const items = this.items;
    const from = items.indexOf(target.item);
    const to = e.key === 'ArrowUp' ? from - 1 : from + 1;
    e.preventDefault();
    if (to < 0 || to >= items.length) return;
    this._emitChange(from, to);
    // The parent renders again and moves the child: give the focus back to the handle.
    requestAnimationFrame(() => target.handle.focus());
  }

  _emitChange(from, to) {
    this.dispatchEvent(
      new CustomEvent('dile-sortable-change', {
        bubbles: true,
        composed: true,
        detail: { from, to },
      }),
    );
  }
}

/** Returns a copy of the array with the `from` element moved to the `to` position. */
export function moveItem(array, from, to) {
  const result = [...array];
  const [moved] = result.splice(from, 1);
  result.splice(to, 0, moved);
  return result;
}
