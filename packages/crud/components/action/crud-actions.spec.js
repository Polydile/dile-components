import { describe, it, expect, afterEach, vi } from 'vitest';
import { html } from 'lit';
import '@dile/ui/components/button/button.js';
import './crud-actions.js';

async function createActions(actionIds, maxItems) {
  const el = document.createElement('dile-crud-actions');
  el.language = 'en';
  el.actions = [{ name: 'DeleteAction', label: 'Delete' }];
  el.formActionsTemplate = () => html``;
  el.actionIds = actionIds;
  el.maxItems = maxItems;
  document.body.appendChild(el);
  await vi.waitFor(() => expect(el.translations.select_matching).toBeTruthy());
  await el.updateComplete;
  return el;
}

describe('dile-crud-actions limit', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('warns and disables the action when the selection exceeds maxItems', async () => {
    const el = await createActions([1, 2, 3], 2);

    expect(el.shadowRoot.querySelector('.limit').textContent).toContain('3');
    expect(el.shadowRoot.querySelector('dile-button').disabled).toBe(true);

    let requested = false;
    el.addEventListener('crud-action-requested', () => { requested = true; });
    el.showAction();
    expect(requested).toBe(false);
  });

  it('allows the action within maxItems or without limit', async () => {
    const el = await createActions([1, 2], 2);
    expect(el.shadowRoot.querySelector('.limit')).toBeNull();
    expect(el.shadowRoot.querySelector('dile-button').disabled).toBe(false);

    el.maxItems = undefined;
    el.actionIds = [1, 2, 3, 4];
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.limit')).toBeNull();
  });
});
