const DEFAULT_MEDIA = '(min-width: 1024px)';
const DEFAULT_OFFSET = 0.15;
const DEFAULT_STAGGER = 140;
const DEFAULT_GROUP_STAGGER = 220;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const TARGETS_SELECTOR = '[data-reveal-group], [data-reveal]';
const STATE_ATTRIBUTE = 'data-reveal-state';
const PENDING = 'pending';
const REVEALED = 'revealed';
const DELAY_PROPERTY = '--dile-reveal-delay';

function parseOffset(value, fallback) {
  if (value === null || value === undefined || value === '') return fallback;
  const offset = parseFloat(value);
  return Number.isFinite(offset) && offset >= 0 && offset < 1 ? offset : fallback;
}

function parseMilliseconds(value, fallback) {
  if (value === null || value === undefined || value === '') return fallback;
  const amount = parseInt(value, 10);
  return Number.isFinite(amount) && amount >= 0 ? amount : fallback;
}

function byDocumentOrder(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

function isGroup(element) {
  return element.hasAttribute('data-reveal-group');
}

/**
 * Reveals elements progressively while the user scrolls, using IntersectionObserver.
 *
 * Elements inside `revealRoot` are configured with data attributes:
 * - `data-reveal` (`""`, `"from-right"`, `"from-left"` or `"trigger"`)
 * - `data-reveal-group`, `data-reveal-stagger`
 * - `data-reveal-offset`, `data-reveal-media`
 *
 * The mixin sets `data-reveal-state="pending|revealed"` and `--dile-reveal-delay` on the
 * managed elements; `revealStyles` turns those states into the hide/show transition.
 */
export const DileScrollRevealMixin = (superclass) => class extends superclass {
  static get properties() {
    return {
      /** Media query that enables the effect. Elements can override it with `data-reveal-media`. */
      media: { type: String },
      /** Fraction of the viewport height, from the bottom, an element must enter before revealing. */
      offset: { type: Number },
      /** Milliseconds between loose elements revealed in the same batch. */
      stagger: { type: Number },
      /** Default milliseconds between the children of a group. */
      groupStagger: { type: Number, attribute: 'group-stagger' },
      /** Watch the root with a MutationObserver to pick up elements added later. */
      watch: { type: Boolean },
    };
  }

  constructor(...args) {
    super(...args);
    this.media = DEFAULT_MEDIA;
    this.offset = DEFAULT_OFFSET;
    this.stagger = DEFAULT_STAGGER;
    this.groupStagger = DEFAULT_GROUP_STAGGER;
    this.watch = false;
    this._revealStarted = false;
    this._revealObservers = new Map();
    this._revealMediaLists = new Map();
    this._revealMutationObserver = null;
    this._revealMediaChangeHandler = () => this.refreshReveal();
    this._revealDomReadyHandler = () => this._startReveal();
  }

  /** Node whose descendants are revealed; the component's render root by default. */
  get revealRoot() {
    return this.renderRoot ?? this;
  }

  connectedCallback() {
    super.connectedCallback?.();
    if (this.hasUpdated) this._startReveal();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated?.(changedProperties);
    this._startReveal();
  }

  updated(changedProperties) {
    super.updated?.(changedProperties);
    if (!this._revealStarted) return;
    if (changedProperties.has('watch')) this._updateRevealMutationObserver();
    if (changedProperties.has('media')) this.refreshReveal();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._stopReveal();
  }

  /** Rescans the root: new elements are prepared and elements are re-evaluated against their media queries. */
  refreshReveal() {
    if (!this._revealStarted) return;
    const root = this.revealRoot;
    if (!root) return;
    this._getRevealTargets(root).forEach((target) => this._prepareRevealTarget(target));
  }

  /** Shows every managed element immediately and stops observing. */
  revealAll() {
    const root = this.revealRoot;
    if (root) {
      this._getRevealTargets(root).forEach((target) => this._revealTarget(target, 0, false));
    }
    this._disconnectRevealObservers();
  }

  _startReveal() {
    if (this._revealStarted || !this.isConnected) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this._revealDomReadyHandler, { once: true });
      return;
    }
    this._revealStarted = true;
    this._listenRevealMedia(REDUCED_MOTION_QUERY);
    this._updateRevealMutationObserver();
    this.refreshReveal();
  }

  _stopReveal() {
    document.removeEventListener('DOMContentLoaded', this._revealDomReadyHandler);
    this._revealStarted = false;
    this._disconnectRevealObservers();
    this._revealMutationObserver?.disconnect();
    this._revealMutationObserver = null;
    this._revealMediaLists.forEach((mediaList) => {
      mediaList.removeEventListener?.('change', this._revealMediaChangeHandler);
    });
    this._revealMediaLists.clear();
  }

  _disconnectRevealObservers() {
    this._revealObservers.forEach((observer) => observer.disconnect());
    this._revealObservers.clear();
  }

  _updateRevealMutationObserver() {
    if (this.watch && !this._revealMutationObserver && typeof MutationObserver === 'function') {
      const root = this.revealRoot;
      if (!root) return;
      this._revealMutationObserver = new MutationObserver(() => this.refreshReveal());
      this._revealMutationObserver.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-reveal', 'data-reveal-group'],
      });
    } else if (!this.watch && this._revealMutationObserver) {
      this._revealMutationObserver.disconnect();
      this._revealMutationObserver = null;
    }
  }

  /** Groups and loose elements (elements inside a group are driven by their group). */
  _getRevealTargets(root) {
    return [...root.querySelectorAll(TARGETS_SELECTOR)]
      .filter((element) => isGroup(element) || !element.parentElement?.closest('[data-reveal-group]'));
  }

  _getRevealMembers(target) {
    return isGroup(target) ? [target, ...target.querySelectorAll('[data-reveal]')] : [target];
  }

  _prepareRevealTarget(target) {
    const state = target.getAttribute(STATE_ATTRIBUTE);
    if (state === REVEALED) return;

    if (!this._isRevealEnabledFor(target)) {
      if (state === PENDING) {
        this._unobserveRevealTarget(target);
        this._getRevealMembers(target).forEach((member) => member.removeAttribute(STATE_ATTRIBUTE));
      }
      return;
    }

    if (state === PENDING) {
      // Elements added to a pending group later on wait for the group too.
      this._getRevealMembers(target)
        .filter((member) => !member.hasAttribute(STATE_ATTRIBUTE))
        .forEach((member) => member.setAttribute(STATE_ATTRIBUTE, PENDING));
      return;
    }

    // Already past its offset line (e.g. arriving through an anchor): shown before hiding anything.
    if (this._isPastRevealLine(target)) {
      this._revealTarget(target, 0, false);
      return;
    }

    this._getRevealMembers(target).forEach((member) => member.setAttribute(STATE_ATTRIBUTE, PENDING));
    this._observeRevealTarget(target);
  }

  _isRevealEnabledFor(target) {
    if (typeof IntersectionObserver !== 'function') return false;
    if (this._revealMediaMatches(REDUCED_MOTION_QUERY)) return false;
    const query = target.getAttribute('data-reveal-media') || this.media || DEFAULT_MEDIA;
    return this._revealMediaMatches(query);
  }

  _revealMediaMatches(query) {
    const mediaList = this._listenRevealMedia(query);
    return mediaList ? mediaList.matches : query !== REDUCED_MOTION_QUERY;
  }

  _listenRevealMedia(query) {
    if (typeof matchMedia !== 'function') return null;
    let mediaList = this._revealMediaLists.get(query);
    if (!mediaList) {
      mediaList = matchMedia(query);
      mediaList.addEventListener?.('change', this._revealMediaChangeHandler);
      this._revealMediaLists.set(query, mediaList);
    }
    return mediaList;
  }

  _getRevealOffset(target) {
    return parseOffset(target.getAttribute('data-reveal-offset'), parseOffset(this.offset, DEFAULT_OFFSET));
  }

  _isPastRevealLine(target) {
    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < viewportHeight * (1 - this._getRevealOffset(target)) && rect.bottom > 0;
  }

  _observeRevealTarget(target) {
    const offset = this._getRevealOffset(target);
    let observer = this._revealObservers.get(offset);
    if (!observer) {
      observer = new IntersectionObserver((entries) => this._onRevealIntersection(entries, observer), {
        rootMargin: `0px 0px -${offset * 100}% 0px`,
      });
      this._revealObservers.set(offset, observer);
    }
    observer.observe(target);
  }

  _unobserveRevealTarget(target) {
    this._revealObservers.forEach((observer) => observer.unobserve(target));
  }

  _onRevealIntersection(entries, observer) {
    const stagger = parseMilliseconds(this.stagger, DEFAULT_STAGGER);
    entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target)
      .sort(byDocumentOrder)
      .forEach((target, index) => {
        observer.unobserve(target);
        this._revealTarget(target, index * stagger);
      });
  }

  _revealTarget(target, delay = 0, animate = true) {
    this._setRevealed(target, animate ? delay : 0);
    if (!isGroup(target)) return;
    // Group children are revealed one after another in time, in document order.
    const step = parseMilliseconds(
      target.getAttribute('data-reveal-stagger'),
      parseMilliseconds(this.groupStagger, DEFAULT_GROUP_STAGGER),
    );
    target.querySelectorAll('[data-reveal]').forEach((member, index) => {
      this._setRevealed(member, animate ? delay + index * step : 0);
    });
  }

  _setRevealed(element, delay) {
    element.style.setProperty(DELAY_PROPERTY, `${delay}ms`);
    element.setAttribute(STATE_ATTRIBUTE, REVEALED);
  }
};
