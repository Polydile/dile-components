import { LitElement, html, css } from 'lit';
import '@dile/ui/components/modal/modal.js';
import '@dile/ui/components/confirm/confirm.js';
import '@dile/iconlib/lucide-icons/chevron-down.js';
import '@dile/iconlib/lucide-icons/pencil.js';
import '@dile/iconlib/lucide-icons/copy.js';
import '@dile/iconlib/lucide-icons/trash-2.js';
import '@dile/iconlib/lucide-icons/search.js';
import '@dile/iconlib/lucide-icons/ellipsis-vertical.js';
import { getDefaultValues } from './theme-variables.js';
import {
  listPalettes,
  getPalette,
  savePalette,
  deletePalette,
  renamePalette,
  getActivePaletteName,
  setActivePaletteName,
} from './theme-storage.js';

function valuesEqual(a = {}, b = {}) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function themesEqual(a, b) {
  if (!a || !b) return a === b;
  return !!a.darkEnabled === !!b.darkEnabled
    && valuesEqual(a.light, b.light)
    && valuesEqual(a.dark, b.dark);
}

/**
 * Command bar to manage named color-theme palettes: shows the active
 * palette and whether it has unsaved changes, lets the user save, create,
 * rename, duplicate, switch to, and delete palettes.
 *
 * Owns all palette storage/naming logic so the parent only needs to:
 * - pass the live values being edited via the `currentTheme` property
 *   (`{ light, dark, darkEnabled }`)
 * - listen for the `dile-theme-palette-load` event and apply its detail
 *   (same shape) to its own editable state.
 */
export class DileThemePaletteBar extends LitElement {

  static get properties() {
    return {
      currentTheme: { type: Object },
      _palettes: { state: true },
      _activeName: { state: true },
      _menuOpen: { state: true },
      _optionsMenuOpen: { state: true },
      _search: { state: true },
      _renaming: { state: true },
      _renameValue: { state: true },
      _pendingAction: { state: true },
      _pendingDeleteName: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      .bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .active-theme {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        padding: 0.4rem 0.7rem;
        border-radius: 6px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        background-color: var(--dile-on-background-color, #fff);
        color: var(--dile-background-color, #232323);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      .active-theme:hover {
        border-color: rgba(0, 0, 0, 0.25);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }
      .theme-name {
        font-weight: bold;
      }
      .rename-input {
        font: inherit;
        font-weight: bold;
        border: 1px solid var(--dile-input-focus-border-color, #6af);
        border-radius: 4px;
        padding: 0.1rem 0.3rem;
        width: 12rem;
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.8em;
        white-space: nowrap;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .status-badge.clean .status-dot {
        background-color: #1a9c4a;
      }
      .status-badge.dirty .status-dot {
        background-color: #e08b1f;
      }
      .chevron {
        display: inline-flex;
        transition: transform 0.15s ease;
      }
      .chevron.open {
        transform: rotate(180deg);
      }
      .save-button {
        opacity: 0.6;
      }
      .save-button.active {
        opacity: 1;
      }
      .options-wrapper {
        position: relative;
        margin-left: auto;
      }
      .icon-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.1rem;
        height: 2.1rem;
        padding: 0;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        background: #fff;
        cursor: pointer;
        color: #303030;
        transition: background-color 0.15s ease, border-color 0.15s ease;
      }
      .icon-button:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.05);
        border-color: rgba(0, 0, 0, 0.25);
      }
      .icon-button.danger {
        color: #c0392b;
      }
      .icon-button:disabled {
        opacity: 0.4;
        cursor: default;
      }
      .options-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        min-width: 10rem;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
      }
      .options-menu button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        font-size: 0.9em;
      }
      .options-menu button:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .dropdown {
        margin-top: 0.75rem;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        overflow: hidden;
      }
      .search-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .search-input {
        flex-grow: 1;
        border: none;
        outline: none;
        font: inherit;
      }
      .palette-list {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: 16rem;
        overflow-y: auto;
      }
      .palette-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.75rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }
      .palette-row.active {
        background-color: rgba(0, 122, 255, 0.08);
      }
      .palette-row-main {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        flex-grow: 1;
        border: none;
        background: none;
        padding: 0.2rem 0;
        cursor: pointer;
        text-align: left;
        font: inherit;
      }
      .mini-swatches {
        display: inline-flex;
        flex-shrink: 0;
      }
      .mini-swatches span {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin-left: -5px;
      }
      .mini-swatches span:first-child {
        margin-left: 0;
      }
      .palette-row-name {
        flex-grow: 1;
      }
      .in-use {
        font-size: 0.75em;
        opacity: 0.7;
      }
      .empty {
        padding: 0.75rem;
        opacity: 0.7;
        font-size: 0.9em;
      }
      dile-modal {
        --dile-modal-width: 26rem;
      }
      .guard-modal p {
        margin-top: 0;
      }
      .guard-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.currentTheme = null;

    this._palettes = listPalettes();
    if (this._palettes.length === 0) {
      const bootstrapName = 'Default theme';
      savePalette(bootstrapName, {
        light: getDefaultValues('light'),
        dark: getDefaultValues('dark'),
        darkEnabled: false,
      });
      this._palettes = listPalettes();
    }

    const savedActiveName = getActivePaletteName();
    this._activeName = this._palettes.some(p => p.name === savedActiveName)
      ? savedActiveName
      : this._palettes[0].name;
    setActivePaletteName(this._activeName);

    this._menuOpen = false;
    this._optionsMenuOpen = false;
    this._search = '';
    this._renaming = false;
    this._renameValue = '';
    this._pendingAction = null;
    this._pendingDeleteName = null;

    this._onDocumentClick = (e) => {
      if (!e.composedPath().includes(this)) {
        this._menuOpen = false;
        this._optionsMenuOpen = false;
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocumentClick);
  }

  render() {
    const dirty = !this._isSaved();
    const visiblePalettes = this._filteredPalettes();
    return html`
      <div class="bar">
        <div class="active-theme" @click="${this._onActiveThemeClick}">
          ${this._renaming ? html`
            <input
              class="rename-input"
              .value="${this._renameValue}"
              @input="${this._onRenameInput}"
              @keydown="${this._onRenameKeydown}"
              @blur="${this._commitRename}"
              @click="${(e) => e.stopPropagation()}"
            />
          ` : html`
            <span class="theme-name" @dblclick="${this._startRename}">${this._activeName}</span>
          `}
          <span class="status-badge ${dirty ? 'dirty' : 'clean'}">
            <span class="status-dot"></span>${dirty ? 'Sin guardar' : 'Guardado'}
          </span>
          <span class="chevron ${this._menuOpen ? 'open' : ''}">
            <dile-lucide-icon-chevron-down></dile-lucide-icon-chevron-down>
          </span>
        </div>

        <dile-button
          class="save-button ${dirty ? 'active' : ''}"
          ?disabled="${!dirty}"
          @click="${this._saveChanges}"
        >${dirty ? 'Guardar cambios' : 'Guardado'}</dile-button>

        <dile-button @click="${this._createNewTheme}">+ Nuevo tema</dile-button>

        <div class="options-wrapper">
          <button
            type="button"
            class="icon-button"
            aria-label="Opciones"
            @click="${this._onOptionsClick}"
          >
            <dile-lucide-icon-ellipsis-vertical></dile-lucide-icon-ellipsis-vertical>
          </button>
          ${this._optionsMenuOpen ? html`
            <div class="options-menu">
              <button type="button" @click="${this._startRename}">
                <dile-lucide-icon-pencil></dile-lucide-icon-pencil> Renombrar
              </button>
              <button type="button" @click="${this._duplicateActive}">
                <dile-lucide-icon-copy></dile-lucide-icon-copy> Duplicar tema
              </button>
            </div>
          ` : ''}
        </div>
      </div>

      ${this._menuOpen ? this._renderDropdown(visiblePalettes) : ''}
      ${this._pendingAction ? this._renderGuardModal() : ''}

      <dile-confirm
        id="deleteConfirm"
        @dile-confirm-accepted="${this._confirmDelete}"
        @dile-confirm-cancelled="${this._cancelDelete}"
      >
        <p>¿Eliminar el tema "${this._pendingDeleteName}"?</p>
      </dile-confirm>
    `;
  }

  _renderDropdown(palettes) {
    return html`
      <div class="dropdown" @click="${(e) => e.stopPropagation()}">
        <div class="search-row">
          <dile-lucide-icon-search></dile-lucide-icon-search>
          <input
            class="search-input"
            type="text"
            placeholder="Buscar tema..."
            .value="${this._search}"
            @input="${this._onSearchInput}"
          />
        </div>
        <ul class="palette-list">
          ${palettes.map(palette => html`
            <li class="palette-row ${palette.name === this._activeName ? 'active' : ''}">
              <button type="button" class="palette-row-main" @click="${() => this._requestLoad(palette.name)}">
                <span class="mini-swatches">
                  <span style="background-color: ${palette.light?.['--dile-primary-color']}"></span>
                  <span style="background-color: ${palette.light?.['--dile-secondary-color']}"></span>
                  <span style="background-color: ${palette.light?.['--dile-terciary-color']}"></span>
                </span>
                <span class="palette-row-name">${palette.name}</span>
                ${palette.name === this._activeName ? html`<span class="in-use">En uso</span>` : ''}
              </button>
              <button
                type="button"
                class="icon-button danger"
                aria-label="Eliminar"
                ?disabled="${palettes.length <= 1}"
                @click="${() => this._requestDelete(palette.name)}"
              >
                <dile-lucide-icon-trash-2></dile-lucide-icon-trash-2>
              </button>
            </li>
          `)}
          ${palettes.length === 0 ? html`<li class="empty">No hay temas que coincidan.</li>` : ''}
        </ul>
      </div>
    `;
  }

  _renderGuardModal() {
    return html`
      <dile-modal opened blocking>
        <div class="guard-modal">
          <p>Tienes cambios sin guardar en <strong>${this._activeName}</strong>. ¿Qué quieres hacer?</p>
          <div class="guard-actions">
            <dile-button @click="${this._cancelPendingAction}">Cancelar</dile-button>
            <dile-button @click="${this._discardAndContinue}">Descartar cambios</dile-button>
            <dile-button @click="${this._saveAndContinue}">Guardar y cambiar</dile-button>
          </div>
        </div>
      </dile-modal>
    `;
  }

  _filteredPalettes() {
    const term = this._search.trim().toLowerCase();
    if (!term) return this._palettes;
    return this._palettes.filter(p => p.name.toLowerCase().includes(term));
  }

  _isSaved() {
    if (!this.currentTheme) return true;
    const saved = getPalette(this._activeName);
    return themesEqual(saved, this.currentTheme);
  }

  _onActiveThemeClick() {
    if (this._renaming) return;
    this._optionsMenuOpen = false;
    this._menuOpen = !this._menuOpen;
  }

  _onOptionsClick() {
    this._menuOpen = false;
    this._optionsMenuOpen = !this._optionsMenuOpen;
  }

  _onSearchInput(e) {
    this._search = e.target.value;
  }

  _dispatchLoad(theme) {
    this.dispatchEvent(new CustomEvent('dile-theme-palette-load', {
      bubbles: true,
      composed: true,
      detail: {
        light: theme.light,
        dark: theme.dark,
        darkEnabled: theme.darkEnabled,
      },
    }));
  }

  _requestSwitch(action) {
    if (this._isSaved()) {
      action();
    } else {
      this._pendingAction = action;
    }
  }

  _requestLoad(name) {
    this._menuOpen = false;
    if (name === this._activeName) return;
    this._requestSwitch(() => this._activateAndLoad(name));
  }

  _activateAndLoad(name) {
    const theme = getPalette(name);
    if (!theme) return;
    this._activeName = name;
    setActivePaletteName(name);
    this._dispatchLoad(theme);
  }

  _saveChanges() {
    if (!this.currentTheme || this._isSaved()) return;
    savePalette(this._activeName, this.currentTheme);
    this._palettes = listPalettes();
  }

  _createNewTheme() {
    this._menuOpen = false;
    this._requestSwitch(() => this._actuallyCreateNewTheme());
  }

  _actuallyCreateNewTheme() {
    const name = this._generateUniqueName('Nuevo tema');
    const theme = {
      light: getDefaultValues('light'),
      dark: getDefaultValues('dark'),
      darkEnabled: false,
    };
    savePalette(name, theme);
    this._palettes = listPalettes();
    this._activeName = name;
    setActivePaletteName(name);
    this._dispatchLoad(theme);
  }

  _duplicateActive() {
    this._optionsMenuOpen = false;
    if (!this.currentTheme) return;
    const name = this._generateUniqueName(`${this._activeName} copia`);
    savePalette(name, this.currentTheme);
    this._palettes = listPalettes();
    this._activeName = name;
    setActivePaletteName(name);
    this._dispatchLoad(this.currentTheme);
  }

  _generateUniqueName(base) {
    const existing = new Set(this._palettes.map(p => p.name));
    if (!existing.has(base)) return base;
    let i = 2;
    while (existing.has(`${base} ${i}`)) i++;
    return `${base} ${i}`;
  }

  _startRename() {
    this._optionsMenuOpen = false;
    this._renaming = true;
    this._renameValue = this._activeName;
    this.updateComplete.then(() => {
      this.shadowRoot.querySelector('.rename-input')?.select();
    });
  }

  _onRenameInput(e) {
    this._renameValue = e.target.value;
  }

  _onRenameKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._commitRename();
    } else if (e.key === 'Escape') {
      this._renaming = false;
    }
  }

  _commitRename() {
    if (!this._renaming) return;
    this._renaming = false;
    const newName = this._renameValue.trim();
    if (!newName || newName === this._activeName) return;
    if (this._palettes.some(p => p.name === newName)) {
      window.alert(`Ya existe un tema llamado "${newName}".`);
      return;
    }
    renamePalette(this._activeName, newName);
    this._activeName = newName;
    this._palettes = listPalettes();
  }

  _requestDelete(name) {
    if (this._palettes.length <= 1) return;
    this._pendingDeleteName = name;
    this.updateComplete.then(() => {
      this.shadowRoot.getElementById('deleteConfirm')?.open();
    });
  }

  _cancelDelete() {
    this._pendingDeleteName = null;
  }

  _confirmDelete() {
    const name = this._pendingDeleteName;
    this._pendingDeleteName = null;
    if (!name) return;
    deletePalette(name);
    this._palettes = listPalettes();
    if (name === this._activeName) {
      const fallback = this._palettes[0];
      this._activeName = fallback.name;
      setActivePaletteName(fallback.name);
      this._dispatchLoad(fallback);
    }
  }

  _cancelPendingAction() {
    this._pendingAction = null;
  }

  _discardAndContinue() {
    const action = this._pendingAction;
    this._pendingAction = null;
    action?.();
  }

  _saveAndContinue() {
    this._saveChanges();
    const action = this._pendingAction;
    this._pendingAction = null;
    action?.();
  }
}
