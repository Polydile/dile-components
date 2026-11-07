import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { DileHighlightMixin, parseHighlightDuration } from './DileHighlightMixin.js';

class HighlightTestElement extends DileHighlightMixin(LitElement) {
  render() {
    return html`<div class="focus-target">Highlight me</div>`;
  }
}

class HighlightConditionalElement extends DileHighlightMixin(LitElement) {
  static properties = { showTarget: { type: Boolean } };

  constructor() {
    super();
    this.showTarget = false;
  }

  get highlightTarget() {
    return this.shadowRoot.querySelector('.late-target');
  }

  render() {
    return this.showTarget ? html`<div class="late-target">Now I exist</div>` : html``;
  }
}

class HighlightNoTargetElement extends DileHighlightMixin(LitElement) {
  get highlightTarget() {
    return null;
  }
}

const define = (name, ctor) => {
  if (!customElements.get(name)) customElements.define(name, ctor);
};
define('highlight-test-element', HighlightTestElement);
define('highlight-conditional-element', HighlightConditionalElement);
define('highlight-no-target-element', HighlightNoTargetElement);

const mockAnimation = () => ({ cancel: vi.fn() });

const mockStyles = (values = {}) => vi.spyOn(window, 'getComputedStyle').mockReturnValue({
  getPropertyValue: (property) => values[property] ?? '',
});

const mockReducedMotion = (matches) => vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches }));

async function createElement(tag = 'highlight-test-element') {
  const element = document.createElement(tag);
  document.body.appendChild(element);
  await element.updateComplete;
  return element;
}

describe('parseHighlightDuration', () => {
  it('parses unitless, ms and s values', () => {
    expect(parseHighlightDuration('1200')).toBe(1200);
    expect(parseHighlightDuration(' 1500ms ')).toBe(1500);
    expect(parseHighlightDuration('1.2s')).toBe(1200);
    expect(parseHighlightDuration('.5s')).toBe(500);
  });

  it('falls back to 1200 for invalid or non-positive values', () => {
    expect(parseHighlightDuration('')).toBe(1200);
    expect(parseHighlightDuration('fast')).toBe(1200);
    expect(parseHighlightDuration('12px')).toBe(1200);
    expect(parseHighlightDuration('0')).toBe(1200);
    expect(parseHighlightDuration('-300ms')).toBe(1200);
    expect(parseHighlightDuration(undefined)).toBe(1200);
  });
});

describe('DileHighlightMixin', () => {
  let scrollSpy;
  let animateSpy;

  beforeEach(() => {
    scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    animateSpy = vi.spyOn(HTMLElement.prototype, 'animate').mockImplementation(mockAnimation);
    mockReducedMotion(false);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('scrolls and animates the host when no custom target is defined', async () => {
    const element = await createElement();
    mockStyles({ '--dile-highlight-color': '#ff8800', '--dile-highlight-duration': '2400' });

    const animation = await element.highlight();

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(animateSpy).toHaveBeenCalledTimes(1);
    expect(animateSpy.mock.contexts[0]).toBe(element);
    expect(animateSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ boxShadow: '0 0 0 0 transparent' }),
        expect.objectContaining({ boxShadow: '0 0 0 4px #ff8800' }),
      ]),
      expect.objectContaining({ duration: 2400, easing: 'ease', composite: 'add' })
    );
    expect(animation).toBe(animateSpy.mock.results[0].value);
  });

  it('reads duration with units and --dile-highlight-size from the target styles', async () => {
    const element = await createElement();
    const stylesSpy = mockStyles({
      '--dile-highlight-color': 'red',
      '--dile-highlight-duration': '1.2s',
      '--dile-highlight-size': '6px',
    });

    await element.highlight();

    expect(stylesSpy).toHaveBeenCalledWith(element);
    expect(animateSpy).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ boxShadow: '0 0 0 6px red' })]),
      expect.objectContaining({ duration: 1200 })
    );
  });

  it('resolves with null when there is no target', async () => {
    const element = await createElement('highlight-no-target-element');

    await expect(element.highlight()).resolves.toBeNull();
    expect(scrollSpy).not.toHaveBeenCalled();
    expect(animateSpy).not.toHaveBeenCalled();
  });

  it('resolves with null when the browser does not support animate', async () => {
    const element = await createElement();
    element.animate = undefined;

    await expect(element.highlight()).resolves.toBeNull();
  });

  it('cancels the previous animation on repeated calls', async () => {
    const element = await createElement();

    const first = await element.highlight();
    const second = await element.highlight();

    expect(first.cancel).toHaveBeenCalledTimes(1);
    expect(second.cancel).not.toHaveBeenCalled();
    expect(animateSpy).toHaveBeenCalledTimes(2);
  });

  it('only animates once when called several times in a row without awaiting', async () => {
    const element = await createElement();

    const results = await Promise.all([element.highlight(), element.highlight(), element.highlight()]);

    expect(results.slice(0, 2)).toEqual([null, null]);
    expect(results[2]).not.toBeNull();
    expect(animateSpy).toHaveBeenCalledTimes(1);
  });

  it('does not scroll when scroll is false', async () => {
    const element = await createElement();

    await element.highlight({ scroll: false });

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(animateSpy).toHaveBeenCalledTimes(1);
  });

  it('merges a ScrollIntoViewOptions object with the defaults', async () => {
    const element = await createElement();

    await element.highlight({ scroll: { block: 'start' } });

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('uses instant scrolling and still highlights with reduced motion', async () => {
    mockReducedMotion(true);
    const element = await createElement();
    mockStyles({ '--dile-highlight-color': 'blue' });

    const animation = await element.highlight({ scroll: { behavior: 'smooth', block: 'nearest' } });

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'auto', block: 'nearest' });
    expect(animation).not.toBeNull();
    const [keyframes, options] = animateSpy.mock.calls[0];
    expect(keyframes.every((frame) => frame.boxShadow === '0 0 0 4px blue')).toBe(true);
    expect(options).toEqual(expect.objectContaining({ easing: 'linear', composite: 'add' }));
  });

  it('waits for updateComplete before reading highlightTarget', async () => {
    const element = await createElement('highlight-conditional-element');

    element.showTarget = true;
    const animation = await element.highlight();

    expect(animation).not.toBeNull();
    expect(animateSpy.mock.contexts[0].classList.contains('late-target')).toBe(true);
  });

  it('waits for scrollend before animating a target outside the viewport', async () => {
    const spacer = document.createElement('div');
    spacer.style.height = '3000px';
    document.body.appendChild(spacer);
    const element = await createElement();

    let settled = false;
    const promise = element.highlight().then((animation) => {
      settled = true;
      return animation;
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(settled).toBe(false);
    expect(animateSpy).not.toHaveBeenCalled();

    document.dispatchEvent(new Event('scrollend'));

    await expect(promise).resolves.not.toBeNull();
    expect(animateSpy).toHaveBeenCalledTimes(1);
  });

  it('cancels the running animation when disconnected', async () => {
    const element = await createElement();

    const animation = await element.highlight();
    element.remove();

    expect(animation.cancel).toHaveBeenCalled();
  });
});
