import { describe, it, expect, afterEach } from 'vitest';
import { LitElement, html } from 'lit';
import { DileForm } from './DileForm.js';

class RaceTestForm extends DileForm(LitElement) {
  render() {
    return html`<input name="name" />`;
  }
}

if (!customElements.get('race-test-form')) {
  customElements.define('race-test-form', RaceTestForm);
}

describe('DileForm', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('applies setData after the first render is ready even when called immediately', async () => {
    const form = document.createElement('race-test-form');
    document.body.appendChild(form);

    form.setData({ name: 'Alice' });
    await form.updateComplete;

    expect(form.shadowRoot.querySelector('input').value).toBe('Alice');
  });
});
