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

class ClearableField extends HTMLElement {
  constructor() {
    super();
    this.value = '';
    this.cleared = false;
  }
  clear() {
    this.cleared = true;
    this.value = '';
  }
}

if (!customElements.get('clearable-test-field')) {
  customElements.define('clearable-test-field', ClearableField);
}

class NullTestForm extends DileForm(LitElement) {
  render() {
    return html`
      <input name="name" />
      <input name="email" />
      <clearable-test-field name="custom"></clearable-test-field>
    `;
  }
}

if (!customElements.get('null-test-form')) {
  customElements.define('null-test-form', NullTestForm);
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

  it('clears fields whose key is null and ignores undefined keys', async () => {
    const form = document.createElement('null-test-form');
    document.body.appendChild(form);
    await form.setData({ name: 'Alice', email: 'alice@example.com', custom: 'x' });

    await form.setData({ name: null, custom: null });

    const inputs = form.shadowRoot.querySelectorAll('input');
    const custom = form.shadowRoot.querySelector('clearable-test-field');
    expect(inputs[0].value).toBe('');
    expect(inputs[1].value).toBe('alice@example.com');
    expect(custom.cleared).toBe(true);
    expect(custom.value).toBe('');
  });
});
