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
});
