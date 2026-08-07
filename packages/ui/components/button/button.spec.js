import { describe, it, expect, afterEach } from 'vitest';
import './button.js';

describe('dile-button', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderButton(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-button');
    await el.updateComplete;
    return el;
  }

  it('renders the slotted content inside a native button', async () => {
    const el = await renderButton('<dile-button>Click me</dile-button>');

    expect(el.shadowRoot.querySelector('button')).toBeTruthy();
    expect(el.textContent.trim()).toBe('Click me');
  });

  it('reflects the disabled property onto the native button', async () => {
    const el = await renderButton('<dile-button disabled>Click me</dile-button>');

    expect(el.shadowRoot.querySelector('button').disabled).toBe(true);
  });

  it('dispatches a click event when enabled', async () => {
    const el = await renderButton('<dile-button>Click me</dile-button>');
    let clicked = false;
    el.addEventListener('click', () => { clicked = true; });

    el.shadowRoot.querySelector('button').click();

    expect(clicked).toBe(true);
  });

  it('shows a spinner icon while loading', async () => {
    const el = await renderButton('<dile-button>Save</dile-button>');
    expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeNull();

    el.loading = true;
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('dile-spinner-icon')).toBeTruthy();
  });

  describe('Native form submission', () => {
    it('includes name/value in the FormData when clicked', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-button type="submit" name="action" value="save">Save</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const el = document.body.querySelector('dile-button');
      await el.updateComplete;

      let capturedFormData = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        capturedFormData = new FormData(form);
      });

      el.shadowRoot.querySelector('button').click();

      expect(capturedFormData.get('action')).toBe('save');
    });

    it('does not submit a name/value pair when the button has no value', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-button type="submit" name="action">Save</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const el = document.body.querySelector('dile-button');
      await el.updateComplete;

      let capturedFormData = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        capturedFormData = new FormData(form);
      });

      el.shadowRoot.querySelector('button').click();

      expect(capturedFormData.has('action')).toBe(false);
    });

    it('participates in FormData when name is set as a JS property', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-button type="submit" value="save">Save</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const el = document.body.querySelector('dile-button');
      el.name = 'action';
      await el.updateComplete;

      expect(el.getAttribute('name')).toBe('action');

      let capturedFormData = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        capturedFormData = new FormData(form);
      });

      el.shadowRoot.querySelector('button').click();

      expect(capturedFormData.get('action')).toBe('save');
    });

    it('only includes the clicked button among two submit buttons with different values', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-button type="submit" name="action" value="save">Save</dile-button>
          <dile-button type="submit" name="action" value="delete">Delete</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const buttons = document.body.querySelectorAll('dile-button');
      for (const b of buttons) await b.updateComplete;

      let capturedFormData = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        capturedFormData = new FormData(form);
      });

      buttons[1].shadowRoot.querySelector('button').click();

      expect(capturedFormData.getAll('action')).toEqual(['delete']);
    });

    it('does not leak a stale value when the form is submitted again without a button click', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <input name="text" value="hello" />
          <dile-button type="submit" name="action" value="save">Save</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const el = document.body.querySelector('dile-button');
      await el.updateComplete;

      let capturedFormData = null;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        capturedFormData = new FormData(form);
      });

      // First submit via the button click - action=save should be present.
      el.shadowRoot.querySelector('button').click();
      expect(capturedFormData.get('action')).toBe('save');

      // Second submit programmatically, with no submitter clicked - action should NOT leak.
      form.requestSubmit();
      expect(capturedFormData.get('action')).toBeNull();
    });

    it('does not submit when the button is disabled', async () => {
      document.body.innerHTML = `
        <form id="testForm">
          <dile-button type="submit" name="action" value="save" disabled>Save</dile-button>
        </form>
      `;
      const form = document.getElementById('testForm');
      const el = document.body.querySelector('dile-button');
      await el.updateComplete;

      let submitted = false;
      form.addEventListener('submit', (e) => { e.preventDefault(); submitted = true; });

      el.shadowRoot.querySelector('button').click();

      expect(submitted).toBe(false);
    });
  });
});
