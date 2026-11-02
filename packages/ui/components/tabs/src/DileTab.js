import { html, css, LitElement } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { DileSelectableItem } from "../../../mixins/selectable/index.js";

export class DileTab  extends DileSelectableItem(LitElement) {

  static get properties() {
    return {
      href: { type: String },
      target: { type: String },
      /** If this tab is in the page tab sequence. dile-tabs keeps it true only on one of its tabs */
      tabbable: { type: Boolean, attribute: false },
    };
  }

  constructor() {
    super();
    this.tabbable = true;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 0 3px;
      }
      .tab {
        appearance: none;
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 0;
        border-radius: 0;
        font: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        text-align: inherit;
        text-transform: inherit;
        text-decoration: none;
        border-top-left-radius: var(--dile-tab-border-radius, 4px);
        border-top-right-radius: var(--dile-tab-border-radius, 4px);
        transition: all 0.3s ease;
        color: var(--dile-tab-text-color, var(--dile-on-primary-color, #666));
        background-color: var(--dile-tab-background-color, var(--dile-primary-color, #eee));
        cursor: pointer;
        border: var(--dile-tab-border, none);
        font-weight: var(--dile-tab-font-weight, normal);
        font-size: var(--dile-tab-font-size, 1rem);
      }
      .tab:focus-visible {
        outline: var(--dile-tab-focus-ring-width, 2px) solid var(--dile-tab-focus-ring-color, currentColor);
        outline-offset: var(--dile-tab-focus-ring-offset, -2px);
        transition-property: background-color, color;
      }
      .label {
        display: block;
        padding: var(--dile-tab-padding, 8px 12px 6px 12px);
        text-transform: var(--dile-tab-text-transform, uppercase);
        white-space: nowrap;
      }
      .selected {
        background-color: var(--dile-tab-selected-background-color, var(--dile-primary-dark-color, #888));
        color: var(--dile-tab-selected-text-color, var(--dile-on-primary-dark-color, #000));
        border: var(--dile-tab-selected-border, none);
      }
      .mark {
        display: block;
        height: var(--dile-tab-selected-line-height, 5px);
        width: 0;
        background-color: var(--dile-tab-selected-line-color, var(--dile-secondary-color, #333));
        transition: width 0.3s ease;
      }
      .markselected {
        width: 100%;
      }
      .line {
        display: flex;
        justify-content: center;
      }
    `;
  }

  render() {
    const tabClass = `tab ${this.selected ? 'selected' : ''}`;
    const ariaSelected = this.selected ? 'true' : 'false';
    const tabindex = this.tabbable ? '0' : '-1';
    if (this.href) {
      return html`
        <a
          href="${this.href}"
          target="${ifDefined(this.target)}"
          class="${tabClass}"
          role="tab"
          aria-selected="${ariaSelected}"
          tabindex="${tabindex}"
          @click="${this.select}"
          @keydown="${this._onLinkKeydown}"
        >${this.tabTemplate}</a>
      `;
    }
    return html`
      <button
        type="button"
        class="${tabClass}"
        role="tab"
        aria-selected="${ariaSelected}"
        tabindex="${tabindex}"
        @click="${this.select}"
      >${this.tabTemplate}</button>
    `;
  }

  get tabTemplate() {
    return html`
      <span class="label"><slot></slot></span>
      <span class="line">
        <span class="mark ${this.selected ? 'markselected' : ''}"></span>
      </span>
    `;
  }

  // A native link is only activated with Enter
  _onLinkKeydown(e) {
    if (e.key === ' ') {
      e.preventDefault();
      if (!e.repeat) {
        e.currentTarget.click();
      }
    }
  }

  focus(options) {
    this.shadowRoot?.querySelector('.tab')?.focus(options);
  }
}
