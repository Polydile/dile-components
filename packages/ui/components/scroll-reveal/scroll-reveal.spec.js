import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import './scroll-reveal.js';
import { revealStyles } from '../../mixins/scroll-reveal/index.js';

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

describe('dile-scroll-reveal', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal('matchMedia', vi.fn((query) => ({
      matches: ['(min-width: 1024px)', 'all'].includes(query),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  async function render(markup) {
    document.body.innerHTML = markup;
    const el = document.querySelector('dile-scroll-reveal');
    await el.updateComplete;
    return el;
  }

  const page = `
    <div style="height: 4000px"></div>
    <p id="loose" data-reveal>Loose</p>
    <div id="group" data-reveal-group>
      <p id="child" data-reveal>Child</p>
    </div>
  `;

  it('renders nothing visible', async () => {
    const el = await render(`<dile-scroll-reveal></dile-scroll-reveal>${page}`);

    expect(getComputedStyle(el).display).toBe('none');
  });

  it('orchestrates the elements of the whole document', async () => {
    await render(`<dile-scroll-reveal></dile-scroll-reveal>${page}`);
    const loose = document.getElementById('loose');

    expect(loose.getAttribute('data-reveal-state')).toBe('pending');
    expect(getComputedStyle(loose).opacity).toBe('0');

    observerFor(loose).intersect([loose]);
    expect(loose.getAttribute('data-reveal-state')).toBe('revealed');
  });

  it('adopts the base styles in the document only once', async () => {
    await render(`<dile-scroll-reveal></dile-scroll-reveal><dile-scroll-reveal></dile-scroll-reveal>${page}`);
    const el = document.querySelector('dile-scroll-reveal');
    el.remove();
    document.body.appendChild(el);

    const adopted = document.adoptedStyleSheets.filter((sheet) => sheet === revealStyles.styleSheet);
    expect(adopted).toHaveLength(1);
  });

  it('reads its configuration from attributes', async () => {
    const el = await render(`
      <dile-scroll-reveal media="all" offset="0.3" stagger="50" group-stagger="90" watch></dile-scroll-reveal>
      ${page}
    `);

    expect(el.media).toBe('all');
    expect(el.offset).toBe(0.3);
    expect(el.stagger).toBe(50);
    expect(el.groupStagger).toBe(90);
    expect(el.watch).toBe(true);
    expect(observerFor(document.getElementById('loose')).options.rootMargin).toBe('0px 0px -30% 0px');
  });

  it('picks up elements added later when watch is set', async () => {
    await render(`<dile-scroll-reveal watch></dile-scroll-reveal>${page}`);
    const late = document.createElement('p');
    late.setAttribute('data-reveal', '');
    document.body.appendChild(late);

    await new Promise((resolve) => setTimeout(resolve));

    expect(late.getAttribute('data-reveal-state')).toBe('pending');
  });

  it('stops observing when removed from the page', async () => {
    const el = await render(`<dile-scroll-reveal watch></dile-scroll-reveal>${page}`);
    const observers = [...MockIntersectionObserver.instances];

    el.remove();
    const late = document.createElement('p');
    late.setAttribute('data-reveal', '');
    document.body.appendChild(late);
    await new Promise((resolve) => setTimeout(resolve));

    observers.forEach((observer) => expect(observer.disconnect).toHaveBeenCalled());
    expect(late.hasAttribute('data-reveal-state')).toBe(false);
  });
});
