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

  it('renders the loading spinner after the label (far right)', async () => {
    const el = await renderButton('<dile-button loading>Save</dile-button>');
    const children = [...el.shadowRoot.querySelector('button').children].map(n => n.tagName.toLowerCase());
    expect(children.indexOf('dile-spinner-icon')).toBeGreaterThan(children.indexOf('slot'));
  });

  describe('icon support', () => {
    it('does not render an icon element when no icon is provided (backwards compatible)', async () => {
      const el = await renderButton('<dile-button>Plain</dile-button>');
      expect(el.shadowRoot.querySelector('dile-iconlib')).toBeNull();
    });

    it('renders a dile-iconlib icon from a "family.name" string', async () => {
      const el = await renderButton('<dile-button icon="lucide.rocket">Launch</dile-button>');
      const icon = el.shadowRoot.querySelector('dile-iconlib');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('icon')).toBe('lucide.rocket');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('places the icon before the label by default and after it when iconPosition is "right"', async () => {
      const el = await renderButton('<dile-button icon="lucide.rocket">Launch</dile-button>');
      let children = [...el.shadowRoot.querySelector('button').children].map(n => n.tagName.toLowerCase());
      expect(children.indexOf('dile-iconlib')).toBeLessThan(children.indexOf('slot'));

      el.iconPosition = 'right';
      await el.updateComplete;
      children = [...el.shadowRoot.querySelector('button').children].map(n => n.tagName.toLowerCase());
      expect(children.indexOf('dile-iconlib')).toBeGreaterThan(children.indexOf('slot'));
    });

    it('reads the icon position from the "icon-position" attribute', async () => {
      const el = await renderButton('<dile-button icon="lucide.rocket" icon-position="right">Continue</dile-button>');
      expect(el.iconPosition).toBe('right');
      const children = [...el.shadowRoot.querySelector('button').children].map(n => n.tagName.toLowerCase());
      expect(children.indexOf('dile-iconlib')).toBeGreaterThan(children.indexOf('slot'));
    });

    it('marks the button as having text only when the slot has content', async () => {
      const withText = await renderButton('<dile-button icon="lucide.rocket">Launch</dile-button>');
      expect(withText.shadowRoot.querySelector('button').classList.contains('has-text')).toBe(true);

      const iconOnly = await renderButton('<dile-button icon="lucide.rocket" label="Launch"></dile-button>');
      expect(iconOnly.shadowRoot.querySelector('button').classList.contains('has-text')).toBe(false);
    });

    it('exposes the label as the accessible name of the inner button', async () => {
      const el = await renderButton('<dile-button icon="lucide.rocket" label="Launch rocket"></dile-button>');
      expect(el.shadowRoot.querySelector('button').getAttribute('aria-label')).toBe('Launch rocket');
    });
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
