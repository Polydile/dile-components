export const DileHighlightMixin = (superclass) => class extends superclass {
  constructor(...args) {
    super(...args);
    this._highlightAnimation = null;
  }

  /** Element to highlight; the host by default. Override it to target an inner element. */
  get highlightTarget() {
    return this;
  }

  highlight({ scroll = true } = {}) {
    const target = this.highlightTarget;
    if (!target) return;

    if (scroll && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (typeof target.animate !== 'function') {
      return;
    }

    const styles = getComputedStyle(this);
    const color = styles.getPropertyValue('--dile-highlight-color').trim() || 'currentColor';
    const duration = parseInt(styles.getPropertyValue('--dile-highlight-duration'), 10) || 1200;

    this._highlightAnimation?.cancel();
    this._highlightAnimation = target.animate([
      { boxShadow: '0 0 0 0 transparent' },
      { boxShadow: `0 0 0 4px ${color}`, offset: 0.25 },
      { boxShadow: `0 0 0 4px ${color}`, offset: 0.6 },
      { boxShadow: '0 0 0 0 transparent' },
    ], { duration, easing: 'ease' });
  }
};
