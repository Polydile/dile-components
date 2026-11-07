const DEFAULT_DURATION = 1200;
const DEFAULT_SIZE = '4px';
const DEFAULT_COLOR = 'currentColor';
const SCROLL_END_TIMEOUT = 800;
const DEFAULT_SCROLL_OPTIONS = { behavior: 'smooth', block: 'center' };

/**
 * Parses a `--dile-highlight-duration` value into milliseconds.
 * Accepts unitless numbers (`1200`), milliseconds (`1200ms`) and seconds (`1.2s`).
 * Returns the default duration (1200) for invalid or non-positive values.
 */
export function parseHighlightDuration(value) {
  const match = /^([+-]?(?:\d+\.?\d*|\.\d+))(ms|s)?$/i.exec(String(value ?? '').trim());
  if (!match) return DEFAULT_DURATION;
  const amount = parseFloat(match[1]) * (match[2]?.toLowerCase() === 's' ? 1000 : 1);
  return Number.isFinite(amount) && amount > 0 ? amount : DEFAULT_DURATION;
}

function prefersReducedMotion() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isFullyVisible(element) {
  if (typeof element.getBoundingClientRect !== 'function') return false;
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewportHeight && rect.right <= viewportWidth;
}

/** Resolves on the next `scrollend` (when supported) or after a timeout, whichever comes first. */
function waitForScrollEnd(timeout = SCROLL_END_TIMEOUT) {
  return new Promise((resolve) => {
    const supportsScrollEnd = 'onscrollend' in window;
    let timer;
    const done = () => {
      clearTimeout(timer);
      if (supportsScrollEnd) window.removeEventListener('scrollend', done, true);
      resolve();
    };
    if (supportsScrollEnd) {
      // Capture phase so non-bubbling scrollend events from scroll containers are caught too.
      window.addEventListener('scrollend', done, true);
    }
    timer = setTimeout(done, timeout);
  });
}

export const DileHighlightMixin = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this._highlightAnimation = null;
    this._highlightRequest = 0;
  }

  /** Element to highlight; the host by default. Override it to target an inner element. */
  get highlightTarget() {
    return this;
  }

  /**
   * Scrolls the target into view (optionally) and plays a glow animation on it.
   * @param {{ scroll?: boolean | ScrollIntoViewOptions }} [options]
   * @returns {Promise<Animation | null>}
   */
  async highlight({ scroll = true } = {}) {
    const request = ++this._highlightRequest;
    this._cancelHighlightAnimation();

    if (this.updateComplete) {
      await this.updateComplete;
      if (request !== this._highlightRequest) return null;
    }

    const target = this.highlightTarget;
    if (!target) return null;

    const reduceMotion = prefersReducedMotion();

    if (scroll && typeof target.scrollIntoView === 'function') {
      const scrollOptions = {
        ...DEFAULT_SCROLL_OPTIONS,
        ...(typeof scroll === 'object' ? scroll : {}),
      };
      if (reduceMotion) scrollOptions.behavior = 'auto';

      const mustWait = scrollOptions.behavior === 'smooth' && !isFullyVisible(target);
      const scrollEnd = mustWait ? waitForScrollEnd() : null;
      target.scrollIntoView(scrollOptions);
      if (scrollEnd) {
        await scrollEnd;
        if (request !== this._highlightRequest) return null;
      }
    }

    if (typeof target.animate !== 'function') return null;

    const styles = getComputedStyle(target);
    const color = styles.getPropertyValue('--dile-highlight-color').trim() || DEFAULT_COLOR;
    const size = styles.getPropertyValue('--dile-highlight-size').trim() || DEFAULT_SIZE;
    const duration = parseHighlightDuration(styles.getPropertyValue('--dile-highlight-duration'));
    const glow = `0 0 0 ${size} ${color}`;

    const keyframes = reduceMotion
      ? [{ boxShadow: glow }, { boxShadow: glow }]
      : [
        { boxShadow: '0 0 0 0 transparent' },
        { boxShadow: glow, offset: 0.25 },
        { boxShadow: glow, offset: 0.6 },
        { boxShadow: '0 0 0 0 transparent' },
      ];

    this._cancelHighlightAnimation();
    this._highlightAnimation = target.animate(keyframes, {
      duration,
      easing: reduceMotion ? 'linear' : 'ease',
      // Add the glow on top of any box-shadow the target already has instead of replacing it.
      composite: 'add',
    });
    return this._highlightAnimation;
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    // Invalidate pending highlight() calls and stop the running animation.
    this._highlightRequest++;
    this._cancelHighlightAnimation();
  }

  _cancelHighlightAnimation() {
    this._highlightAnimation?.cancel();
    this._highlightAnimation = null;
  }
};
