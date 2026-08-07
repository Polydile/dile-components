import { describe, it, expect, afterEach } from 'vitest';
import './inline-feedback.js';

describe('dile-inline-feedback', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInlineFeedback(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-inline-feedback');
    await el.updateComplete;
    return el;
  }

  it('renders an empty message section by default', async () => {
    const el = await renderInlineFeedback('<dile-inline-feedback></dile-inline-feedback>');
    const section = el.shadowRoot.querySelector('#msg');
    expect(section).toBeTruthy();
    expect(section.textContent.trim()).toBe('');
  });

  it('sets the message and status classes on positiveFeedback', async () => {
    const el = await renderInlineFeedback('<dile-inline-feedback></dile-inline-feedback>');
    el.positiveFeedback('Saved!');
    await el.updateComplete;

    expect(el.msg).toBe('Saved!');
    expect(el.status).toBe('success');
    expect(el.shadowRoot.querySelector('#msg').textContent.trim()).toBe('Saved!');
    expect(el.shadowRoot.querySelector('#msg').classList.contains('success')).toBe(true);
  });

  it('clears the message and status on clear()', async () => {
    const el = await renderInlineFeedback('<dile-inline-feedback></dile-inline-feedback>');
    el.negativeFeedback('Oops');
    await el.updateComplete;

    el.clear();
    await el.updateComplete;

    expect(el.msg).toBe('');
    expect(el.status).toBe('');
    expect(el.opened).toBe(false);
  });
});
