import { describe, it, expect, afterEach } from 'vitest';
import './input-mask.js';

describe('dile-input-mask', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  async function renderInputMask(html) {
    document.body.innerHTML = html;
    const el = document.body.querySelector('dile-input-mask');
    await el.updateComplete;
    return el;
  }

  it('renders a native text input', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA00 0000 0000 0000 0000"></dile-input-mask>');
    expect(el.shadowRoot.querySelector('input')).toBeTruthy();
  });

  it('masks input with letters and digits', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA00 0000 0000 0000 0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    const chars = ['E', 'S', '9', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    chars.forEach((char) => {
      const keydownEvent = new KeyboardEvent('keydown', {
        key: char,
        bubbles: true,
        cancelable: true,
      });
      input.dispatchEvent(keydownEvent);
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    expect(el.maskedValue).toBe('ES91 0000 0000 0000 0000');
  });

  it('validates invalid format on blur', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA00 0000 0000 0000 0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // Try to start with a digit instead of a letter
    input.value = '91ES0000000000000000';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    await el.updateComplete;

    expect(el.errored).toBe(true);
    expect(el.message).toContain('expected a letter');
  });

  it('supports multiple languages for error messages', async () => {
    // English (default)
    const elEn = await renderInputMask('<dile-input-mask name="iban" mask="AA00" language="en"></dile-input-mask>');
    const inputEn = elEn.shadowRoot.querySelector('input');
    inputEn.value = '9100';
    inputEn.dispatchEvent(new Event('input', { bubbles: true }));
    await elEn.updateComplete;
    inputEn.dispatchEvent(new Event('blur', { bubbles: true }));
    await elEn.updateComplete;

    expect(elEn.message).toContain('expected a letter');

    // Spanish
    const elEs = await renderInputMask('<dile-input-mask name="iban" mask="AA00" language="es"></dile-input-mask>');
    const inputEs = elEs.shadowRoot.querySelector('input');
    inputEs.value = '9100';
    inputEs.dispatchEvent(new Event('input', { bubbles: true }));
    await elEs.updateComplete;
    inputEs.dispatchEvent(new Event('blur', { bubbles: true }));
    await elEs.updateComplete;

    expect(elEs.message).toContain('se esperaba una letra');

    // French
    const elFr = await renderInputMask('<dile-input-mask name="iban" mask="AA00" language="fr"></dile-input-mask>');
    const inputFr = elFr.shadowRoot.querySelector('input');
    inputFr.value = '9100';
    inputFr.dispatchEvent(new Event('input', { bubbles: true }));
    await elFr.updateComplete;
    inputFr.dispatchEvent(new Event('blur', { bubbles: true }));
    await elFr.updateComplete;

    expect(elFr.message).toContain('lettre attendue');
  });

  it('allows selecting and replacing characters', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA00 0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // First, enter some initial value
    const initialChars = ['E', 'S', '9', '1', '0', '0', '0', '0'];
    initialChars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });
    await el.updateComplete;

    expect(el.maskedValue).toBe('ES91 0000');

    // Now simulate selecting characters at positions 3-5 (the "91") and replacing with "AB"
    // In the masked value "ES91 0000", positions 3-5 contain "91"
    input.value = 'ESAB 0000';
    input.setSelectionRange(5, 5); // Cursor after the replacement
    const inputEvent = new Event('input', { bubbles: true });
    input.dispatchEvent(inputEvent);
    await el.updateComplete;

    // Should have replaced with AB and maintained format
    expect(el.value).toContain('ESAB');
    expect(el.maskedValue).toBe('ESAB 0000');
  });

  it('does not show error while typing incomplete input', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA00 0000 0000 0000 0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // User starts typing correctly
    input.value = 'ES91';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;

    expect(el.errored).toBeFalsy();
  });

  it('transforms to uppercase when pattern uses A', async () => {
    const el = await renderInputMask('<dile-input-mask name="test" mask="AA00 AA"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // User types lowercase, should transform to uppercase
    const chars = ['e', 's', '9', '1', 'a', 'b'];
    chars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    expect(el.maskedValue).toBe('ES91 AB');
    expect(el.value).toBe('ES91AB');
  });

  it('transforms to lowercase when pattern uses a', async () => {
    const el = await renderInputMask('<dile-input-mask name="test" mask="aa00 aa"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // User types uppercase, should transform to lowercase
    const chars = ['E', 'S', '9', '1', 'A', 'B'];
    chars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    expect(el.maskedValue).toBe('es91 ab');
    expect(el.value).toBe('es91ab');
  });

  it('handles mixed case transformation', async () => {
    const el = await renderInputMask('<dile-input-mask name="test" mask="AA-aa-00"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // User types: first two should be uppercase, next two lowercase, then digits
    const chars = ['a', 'b', 'c', 'd', '1', '2'];
    chars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    expect(el.maskedValue).toBe('AB-cd-12');
    expect(el.value).toBe('ABcd12');
  });

  it('supports X pattern for alphanumeric uppercase', async () => {
    const el = await renderInputMask('<dile-input-mask name="test" mask="XX-0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // X accepts both letters and digits
    const chars = ['a', 'B', '1', '2', '3', '4'];
    chars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    // Letters should be uppercase, digits unchanged
    expect(el.maskedValue).toBe('AB-1234');
    expect(el.value).toBe('AB1234');
  });

  it('supports x pattern for alphanumeric lowercase', async () => {
    const el = await renderInputMask('<dile-input-mask name="test" mask="xx-0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // x accepts both letters and digits
    const chars = ['A', 'b', '1', '2', '3', '4'];
    chars.forEach((char) => {
      input.value += char;
      const inputEvent = new Event('input', { bubbles: true });
      input.dispatchEvent(inputEvent);
    });

    await el.updateComplete;

    // Letters should be lowercase, digits unchanged
    expect(el.maskedValue).toBe('ab-1234');
    expect(el.value).toBe('ab1234');
  });

  it('applies lazy separators only when next block is filled', async () => {
    const el = await renderInputMask('<dile-input-mask name="iban" mask="AA-XXXX-0000"></dile-input-mask>');
    const input = el.shadowRoot.querySelector('input');

    // Type 'ES' - should show 'ES' without trailing separator
    input.value = 'ES';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.maskedValue).toBe('ES');

    // Type 'ESW' - should show 'ES-W' (separator added when next block starts)
    input.value = 'ESW';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.maskedValue).toBe('ES-W');

    // Type 'ESWSWQ' - should show 'ES-WSWQ'
    input.value = 'ESWSWQ';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.maskedValue).toBe('ES-WSWQ');

    // Type 'ESWSWQ0' - should show 'ES-WSWQ-0' (separator added when digits block starts)
    input.value = 'ESWSWQ0';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.maskedValue).toBe('ES-WSWQ-0');

    // Type complete 'ESWSWQ0000' - should show 'ES-WSWQ-0000'
    input.value = 'ESWSWQ0000';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await el.updateComplete;
    expect(el.maskedValue).toBe('ES-WSWQ-0000');
  });
});

