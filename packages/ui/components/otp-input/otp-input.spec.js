import { describe, it, expect, afterEach } from 'vitest';
import './otp-input.js';

describe('dile-otp-input', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderOtpInput(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-otp-input');
    await el.updateComplete;
    return el;
  }

  it('renders one input box per digit', async () => {
    const el = await renderOtpInput('<dile-otp-input name="code" length="4"></dile-otp-input>');

    expect(el.shadowRoot.querySelectorAll('input').length).toBe(4);
  });

  it('renders the slotted-in value across the boxes', async () => {
    const el = await renderOtpInput('<dile-otp-input length="4" value="12"></dile-otp-input>');
    const boxes = el.shadowRoot.querySelectorAll('input');

    expect(boxes[0].value).toBe('1');
    expect(boxes[1].value).toBe('2');
    expect(boxes[2].value).toBe('');
  });

  it('dispatches dile-otp-input-completed when the last box is filled', async () => {
    const el = await renderOtpInput('<dile-otp-input name="code" length="2"></dile-otp-input>');
    let detail = null;
    el.addEventListener('dile-otp-input-completed', (e) => { detail = e.detail; });

    el.value = '12';
    await el.updateComplete;

    expect(detail).toEqual({ name: 'code', value: '12' });
  });
});
