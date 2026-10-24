import { describe, it, expect, afterEach } from 'vitest';
import './steps.js';

describe('dile-steps', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderSteps(attributes = '') {
    document.body.innerHTML = `<dile-steps ${attributes}></dile-steps>`;
    const el = document.body.querySelector('dile-steps');
    el.steps = ['Customer', 'Products', 'Review'];
    await el.updateComplete;
    return el;
  }

  function bubbles(el) {
    return [...el.shadowRoot.querySelectorAll('dile-step')];
  }

  it('renders one step bubble and label per step', async () => {
    const el = await renderSteps();

    expect(bubbles(el)).toHaveLength(3);
    const labels = [...el.shadowRoot.querySelectorAll('.h-label')].map(label => label.textContent);
    expect(labels).toEqual(['Customer', 'Products', 'Review']);
  });

  it('marks the current step as active and with aria-current', async () => {
    const el = await renderSteps('current="1" reached="1"');

    expect(bubbles(el).map(step => step.active)).toEqual([false, true, false]);
    const items = [...el.shadowRoot.querySelectorAll('[role="listitem"]')];
    expect(items[1].getAttribute('aria-current')).toBe('step');
    expect(items[0].getAttribute('aria-current')).toBe('false');
  });

  it('only enables the steps already reached', async () => {
    const el = await renderSteps('current="0" reached="1"');
    await Promise.all(bubbles(el).map(step => step.updateComplete));

    const buttons = bubbles(el).map(step => step.shadowRoot.querySelector('button'));
    expect(buttons.map(button => button.disabled)).toEqual([false, false, true]);
  });

  it('enables every step with freeNavigation', async () => {
    const el = await renderSteps('freeNavigation');
    await Promise.all(bubbles(el).map(step => step.updateComplete));

    const buttons = bubbles(el).map(step => step.shadowRoot.querySelector('button'));
    expect(buttons.every(button => !button.disabled)).toBe(true);
  });

  it('dispatches dile-steps-select when a reached step is clicked', async () => {
    const el = await renderSteps('reached="2"');
    await Promise.all(bubbles(el).map(step => step.updateComplete));
    let detail;
    let innerClickEscaped = false;
    el.addEventListener('dile-steps-select', e => { detail = e.detail; });
    document.body.addEventListener('dile-step-click', () => { innerClickEscaped = true; });

    bubbles(el)[2].shadowRoot.querySelector('button').click();

    expect(detail).toEqual({ index: 2, label: 'Review' });
    expect(innerClickEscaped).toBe(false);
  });

  it('renders the bubbles without buttons in readonly mode', async () => {
    const el = await renderSteps('readonly reached="2"');
    await Promise.all(bubbles(el).map(step => step.updateComplete));

    bubbles(el).forEach(step => {
      expect(step.shadowRoot.querySelector('button')).toBeNull();
      expect(step.shadowRoot.querySelector('.step').textContent).toBe(String(step.index + 1));
    });
  });

  it('renders the vertical layout', async () => {
    const el = await renderSteps('vertical');

    expect(el.shadowRoot.querySelector('.vertical')).toBeTruthy();
    expect(el.shadowRoot.querySelectorAll('.connector')).toHaveLength(2);
  });
});
