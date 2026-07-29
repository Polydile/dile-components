import { LitElement, html, css } from 'lit';
import { contentCopyIcon } from '@dile/icons';
import '@dile/ui/components/floating-feedback/floating-feedback.js';
import './theme-mode-switch.js';
import './theme-palette-bar.js';
import './theme-components-preview.js';
import { variableGroups, previewPairs, mainColorBlocks, variationColorBlocks, getVariableMeta, getDefaultValues, calculateVariations } from './theme-variables.js';

const colorBlocksByGroup = {
  main: mainColorBlocks,
  variations: variationColorBlocks,
};
import { generateThemeCss } from './generate-theme-css.js';
import { readDraft, saveDraft } from './theme-storage.js';
import { contrastRatio, describeContrast } from './contrast.js';

export class DileThemeBuilder extends LitElement {

  static get properties() {
    return {
      _lightValues: { state: true },
      _darkValues: { state: true },
      _darkEnabled: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --dile-nav-column-gap: 1rem;
        --dile-nav-padding-x: 1rem;
        --dile-input-label-font-size: 0.8rem;
        --dile-input-label-margin-bottom: 2px;
        --dile-tab-background-color: transparent;
        --dile-tab-text-color: #767676;
        --dile-tab-selected-background-color: transparent;
        --dile-tab-selected-text-color: var(--dile-on-background-color, #232323);
        --dile-tab-selected-line-color: var(--dile-primary-dark-color);
        --dile-tab-selected-line-height: 3px;
        --dile-tab-border-radius: 0;
        --dile-tab-text-transform: none;
        --dile-tab-font-weight: 600;
        --dile-tab-padding: 0.6rem 1rem 0.5rem;
      }
      dile-color-picker {margin-bottom: 0.2rem;}
      .control-panel {
        margin-bottom: 2rem;
        border: 1px solid var(--dile-gray-very-light-color, #f5f5f5);
        border-radius: 10px;
        background-color: var(--dile-background-color, #fff);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        overflow: hidden;
      }
      .control-row {
        padding: 1rem 1.25rem;
      }
      .control-row + .control-row {
        border-top: 1px solid var(--dile-very-light-color, #f5f5f5);
      }
      .control-row--split {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .toolbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }
      .mode-selector {
        margin-bottom: 1.25rem;
      }
      .layout {
        display: grid;
        grid-template-columns: 2fr 3fr;
        gap: 2rem;
        align-items: start;
      }
      @media (max-width: 750px) {
        .layout {
          grid-template-columns: 1fr;
        }
      }
      h3 {
        margin-bottom: 0.5rem;
      }
      .group {
        margin-bottom: 1.5rem;
      }
      .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .group-header h3 {
        margin-bottom: 0;
      }
      .fields {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 0.5rem 1rem;
      }
      .color-blocks {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .color-block {
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        padding: 0.2rem 0.5rem 0.2rem;
        background-color: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }
      .color-block h4 {
        margin: 0 0 0.05rem;
        font-size: 0.95em;
      }
      .color-block-fields {
        display: flex;
        flex-wrap: wrap;
        gap: 0.15rem 1rem;
      }
      .swatch-section {
        margin-bottom: 1.5rem;
      }
      .swatch {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        padding: 0.35rem 0.65rem;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }
      .swatch.copyable {
        cursor: pointer;
        transition: box-shadow 0.15s ease;
      }
      .swatch.copyable:hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
      }
      .swatch.copyable:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
      }
      .swatch-copy-icon {
        position: absolute;
        bottom: 0.3rem;
        right: 0.3rem;
        display: flex;
        opacity: 0.55;
      }
      .swatch-copy-icon svg {
        width: 14px;
        height: 14px;
        display: block;
        fill: currentColor;
      }
      .contrast {
        font-size: 0.85em;
        opacity: 0.85;
      }
      .variations .swatch {
        padding: 0.3rem;
        font-size: 0.85em;
      }
      .background-swatch {
        padding: 1.5rem;
        gap: 1rem;
      }
      .nested-swatch-grid {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .compact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 0.5rem;
      }
      .swatch.compact {
        padding: 0.4rem 0.75rem;
        gap: 0.15rem;
      }
      .variation-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .variation-group + .variation-group,
      .variation-group + .compact-grid {
        margin-top: 0.75rem;
      }
      .preview dile-tabs {
        margin-bottom: 1rem;
      }
    `;
  }

  constructor() {
    super();
    const draft = readDraft() || {};
    this._lightValues = { ...getDefaultValues('light'), ...(draft.light || {}) };
    this._darkValues = { ...getDefaultValues('dark'), ...(draft.dark || {}) };
    this._darkEnabled = draft.darkEnabled || false;
  }

  render() {
    return html`
      <div class="control-panel">
        <div class="control-row">
          <dile-theme-palette-bar
            .currentTheme="${{ light: this._lightValues, dark: this._darkValues, darkEnabled: this._darkEnabled }}"
            @dile-theme-palette-load="${this._onPaletteLoad}"
          ></dile-theme-palette-bar>
        </div>
        <div class="control-row control-row--split">
          <dile-theme-mode-switch
            name="dark-theme-enabled"
            ?checked="${this._darkEnabled}"
            @element-changed="${this._onDarkToggle}"
          ></dile-theme-mode-switch>
          <dile-button @click="${this._download}">Download theme.css</dile-button>
        </div>
      </div>
      ${this._darkEnabled ? this._renderModeSwitcher() : this._renderThemeLayout(this._lightValues, 'light')}
    `;
  }

  _renderModeSwitcher() {
    return html`
      <dile-tabs
        class="mode-selector"
        attrForSelected="name"
        selectorId="theme-builder-mode"
        selected="light"
      >
        <dile-tab name="light">Light theme</dile-tab>
        <dile-tab name="dark">Dark theme</dile-tab>
      </dile-tabs>
      <dile-pages attrForSelected="name" selectorId="theme-builder-mode" selected="light">
        <div name="light">${this._renderThemeLayout(this._lightValues, 'light')}</div>
        <div name="dark">${this._renderThemeLayout(this._darkValues, 'dark')}</div>
      </dile-pages>
    `;
  }

  _renderThemeLayout(values, mode) {
    return html`
      <div @element-changed="${(e) => this._onColorChange(e, mode)}">
        <div class="toolbar">
          <dile-button @click="${() => this._reset(mode)}">Reset to defaults</dile-button>
        </div>
        <div class="layout">
          <section class="editor">
            ${variableGroups.map(group => this._renderGroup(group, values, mode))}
          </section>
          <section class="preview">
            <dile-tabs attrForSelected="name" selectorId="theme-builder-preview-${mode}" selected="palette">
              <dile-tab name="palette">Palette preview</dile-tab>
              <dile-tab name="components">Components preview</dile-tab>
            </dile-tabs>
            <dile-pages attrForSelected="name" selectorId="theme-builder-preview-${mode}" selected="palette">
              <div name="palette">
                ${this._renderMainPreview(values)}
                ${this._renderVariationsPreview(values)}
              </div>
              <div name="components">
                <dile-theme-components-preview .values="${values}"></dile-theme-components-preview>
              </div>
            </dile-pages>
          </section>
        </div>
      </div>
    `;
  }

  _renderGroup(group, values, mode) {
    const blocks = colorBlocksByGroup[group.id];
    return html`
      <div class="group">
        <div class="group-header">
          <h3>${group.title}</h3>
          ${group.id === 'variations' ? html`
            <dile-button style="margin-bottom: 0.5rem;" @click="${() => this._autoCalculateVariations(mode)}">Calculate automatically</dile-button>
          ` : ''}
        </div>
        ${blocks ? this._renderColorBlocks(blocks, values) : this._renderFields(group.variables, values)}
      </div>
    `;
  }

  _renderColorBlocks(blocks, values) {
    return html`
      <div class="color-blocks">
        ${blocks.map(block => html`
          <div class="color-block">
            <h4>${block.label}</h4>
            <div class="color-block-fields">
              ${block.variables.map(name => {
                const meta = getVariableMeta(name);
                return html`
                  <dile-color-picker
                    name="${name}"
                    label="${meta.label}"
                    value="${values[name]}"
                  ></dile-color-picker>
                `;
              })}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  _renderFields(variables, values) {
    return html`
      <div class="fields">
        ${variables.map(variable => html`
          <dile-color-picker
            name="${variable.name}"
            label="${variable.label}"
            value="${values[variable.name]}"
          ></dile-color-picker>
        `)}
      </div>
    `;
  }

  _renderMainPreview(values) {
    const highlightedBgs = ['--dile-primary-color', '--dile-secondary-color', '--dile-terciary-color', '--dile-neutral-color'];
    const backgroundPair = previewPairs.find(pair => pair.bg === '--dile-background-color');
    const otherPairs = previewPairs.filter(pair => pair.group === 'main' && pair.bg !== '--dile-background-color' && pair.bg !== '--dile-gray-very-light-color');
    const highlightedPairs = otherPairs.filter(pair => highlightedBgs.includes(pair.bg));
    const compactPairs = otherPairs.filter(pair => !highlightedBgs.includes(pair.bg));
    return html`
      <div class="swatch-section main">
        <div
          class="swatch background-swatch"
          style="background-color: ${values[backgroundPair.bg]}; color: ${values[backgroundPair.text]}"
        >
          <strong>Preview</strong>
          <span>Color combination of your theme.</span>
          <a href="#" style="color: ${values['--dile-link-color']}">Sample link</a>
          <div class="nested-swatch-grid">
            ${highlightedPairs.map(pair => this._renderColorSwatch(pair, values))}
            <div class="compact-grid">
              ${compactPairs.map(pair => this._renderColorSwatch(pair, values, { compact: true, hideSample: true }))}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _renderVariationsPreview(values) {
    const findPair = bg => previewPairs.find(pair => pair.bg === bg);
    const backgroundPair = previewPairs.find(pair => pair.bg === '--dile-background-color');

    const sections = [
      {
        label: 'Primary',
        baseBg: '--dile-primary-color',
        baseText: '--dile-on-primary-color',
        pairs: [
          findPair('--dile-primary-light-color'),
          findPair('--dile-primary-lighter-color'),
          findPair('--dile-primary-dark-color'),
          findPair('--dile-primary-darker-color'),
        ],
      },
      {
        label: 'Secondary',
        baseBg: '--dile-secondary-color',
        baseText: '--dile-on-secondary-color',
        pairs: [
          findPair('--dile-secondary-light-color'),
          findPair('--dile-secondary-lighter-color'),
          findPair('--dile-secondary-dark-color'),
          findPair('--dile-secondary-darker-color'),
        ],
      },
      {
        label: 'Terciary',
        baseBg: '--dile-terciary-color',
        baseText: '--dile-on-terciary-color',
        pairs: [
          findPair('--dile-terciary-light-color'),
          findPair('--dile-terciary-lighter-color'),
          findPair('--dile-terciary-dark-color'),
          findPair('--dile-terciary-darker-color'),
        ],
      },
      {
        label: 'Neutral',
        baseBg: '--dile-neutral-color',
        baseText: '--dile-on-neutral-color',
        pairs: [
          findPair('--dile-gray-very-light-color'),
          findPair('--dile-gray-dark-color'),
        ],
      },
    ];

    return html`
      <div class="swatch-section variations">
        <h3>Variations preview</h3>
        <div
          class="swatch background-swatch"
          style="background-color: ${values[backgroundPair.bg]}; color: ${values[backgroundPair.text]}"
        >
          ${sections.map(section => html`
            <div class="variation-group">
              <div
                class="swatch compact"
                style="background-color: ${values[section.baseBg]}; color: ${values[section.baseText]}"
              >
                <strong>${section.label}</strong>
              </div>
              <div class="compact-grid">
                ${section.pairs.map(pair => this._renderColorSwatch(pair, values, { hideSample: true }))}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _renderColorSwatch(pair, values, { compact = false, hideSample = false } = {}) {
    const bg = values[pair.bg];
    const text = values[pair.text];
    const ratio = contrastRatio(bg, text);
    return html`
      <div
        class="swatch copyable ${compact ? 'compact' : ''}"
        style="background-color: ${bg}; color: ${text}"
        role="button"
        tabindex="0"
        title="Click to copy ${bg}"
        @click="${(e) => this._copySwatchColor(e.currentTarget, bg)}"
        @keydown="${(e) => this._onSwatchKeydown(e, bg)}"
      >
        <strong>${pair.label}</strong>
        ${hideSample ? '' : html`<span>Sample text.</span>`}
        <span class="contrast">Contrast ${ratio.toFixed(2)}:1 (${describeContrast(ratio)})</span>
        <dile-floating-feedback class="swatch-copy-icon" feedback="Copied ${bg}">
          ${contentCopyIcon}
        </dile-floating-feedback>
      </div>
    `;
  }

  async _copySwatchColor(swatchElement, color) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(color);
      }
      swatchElement.querySelector('dile-floating-feedback')?.show();
    } catch (error) {
      console.error('Failed to copy color:', error);
    }
  }

  _onSwatchKeydown(e, color) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._copySwatchColor(e.currentTarget, color);
    }
  }

  _onColorChange(e, mode) {
    const { name, value } = e.detail;
    const target = mode === 'dark' ? this._darkValues : this._lightValues;
    if (!(name in target)) return;
    if (mode === 'dark') {
      this._darkValues = { ...this._darkValues, [name]: value };
    } else {
      this._lightValues = { ...this._lightValues, [name]: value };
    }
    this._persist();
  }

  _onDarkToggle(e) {
    this._darkEnabled = e.detail.value;
    this._persist();
  }

  _reset(mode) {
    if (mode === 'dark') {
      this._darkValues = getDefaultValues('dark');
    } else {
      this._lightValues = getDefaultValues('light');
    }
    this._persist();
  }

  _autoCalculateVariations(mode) {
    const values = mode === 'dark' ? this._darkValues : this._lightValues;
    const updates = calculateVariations(values, mode);
    if (mode === 'dark') {
      this._darkValues = { ...this._darkValues, ...updates };
    } else {
      this._lightValues = { ...this._lightValues, ...updates };
    }
    this._persist();
  }

  _persist() {
    saveDraft({
      light: this._lightValues,
      dark: this._darkValues,
      darkEnabled: this._darkEnabled,
    });
  }

  _onPaletteLoad(e) {
    const { light, dark, darkEnabled } = e.detail;
    this._lightValues = { ...getDefaultValues('light'), ...(light || {}) };
    this._darkValues = { ...getDefaultValues('dark'), ...(dark || {}) };
    this._darkEnabled = !!darkEnabled;
    this._persist();
  }

  _download() {
    let css = generateThemeCss(this._lightValues, ':root');
    if (this._darkEnabled) {
      css += `\n${generateThemeCss(this._darkValues, ':root.dark-theme')}`;
    }
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.css';
    a.click();
    URL.revokeObjectURL(url);
  }
}
