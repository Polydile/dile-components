import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { DileScrollRevealMixin, revealStyles } from '../index.js';

class ScrollRevealTestElement extends DileScrollRevealMixin(LitElement) {
  static styles = revealStyles;

  render() {
    return html`
      <p id="top" data-reveal>Visible at start</p>
      <div style="height: 4000px"></div>
      <p id="a" data-reveal>A</p>
      <p id="b" data-reveal="from-right">B</p>
      <p id="trigger" data-reveal="trigger">Trigger</p>
      <p id="offset" data-reveal data-reveal-offset="0.6">Offset</p>
      <p id="mobile" data-reveal data-reveal-media="all">Mobile too</p>
      <div id="group" data-reveal-group data-reveal-stagger="100">
        <p id="g1" data-reveal>G1</p>
        <p id="g2" data-reveal="from-right">G2</p>
        <p id="g3" data-reveal="trigger">G3</p>
      </div>
    `;
  }
}

if (!customElements.get('scroll-reveal-test-element')) {
  customElements.define('scroll-reveal-test-element', ScrollRevealTestElement);
}

class MockIntersectionObserver {
  static instances = [];

  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.targets = new Set();
    this.disconnect = vi.fn(() => this.targets.clear());
    MockIntersectionObserver.instances.push(this);
  }

  observe(target) {
    this.targets.add(target);
  }

  unobserve(target) {
    this.targets.delete(target);
  }

  intersect(targets) {
    this.callback(targets.map((target) => ({ target, isIntersecting: true })), this);
  }
}

function observerFor(target) {
  return MockIntersectionObserver.instances.find((observer) => observer.targets.has(target));
}

function mockMedia(matchesByQuery) {
  const lists = [];
  const matchMedia = vi.fn((query) => {
    const list = {
      media: query,
      matches: matchesByQuery[query] ?? false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    lists.push(list);
    return list;
  });
  vi.stubGlobal('matchMedia', matchMedia);
  return lists;
}

const DESKTOP = { '(min-width: 1024px)': true, all: true };
const MOBILE = { '(min-width: 1024px)': false, all: true };

async function createElement() {
  const element = document.createElement('scroll-reveal-test-element');
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

const state = (element) => element.getAttribute('data-reveal-state');
const delay = (element) => element.style.getPropertyValue('--dile-reveal-delay');

describe('DileScrollRevealMixin', () => {
  let element;
  let $;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  async function setup(media = DESKTOP) {
    const lists = mockMedia(media);
    element = await createElement();
    $ = (id) => element.shadowRoot.getElementById(id);
    return lists;
  }

  it('reveals elements already past their offset line without setting them to pending', async () => {
    const setAttribute = vi.spyOn(Element.prototype, 'setAttribute');
    await setup();

    expect(state($('top'))).toBe('revealed');
    expect(delay($('top'))).toBe('0ms');
    const topStates = setAttribute.mock.calls
      .filter(([name], index) => name === 'data-reveal-state' && setAttribute.mock.contexts[index] === $('top'))
      .map(([, value]) => value);
    expect(topStates).toEqual(['revealed']);
  });

  it('hides elements below the fold until they intersect', async () => {
    await setup();

    expect(state($('a'))).toBe('pending');
    expect(getComputedStyle($('a')).opacity).toBe('0');
    expect(observerFor($('a'))).toBeTruthy();
  });

  it('moves from-right and from-left elements horizontally while pending', async () => {
    await setup();
    const left = document.createElement('p');
    left.setAttribute('data-reveal', 'from-left');
    element.shadowRoot.appendChild(left);
    element.refreshReveal();
    $('b').style.setProperty('--dile-reveal-distance-x', '100px');
    left.style.setProperty('--dile-reveal-distance-x', '100px');

    expect(new DOMMatrix(getComputedStyle($('b')).transform)).toMatchObject({ e: 100, f: 0 });
    expect(new DOMMatrix(getComputedStyle(left).transform)).toMatchObject({ e: -100, f: 0 });
    expect(new DOMMatrix(getComputedStyle($('a')).transform).e).toBe(0);
  });

  it('uses the CSS custom properties for distance and transition', async () => {
    await setup();
    $('a').style.setProperty('--dile-reveal-distance', '50px');
    $('a').style.setProperty('--dile-reveal-duration', '2.5s');

    expect(new DOMMatrix(getComputedStyle($('a')).transform)).toMatchObject({ e: 0, f: 50 });

    observerFor($('a')).intersect([$('a')]);

    expect(getComputedStyle($('a')).transitionDuration).toBe('2.5s, 2.5s');
  });

  it('reveals intersecting elements in document order with stagger delays', async () => {
    await setup();
    element.stagger = 100;

    observerFor($('a')).intersect([$('b'), $('a')]);

    expect(state($('a'))).toBe('revealed');
    expect(state($('b'))).toBe('revealed');
    expect(delay($('a'))).toBe('0ms');
    expect(delay($('b'))).toBe('100ms');
    expect(observerFor($('a'))).toBeUndefined();
  });

  it('uses one observer per distinct offset', async () => {
    await setup();

    const defaultObserver = observerFor($('a'));
    const offsetObserver = observerFor($('offset'));

    expect(defaultObserver.options.rootMargin).toBe('0px 0px -15% 0px');
    expect(offsetObserver.options.rootMargin).toBe('0px 0px -60% 0px');
    expect(offsetObserver).not.toBe(defaultObserver);
    expect(observerFor($('b'))).toBe(defaultObserver);
  });

  it('reveals the children of a group one after another in time', async () => {
    await setup();

    expect(['g1', 'g2', 'g3'].map((id) => state($(id)))).toEqual(['pending', 'pending', 'pending']);
    expect(observerFor($('g1'))).toBeUndefined();

    observerFor($('group')).intersect([$('group')]);

    expect(['g1', 'g2', 'g3'].map((id) => state($(id)))).toEqual(['revealed', 'revealed', 'revealed']);
    expect(['g1', 'g2', 'g3'].map((id) => delay($(id)))).toEqual(['0ms', '100ms', '200ms']);
  });

  it('uses groupStagger when the group has no data-reveal-stagger', async () => {
    await setup();
    $('group').removeAttribute('data-reveal-stagger');

    observerFor($('group')).intersect([$('group')]);

    expect(['g1', 'g2', 'g3'].map((id) => delay($(id)))).toEqual(['0ms', '220ms', '440ms']);
  });

  it('never hides trigger elements, it only changes their state', async () => {
    await setup();

    expect(state($('trigger'))).toBe('pending');
    expect(getComputedStyle($('trigger')).opacity).toBe('1');
    expect(getComputedStyle($('trigger')).transform).toBe('none');

    observerFor($('trigger')).intersect([$('trigger')]);
    expect(state($('trigger'))).toBe('revealed');
  });

  it('hides nothing when the media query does not match', async () => {
    await setup(MOBILE);

    expect(state($('a'))).toBeNull();
    expect(state($('g1'))).toBeNull();
    expect(observerFor($('a'))).toBeUndefined();
  });

  it('animates elements with data-reveal-media="all" when the default media does not match', async () => {
    await setup(MOBILE);

    expect(state($('mobile'))).toBe('pending');
    observerFor($('mobile')).intersect([$('mobile')]);
    expect(state($('mobile'))).toBe('revealed');
  });

  it('hides nothing with reduced motion, even with data-reveal-media', async () => {
    await setup({ ...DESKTOP, '(prefers-reduced-motion: reduce)': true });

    element.shadowRoot.querySelectorAll('[data-reveal], [data-reveal-group]').forEach((node) => {
      expect(node.hasAttribute('data-reveal-state')).toBe(false);
    });
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it('re-evaluates pending elements when the media property changes', async () => {
    await setup();
    expect(state($('a'))).toBe('pending');

    element.media = '(min-width: 9999px)';
    await element.updateComplete;

    expect(state($('a'))).toBeNull();
    expect(state($('mobile'))).toBe('pending');
  });

  it('revealAll() shows everything immediately', async () => {
    await setup();

    element.revealAll();

    element.shadowRoot.querySelectorAll('[data-reveal]').forEach((node) => {
      expect(state(node)).toBe('revealed');
      expect(delay(node)).toBe('0ms');
    });
    MockIntersectionObserver.instances.forEach((observer) => expect(observer.disconnect).toHaveBeenCalled());
  });

  it('refreshReveal() picks up elements added later', async () => {
    await setup();
    const late = document.createElement('p');
    late.setAttribute('data-reveal', '');
    element.shadowRoot.appendChild(late);

    expect(state(late)).toBeNull();
    element.refreshReveal();
    expect(state(late)).toBe('pending');
  });

  it('cleans up observers and media listeners on disconnect', async () => {
    const lists = await setup();
    const observers = [...MockIntersectionObserver.instances];

    element.remove();

    expect(observers.length).toBeGreaterThan(0);
    observers.forEach((observer) => expect(observer.disconnect).toHaveBeenCalled());
    lists.forEach((list) => expect(list.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function)));
  });
});
