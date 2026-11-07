import { afterEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { DileHighlightMixin } from './DileHighlightMixin.js';

class HighlightTestElement extends DileHighlightMixin(LitElement) {
  render() {
    return html`<div class="focus-target">Highlight me</div>`;
  }
}

if (!customElements.get('highlight-test-element')) {
  customElements.define('highlight-test-element', HighlightTestElement);
}

describe('DileHighlightMixin', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('scrolls and animates the host when no custom target is defined', async () => {
    const element = document.createElement('highlight-test-element');
    document.body.appendChild(element);
    await element.updateComplete;

    const scrollSpy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    const animateSpy = vi.spyOn(HTMLElement.prototype, 'animate').mockImplementation(() => ({ cancel: vi.fn() }));
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: (property) => {
        if (property === '--dile-highlight-color') return '#ff8800';
        if (property === '--dile-highlight-duration') return '2400';
        return '';
      },
    });

    element.highlight();

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    expect(animateSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ boxShadow: '0 0 0 0 transparent' }),
        expect.objectContaining({ boxShadow: '0 0 0 4px #ff8800' }),
      ]),
      expect.objectContaining({ duration: 2400, easing: 'ease' })
    );
  });
});
