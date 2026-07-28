import { describe, it, expect, afterEach } from 'vitest';
import './color-picker.js';

describe('dile-color-picker', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderColorPicker(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-color-picker');
    await el.updateComplete;
    return el;
  }

  it('renders a trigger swatch matching the initial value', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#3366ff"></dile-color-picker>');

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger).toBeTruthy();
    expect(trigger.style.backgroundColor).toBe('rgb(51, 102, 255)');
  });

  it('normalizes 3-digit hex shorthand set externally', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#0f0"></dile-color-picker>');

    expect(el.value).toBe('#00ff00');
  });

  it('updates value and hue/saturation state when the hex input changes', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#000000"></dile-color-picker>');

    const hexInput = el.shadowRoot.querySelector('.hex-input');
    hexInput.value = '#ff0000';
    hexInput.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('#ff0000');
    expect(el._hue).toBe(0);
    expect(el._saturation).toBe(100);
    expect(el._value).toBe(100);
  });

  it('dispatches element-changed with name and value when the value changes', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#000000"></dile-color-picker>');
    let detail = null;
    el.addEventListener('element-changed', (e) => { detail = e.detail; });

    const hexInput = el.shadowRoot.querySelector('.hex-input');
    hexInput.value = '#00ff00';
    hexInput.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(detail).toEqual({ name: 'color', value: '#00ff00' });
  });

  it('updates value when the hue slider changes', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#ff0000"></dile-color-picker>');

    const hueSlider = el.shadowRoot.querySelector('.hue-slider');
    hueSlider.value = '120';
    hueSlider.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('#00ff00');
  });

  it('nudges saturation and brightness with arrow keys on the sv square', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#ff0000"></dile-color-picker>');

    const svSquare = el.shadowRoot.getElementById('sv-square');
    svSquare.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;

    expect(el._saturation).toBe(99);
  });

  it('does not change value when disabled', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#ff0000" disabled></dile-color-picker>');

    const trigger = el.shadowRoot.getElementById('trigger');
    expect(trigger.disabled).toBe(true);

    const svSquare = el.shadowRoot.getElementById('sv-square');
    svSquare.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('#ff0000');
  });

  it('reverts the hue slider and ignores hex edits when readonly', async () => {
    const el = await renderColorPicker('<dile-color-picker name="color" value="#ff0000" readonly></dile-color-picker>');

    const hueSlider = el.shadowRoot.querySelector('.hue-slider');
    hueSlider.value = '200';
    hueSlider.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('#ff0000');
    expect(hueSlider.value).toBe('0');
  });

  it('participates in native form submission via FormData', async () => {
    document.body.innerHTML = `
      <form id="testForm">
        <dile-color-picker name="color" value="#123456"></dile-color-picker>
      </form>
    `;
    const el = document.body.querySelector('dile-color-picker');
    await el.updateComplete;

    const form = document.getElementById('testForm');
    const data = new FormData(form);

    expect(data.get('color')).toBe('#123456');
  });
});
