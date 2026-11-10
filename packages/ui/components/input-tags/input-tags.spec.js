import { describe, expect, it, afterEach } from 'vitest';
import { html, render } from 'lit';
import './input-tags.js';

async function mount(template) {
  const container = document.createElement('div');
  document.body.append(container);
  render(template, container);
  const element = container.firstElementChild;
  await element.updateComplete;
  return element;
}

const SUGGESTIONS = [
  { uuid: 'a', name: 'Madrid' },
  { uuid: 'b', name: 'Málaga' },
  { uuid: 'c', name: 'Moroso' },
];

const inputOf = (el) => el.shadowRoot.getElementById('input');
const addButtonOf = (el) => el.shadowRoot.querySelector('.add-button');
const chipsOf = (el) => [...el.shadowRoot.querySelectorAll('dile-chip')];
const optionTexts = (el) => [...el.shadowRoot.querySelectorAll('option')].map((o) => o.textContent);

async function type(el, text) {
  const input = inputOf(el);
  input.focus();
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
}

const key = (el, k) => inputOf(el).dispatchEvent(
  new KeyboardEvent('keydown', { key: k, bubbles: true, composed: true, cancelable: true }),
);

function collect(el) {
  const events = { add: [], remove: [] };
  el.addEventListener('dile-input-tags-add', (e) => events.add.push(e.detail));
  el.addEventListener('dile-input-tags-remove', (e) => events.remove.push(e.detail));
  return events;
}

const mountTags = (tags = []) => mount(html`
  <dile-input-tags name="tags" delay="0" .suggestions=${SUGGESTIONS} .tags=${tags}></dile-input-tags>
`);

describe('dile-input-tags', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders a dile-chip per tag', async () => {
    const el = await mountTags([SUGGESTIONS[0], SUGGESTIONS[2]]);
    expect(chipsOf(el).map((chip) => chip.textContent)).toEqual(['Madrid', 'Moroso']);
  });

  it('does not render the list without tags', async () => {
    const el = await mountTags();
    expect(el.shadowRoot.querySelector('.tags')).toBeNull();
  });

  it('adds the typed text with Enter and clears the field', async () => {
    const el = await mountTags();
    const events = collect(el);
    await type(el, '  Cliente VIP ');

    key(el, 'Enter');
    await el.updateComplete;

    expect(events.add).toEqual([{ name: 'tags', text: 'Cliente VIP', item: null }]);
    expect(el.value).toBe('');
    expect(inputOf(el).value).toBe('');
  });

  it('with visible but not highlighted suggestions, Enter adds the typed text', async () => {
    const el = await mountTags();
    const events = collect(el);
    await type(el, 'ma');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'Enter');
    await el.updateComplete;

    expect(events.add).toEqual([{ name: 'tags', text: 'ma', item: null }]);
    expect(el.opened).toBe(false);
  });

  it('adds the highlighted suggestion with arrow down and Enter', async () => {
    const el = await mountTags();
    const events = collect(el);
    await type(el, 'ma');
    await expect.poll(() => el.opened).toBe(true);

    key(el, 'ArrowDown');
    key(el, 'ArrowDown');
    key(el, 'Enter');

    await expect.poll(() => events.add).toEqual([{ name: 'tags', text: 'Málaga', item: SUGGESTIONS[1] }]);
    expect(el.value).toBe('');
    expect(el.opened).toBe(false);
  });

  it('after reopening the list, Enter without highlighting again adds the typed text', async () => {
    const el = await mountTags();
    const events = collect(el);
    await type(el, 'ma');
    await expect.poll(() => el.opened).toBe(true);
    key(el, 'ArrowDown');

    await type(el, 'mad');
    await expect.poll(() => optionTexts(el)).toEqual(['Madrid']);
    key(el, 'Enter');
    await el.updateComplete;

    expect(events.add).toEqual([{ name: 'tags', text: 'mad', item: null }]);
  });

  it('the + button adds the typed text and is only enabled with text', async () => {
    const el = await mountTags();
    const events = collect(el);
    expect(addButtonOf(el).disabled).toBe(true);

    await type(el, 'Nueva');
    expect(addButtonOf(el).disabled).toBe(false);
    addButtonOf(el).click();
    await el.updateComplete;

    expect(events.add).toEqual([{ name: 'tags', text: 'Nueva', item: null }]);
    expect(addButtonOf(el).disabled).toBe(true);
  });

  it('does not emit when the tag is already assigned, ignoring case and accents', async () => {
    const el = await mountTags([SUGGESTIONS[1]]);
    const events = collect(el);
    await type(el, 'MALAGA');

    key(el, 'Enter');
    await el.updateComplete;

    expect(events.add).toEqual([]);
    expect(el.value).toBe('');
  });

  it('does not suggest the already assigned tags', async () => {
    const el = await mountTags([SUGGESTIONS[0]]);
    await type(el, 'ma');
    await expect.poll(() => optionTexts(el)).toEqual(['Málaga']);
  });

  it('the chip icon requests removing the tag', async () => {
    const el = await mountTags([SUGGESTIONS[0], SUGGESTIONS[2]]);
    const events = collect(el);

    chipsOf(el)[1].shadowRoot.querySelector('dile-icon').click();

    expect(events.remove).toEqual([{ name: 'tags', item: SUGGESTIONS[2] }]);
  });

  it('the chip button is named with removeLabel and gives the focus back to the field', async () => {
    const el = await mountTags([SUGGESTIONS[0]]);
    const events = collect(el);
    const chip = chipsOf(el)[0];
    expect(chip.getAttribute('icon-label')).toBe('Remove');

    chip.shadowRoot.querySelector('button').dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Delete', bubbles: true, composed: true, cancelable: true }),
    );

    expect(events.remove).toEqual([{ name: 'tags', item: SUGGESTIONS[0] }]);
    expect(el.shadowRoot.activeElement).toBe(inputOf(el));
  });

  it('with colorProperty renders each chip with its tag color', async () => {
    const tags = [{ ...SUGGESTIONS[0], color: '#fde68a' }, SUGGESTIONS[2]];
    const el = await mount(html`
      <dile-input-tags name="tags" colorProperty="color" .suggestions=${SUGGESTIONS} .tags=${tags}></dile-input-tags>
    `);
    const [colored, plain] = chipsOf(el);
    const background = (chip) => getComputedStyle(chip.shadowRoot.querySelector('div')).backgroundColor;

    expect(background(colored)).toBe('rgb(253, 230, 138)');
    expect(getComputedStyle(colored.shadowRoot.querySelector('.text')).color).toBe('rgb(31, 41, 55)');
    expect(plain.getAttribute('style')).toBe('');
  });

  it('without colorProperty ignores the tags color', async () => {
    const el = await mountTags([{ ...SUGGESTIONS[0], color: '#fde68a' }]);
    expect(chipsOf(el)[0].getAttribute('style')).toBe('');
  });

  it('Backspace with an empty field requests removing the last tag', async () => {
    const el = await mountTags([SUGGESTIONS[0], SUGGESTIONS[2]]);
    const events = collect(el);

    key(el, 'Backspace');
    expect(events.remove).toEqual([{ name: 'tags', item: SUGGESTIONS[2] }]);

    await type(el, 'x');
    key(el, 'Backspace');
    expect(events.remove).toHaveLength(1);
  });

  it('is controlled: does not change tags by itself and announces the changes', async () => {
    const el = await mountTags([SUGGESTIONS[0]]);
    await type(el, 'Nueva');
    key(el, 'Enter');
    await el.updateComplete;
    expect(el.tags).toEqual([SUGGESTIONS[0]]);

    el.tags = [SUGGESTIONS[0], { uuid: 'z', name: 'Nueva' }];
    await el.updateComplete;
    const status = el.shadowRoot.querySelector('[role="status"]');
    expect(status.textContent).toBe('Tag added: Nueva');
  });

  it('emits nothing while disabled', async () => {
    const el = await mountTags([SUGGESTIONS[0]]);
    const events = collect(el);
    el.disabled = true;
    el.value = 'Nueva';
    await el.updateComplete;

    el.addTyped();
    chipsOf(el)[0].shadowRoot.querySelector('dile-icon').click();

    expect(events.add).toEqual([]);
    expect(events.remove).toEqual([]);
  });
});
