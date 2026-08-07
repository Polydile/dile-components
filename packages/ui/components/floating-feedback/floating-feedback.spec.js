import { describe, it, expect, afterEach } from 'vitest';
import './floating-feedback.js';

describe('dile-floating-feedback', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    const styles = document.getElementById('dile-floating-feedback-styles');
    if (styles) styles.remove();
  });

  async function renderFloatingFeedback(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-floating-feedback');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content', async () => {
    const el = await renderFloatingFeedback('<dile-floating-feedback feedback="Copied!"><button>Click</button></dile-floating-feedback>');
    expect(el.shadowRoot.querySelector('slot')).toBeTruthy();
    expect(el.textContent.trim()).toBe('Click');
  });

  it('creates a floating text element in the document body when shown', async () => {
    const el = await renderFloatingFeedback('<dile-floating-feedback feedback="Copied!"><button>Click</button></dile-floating-feedback>');
    el.show();

    expect(document.body.querySelector('.dile-floating-feedback-text')).toBeTruthy();
  });
});
