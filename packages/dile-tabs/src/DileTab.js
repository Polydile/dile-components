import { html, css, LitElement } from "lit";

export class DileTab  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 0 3px;
      }
      article {
        border-top-left-radius: var(--dile-tab-border-radius, 4px);
        border-top-right-radius: var(--dile-tab-border-radius, 4px);
        transition: all 0.3s ease;
        color: var(--dile-tab-text-color, #666);
        background-color: var(--dile-tab-background-color, transparent);
        cursor: pointer;
        border: var(--dile-tab-border, none);
        font-weight: var(--dile-tab-font-weight, normal);
      }
      div.label {
        padding: var(--dile-label-padding, 8px 12px 6px 12px);
        text-transform: var(--dile-tab-text-transform, uppercase);
        white-space: nowrap;
      }
      .selected {
        background-color: var(--dile-tab-selected-background-color, #039be5);
        color: var(--dile-tab-selected-text-color, #fff);
        border: var(--dile-tab-selected-border, none);
      }
      span {
        display: block;
        height: var(--dile-tab-selected-line-height, 5px);
        width: 0;
        background-color: var(--dile-tab-selected-line-color, #0070c0);
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

  static get properties() {
    return {
      selected: { type: Boolean },
      index: { type: Number },
    };
  }

  constructor() {
    super();
    this.selected = false;
  }

  render() {
    return html`
      <article @click='${this.select}' class="${this.selected ? 'selected' : ''}">
        <div class="label"><slot></slot></div>
        <div class="line">
          <span class="${this.selected ? 'markselected' : ''}"></span>
        </div>
      </article>
    `;
  }

  select() {
    this.dispatchEvent(new CustomEvent('dile-item-selected', {
      bubbles: true,
      composed: true,
      detail: this
    }));
  }
}
