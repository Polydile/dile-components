import { html, css, nothing } from 'lit';
import { addIcon } from '@dile/icons';
import '../../chip/chip.js';
import '../../icon/icon.js';
import { normalize } from '../../input-suggestions/src/normalize.js';

/**
 * # DileInputTagsMixin
 *
 * Turns a suggestions field (DileInputSuggestions, or DileAjaxInputSuggestions from
 * `@dile/crud`) into a tags editor: the assigned tags are shown with `dile-chip` above the
 * field, and the typed text adds a new one, choosing a suggestion or typing it by hand.
 *
 * It is a **controlled** component: it never changes `tags` itself. It emits events to add or
 * remove, and the consumer updates `tags` (e.g. after saving it on the server).
 *
 * ## Adding
 * - Choosing a suggestion (click, or arrows + Enter) emits `dile-input-tags-add` with the object.
 * - Enter with no highlighted suggestion, or the "+" button, emits `dile-input-tags-add` with the
 *   typed text and `item: null`.
 * - Nothing is emitted if the text is empty or an equal tag already exists (ignoring case and
 *   accents). After emitting, the field is cleared.
 *
 * ## Removing
 * - The button of each `dile-chip` (click, or Enter/Space/Delete/Backspace while focused) emits
 *   `dile-input-tags-remove`. Its accessible name is `removeLabel` + the tag text
 *   ("Remove Madrid"). Focus then goes back to the field.
 * - Backspace with an empty field emits `dile-input-tags-remove` with the last tag.
 *
 * ## Properties
 * - `tags`: array of assigned objects. Their text comes from `getOptionText` or
 *   `displayProperty`, same as the suggestions.
 * - `colorProperty`: name of the property of each tag holding its color (e.g. `"color"`). When
 *   the tag has it, its chip uses it as background, with dark text and icon. Empty by default:
 *   every tag uses the `--dile-chip-*` colors. For other rules, override `tagChipStyle(tag)`,
 *   which returns the inline `style` of each chip.
 * - `removeLabel`: text of each chip remove button, before the tag text ("Remove").
 * - `addLabel`: accessible name of the "+" button ("Add tag").
 * - `tagsLabel`: accessible name of the tags list ("Assigned tags").
 * - `addedAnnouncement(text)` / `removedAnnouncement(text)`: texts announced when `tags` changes.
 * - Plus every dile-input-suggestions property. `minLength` defaults to 1.
 *
 * ## Events
 * - `dile-input-tags-add`: `detail: { name, text, item }`. `item` is the chosen suggestion, or
 *   `null` when typed by hand.
 * - `dile-input-tags-remove`: `detail: { name, item }`.
 * - It does not emit `dile-input-suggestions-selected`.
 *
 * ## CSS custom properties
 * - `--dile-input-tags-gap` (0.4rem): space between tags.
 * - `--dile-input-tags-margin-bottom` (0.5rem): space between the tags and the field.
 * - `--dile-input-tags-add-color` (`--dile-input-color` or #303030) and
 *   `--dile-input-tags-add-size` (20px): icon of the "+" button.
 * - Tags are styled with the `--dile-chip-*` properties.
 * - `--dile-input-tags-colored-text-color` (#1f2937): text and icon of the tags with their own
 *   color (`colorProperty`).
 */
export const DileInputTagsMixin = (superclass) =>
  class extends superclass {
    static get styles() {
      return [
        super.styles,
        css`
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: var(--dile-input-tags-gap, 0.4rem);
            margin: 0 0 var(--dile-input-tags-margin-bottom, 0.5rem);
            padding: 0;
            list-style: none;
          }
          .add-button {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            padding: 0;
            border: none;
            background: none;
            cursor: pointer;
            --dile-icon-color: var(--dile-input-tags-add-color, var(--dile-input-color, #303030));
            --dile-icon-size: var(--dile-input-tags-add-size, 20px);
          }
          .add-button:disabled {
            cursor: default;
            opacity: 0.4;
          }
        `,
      ];
    }

    static get properties() {
      return {
        tags: { type: Array },
        colorProperty: { type: String },
        removeLabel: { type: String },
        addLabel: { type: String },
        tagsLabel: { type: String },
        addedAnnouncement: { type: Object },
        removedAnnouncement: { type: Object },
      };
    }

    constructor() {
      super();
      this.tags = [];
      this.minLength = 1;
      this.colorProperty = '';
      this.removeLabel = 'Remove';
      this.addLabel = 'Add tag';
      this.tagsLabel = 'Assigned tags';
      this.addedAnnouncement = (text) => `Tag added: ${text}`;
      this.removedAnnouncement = (text) => `Tag removed: ${text}`;
    }

    willUpdate(changedProperties) {
      super.willUpdate?.(changedProperties);
      if (changedProperties.has('tags')) {
        const previous = changedProperties.get('tags');
        if (Array.isArray(previous)) {
          this.announceTagChanges(previous, this.tags ?? []);
        }
      }
    }

    announceTagChanges(previous, current) {
      const previousTexts = previous.map((tag) => this.optionText(tag));
      const currentTexts = current.map((tag) => this.optionText(tag));
      const added = currentTexts.filter((text) => !previousTexts.includes(text));
      const removed = previousTexts.filter((text) => !currentTexts.includes(text));
      const messages = [
        ...added.map((text) => this.addedAnnouncement(text)),
        ...removed.map((text) => this.removedAnnouncement(text)),
      ];
      if (messages.length > 0) {
        this._liveAnnouncement = messages.join('. ');
      }
    }

    renderBeforeField() {
      const tags = this.tags ?? [];
      if (tags.length === 0) {
        return nothing;
      }
      return html`
        <ul class="tags" aria-label="${this.tagsLabel}" @dile-chip-icon-click=${this.onChipIconClick}>
          ${tags.map(
            (tag, index) =>
              html`<li>
                <dile-chip
                  name="${index}"
                  part="tag"
                  icon-label="${this.removeLabel}"
                  style="${this.tagChipStyle(tag)}"
                  >${this.optionText(tag)}</dile-chip
                >
              </li>`,
          )}
        </ul>
      `;
    }

    /** Inline `style` of a tag chip: its color, when `colorProperty` points to one. */
    tagChipStyle(tag) {
      const color = this.colorProperty ? tag?.[this.colorProperty] : null;
      if (!color) {
        return '';
      }
      const text = 'var(--dile-input-tags-colored-text-color, #1f2937)';
      return `--dile-chip-background-color: ${color}; --dile-chip-text-color: ${text}; --dile-chip-icon-color: ${text};`;
    }

    renderFieldEnd() {
      return html`
        <button
          type="button"
          class="add-button"
          aria-label="${this.addLabel}"
          title="${this.addLabel}"
          ?disabled=${this.disabled || !this.typedText}
          @click=${this.onAddClick}
        >
          <dile-icon .icon=${addIcon} aria-hidden="true"></dile-icon>
        </button>
      `;
    }

    get typedText() {
      return String(this.value ?? '').trim();
    }

    /** Leaves the already assigned tags out of the suggestions. */
    filterResults(data) {
      return super.filterResults(data).filter((item) => !this.hasTag(this.optionText(item)));
    }

    hasTag(text) {
      const needle = normalize(text);
      return (this.tags ?? []).some((tag) => normalize(this.optionText(tag)) === needle);
    }

    onEnterWithoutSuggestion(e) {
      e.preventDefault();
      this.addTyped();
    }

    onAddClick() {
      this.addTyped();
      this.focus();
    }

    onKeydown(e) {
      if (e.key === 'Backspace' && this.value === '' && (this.tags ?? []).length > 0) {
        e.preventDefault();
        this.requestRemove(this.tags[this.tags.length - 1]);
        return;
      }
      super.onKeydown(e);
    }

    /** Adds the text typed by hand. */
    addTyped() {
      const text = this.typedText;
      if (this.disabled || !text) return;
      if (this.hasTag(text)) {
        this.resetField();
        return;
      }
      this.emitAdd(text, null);
    }

    /** Replaces dile-input-suggestions behavior: adds the tag instead of copying the text. */
    selectItem(item) {
      const text = this.optionText(item);
      if (this.hasTag(text)) {
        this.resetField();
        return;
      }
      this.emitAdd(text, item);
    }

    emitAdd(text, item) {
      this.resetField();
      if (this.hideErrorOnInput && this.errored) {
        this.clearError();
      }
      this.dispatchEvent(
        new CustomEvent('dile-input-tags-add', {
          bubbles: true,
          composed: true,
          detail: { name: this.name, text, item },
        }),
      );
    }

    onChipIconClick(e) {
      e.stopPropagation();
      const tag = (this.tags ?? [])[Number(e.detail?.name)];
      if (tag !== undefined) {
        this.requestRemove(tag);
        // The chip is about to disappear: keep the focus from getting lost with it.
        this.focus();
      }
    }

    requestRemove(item) {
      if (this.disabled) return;
      this.dispatchEvent(
        new CustomEvent('dile-input-tags-remove', {
          bubbles: true,
          composed: true,
          detail: { name: this.name, item },
        }),
      );
    }

    /** Clears the field and closes the suggestions, discarding requests in progress. */
    resetField() {
      clearTimeout(this._debounceTimeout);
      this._requestId++;
      this.value = '';
      this.keyword = '';
      this.data = [];
      this.loading = false;
      this._keyboardHighlight = false;
      this.select?.close();
    }
  };
