import { describe, it, expect, afterEach } from 'vitest';
import './rating-scale-question.js';

describe('dile-rating-scale-question', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderQuestion(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-rating-scale-question');
    await el.updateComplete;
    return el;
  }

  it('renders the label and default 7-point options', async () => {
    const el = await renderQuestion('<dile-rating-scale-question name="q1" label="How satisfied are you?"></dile-rating-scale-question>');

    expect(el.shadowRoot.querySelector('legend').textContent.trim()).toBe('How satisfied are you?');
    expect(el.shadowRoot.querySelectorAll('dile-rating-scale-option').length).toBe(7);
  });

  it('updates value when an option is selected', async () => {
    const el = await renderQuestion('<dile-rating-scale-question name="q1"></dile-rating-scale-question>');
    const option = el.shadowRoot.querySelector('dile-rating-scale-option');
    option.dispatchEvent(new CustomEvent('dile-rating-scale-option-selected', {
      bubbles: true,
      composed: true,
      detail: { value: option.value },
    }));
    await el.updateComplete;

    expect(el.value).toBe(option.value);
  });
});
