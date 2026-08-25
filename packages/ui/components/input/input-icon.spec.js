import { describe, it, expect, afterEach, vi } from 'vitest';
import './input-icon.js';
import '@dile/iconlib/lucide-icons/dot.js';

describe('dile-input-icon', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputIcon(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-icon');
    await el.updateComplete;
    return el;
  }

  it('renders a text input with the given value', async () => {
    const el = await renderInputIcon('<dile-input-icon name="test" value="hello"></dile-input-icon>');
    const input = el.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.value).toBe('hello');
    expect(input.type).toBe('text');
  });

  it('renders the label when set', async () => {
    const el = await renderInputIcon('<dile-input-icon label="Username"></dile-input-icon>');
    const label = el.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.textContent.trim()).toBe('Username');
  });

  it('does not render icon button when icon is not set', async () => {
    const el = await renderInputIcon('<dile-input-icon></dile-input-icon>');
    const button = el.shadowRoot.querySelector('.input-icon-btn');
    expect(button).toBeFalsy();
  });

  it('renders icon button when icon is set', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot"></dile-input-icon>');
    await new Promise(resolve => setTimeout(resolve, 50)); // Small delay for icon registration
    const button = el.shadowRoot.querySelector('.input-icon-btn');
    expect(button).toBeTruthy();
  });

  it('disables the icon button when input is disabled', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" disabled></dile-input-icon>');
    const button = el.shadowRoot.querySelector('.input-icon-btn');
    expect(button).toBeTruthy();
    expect(button.disabled).toBe(true);
  });

  it('dispatches dile-input-icon-clicked event when icon button is clicked', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" value="test-value"></dile-input-icon>');
    const button = el.shadowRoot.querySelector('.input-icon-btn');
    
    let eventData = null;
    el.addEventListener('dile-input-icon-clicked', (e) => {
      eventData = e.detail;
    });

    button.click();
    await el.updateComplete;

    expect(eventData).toBeTruthy();
    expect(eventData.icon).toBe('lucide.dot');
    expect(eventData.value).toBe('test-value');
  });

  it('calls onIconClick callback when icon button is clicked', async () => {
    const callback = vi.fn();
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" value="test"></dile-input-icon>');
    
    el.onIconClick = callback;
    const button = el.shadowRoot.querySelector('.input-icon-btn');
    button.click();
    await el.updateComplete;

    expect(callback).toHaveBeenCalledWith(el);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('callback receives component instance with access to value property', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" value="secret"></dile-input-icon>');
    
    let receivedComponent = null;
    el.onIconClick = (component) => {
      receivedComponent = component;
    };

    const button = el.shadowRoot.querySelector('.input-icon-btn');
    button.click();
    await el.updateComplete;

    expect(receivedComponent).toBe(el);
    expect(receivedComponent.value).toBe('secret');
  });

  it('renders a message when set', async () => {
    const el = await renderInputIcon('<dile-input-icon></dile-input-icon>');
    el.message = 'Required field';
    await el.updateComplete;

    const message = el.shadowRoot.querySelector('.message span');
    expect(message).toBeTruthy();
    expect(message.textContent.trim()).toBe('Required field');
  });

  it('updates the value property on user input', async () => {
    const el = await renderInputIcon('<dile-input-icon name="test"></dile-input-icon>');
    const input = el.shadowRoot.querySelector('input');
    input.value = 'typed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.value).toBe('typed');
  });

  it('does not render tooltip wrapper when tooltip is not set', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot"></dile-input-icon>');
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('renders dile-tooltip when tooltip property is set', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" tooltip="Help text"></dile-input-icon>');
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip.getAttribute('tooltip')).toBe('Help text');
  });

  it('maps tooltipPosition to tooltip position attribute', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" tooltip="Help" tooltipPosition="bottom"></dile-input-icon>');
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');
    expect(tooltip.getAttribute('position')).toBe('bottom');
  });

  it('maps tooltipFadeIn to tooltip fadeIn attribute', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" tooltip="Help" tooltipFadeIn></dile-input-icon>');
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');
    expect(tooltip.getAttribute('fadeIn')).toBe('');
  });

  it('maps tooltipArrow to tooltip arrow attribute', async () => {
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" tooltip="Help" tooltipArrow></dile-input-icon>');
    await el.updateComplete;
    const tooltip = el.shadowRoot.querySelector('dile-tooltip');
    expect(tooltip.getAttribute('arrow')).toBe('');
  });

  it('button is still clickable when wrapped in tooltip', async () => {
    const callback = vi.fn();
    const el = await renderInputIcon('<dile-input-icon icon="lucide.dot" tooltip="Help"></dile-input-icon>');
    el.onIconClick = callback;
    await el.updateComplete;

    const button = el.shadowRoot.querySelector('.input-icon-btn');
    expect(button).toBeTruthy();
    button.click();
    await el.updateComplete;

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
