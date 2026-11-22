import { LitElement, html, css } from 'lit';
import '@dile/ui/components/button/button-icon.js';
import { checkboxBlankIcon, arrowDropDownIcon, checkboxCheckedIcon, closeIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon.js';
import '@dile/ui/components/menu-overlay/menu-overlay.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudSelectAll  extends DileI18nMixin(LitElement) {

  static get styles() {
    return css`
      :host {
        display: block;
        --dile-crud-select-all-checkbox-color: #303030;
      }
      .drop {
        --dile-icon-size: var(--dile-crud-select-all-checkbox-size, 1.5rem);
      }
      dile-button-icon {
        display: flex;
        align-items: center;
        --dile-button-font-size: var(--dile-crud-list-options-font-size, 1rem);
        --dile-button-font-weight: var(--dile-crud-list-options-font-weight, bold);
        --dile-button-text-transform: var(--dile-crud-list-options-text-transform, none);
        --dile-button-letter-spacing: var(--dile-crud-list-options-letter-spacing, 0);
        --dile-button-padding-y: var(--dile-crud-list-options-padding-y, 0.5rem);
        --dile-button-padding-x: var(--dile-crud-list-options-padding-x, 0.8rem);
      }

      dile-button-icon div {
        max-width: 130px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      dile-button-icon div {
        margin-right: 0.5rem;
        display: inline-block;
      }
      .desk {
        display: none;
      }
      .content {
        padding: 0.5rem;
        font-size: 1rem;
      } 
      /* Same space between options as between the separator line and the text of .clear */
      .option {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 0.75rem 0;
      }
      .option.disabled {
        cursor: default;
      }
      /* With the limit message below the label, the icon stays next to the first line */
      .option.has-limit {
        align-items: flex-start;
      }
      .option.disabled .label {
        opacity: 0.6;
      }
      .option.disabled dile-icon {
        --dile-icon-color: var(--dile-crud-select-all-overlay-checkbox-disabled-color, #c0c0c0);
      }
      .text {
        display: flex;
        flex-direction: column;
      }
      .limit {
        margin-top: 0.125rem;
        font-size: var(--dile-crud-select-all-limit-font-size, 0.8rem);
        line-height: 1.25;
        color: var(--dile-crud-select-all-limit-color, inherit);
      }
      /* The same space above the first option as below the last one (.clear) */
      .option:first-child {
        margin-top: 0.25rem;
      }
      /* The bottom margin plus the padding of .content matches the space above the text */
      .clear {
        border-top: 1px solid var(--dile-crud-select-all-separator-color, #ddd);
        padding-top: 0.75rem;
        margin-bottom: 0.25rem;
      }
      .option dile-icon {
        --dile-icon-size: var(--dile-crud-select-all-checkbox-size, 1.5rem);
        --dile-icon-color: var(--dile-crud-select-all-overlay-checkbox-color, #303030);
        margin-right: 0.5rem;
      }

      @media(min-width: 700px) {
        .desk {
          display: inline;
        }
      }

      @media(min-width: 500px) {
        dile-menu-overlay {
          --dile-menu-overlay-width: 420px;
        }
      }
    `;
  }

  static get properties() {
    return {
      mainChecked: { type: Boolean },
      pageChecked: { type: Boolean },
      allChecked: { type: Boolean },
      pageSize: { type: Number },
      numItems: { type: Number },
      disablePagination: { type: Boolean },
      maxBatchActionItems: { type: Number },
      selectedCount: { type: Number },
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disablePagination = false;
    this.selectedCount = 0;
  }

  render() {
    return this.elementTemplate;
  }

  get elementTemplate() {
    return html`
        <dile-menu-overlay>
          <dile-button-icon no-wrap small .icon="${this.selectIcon(this.mainChecked)}" slot="trigger">
            <div>${this.translations.select} <span class="desk">${this.translations.all}</span></div>
            <dile-icon .icon=${arrowDropDownIcon} class="drop"></dile-icon>
          </dile-button-icon>
          <div slot="content" class="content">
            ${this.disablePagination
              ? ''
              : this.optionTemplate(
                  this.translations.all_in_page,
                  this.pageItemsCount,
                  this.pageChecked,
                  this.checkPageItems,
                  this.translations.select_page_limit_exceeded
                )
            }
            ${this.optionTemplate(
              this.translations.select_matching,
              this.numItems,
              this.allChecked,
              this.checkAllItems,
              this.translations.select_matching_limit_exceeded
            )}
            ${this.clearSelectionTemplate}
          </div>
        </dile-menu-overlay>
      `;
  }

  // Options over the limit are shown disabled instead of hidden, with the reason just below
  // their label, so the user knows why they can't select those items.
  optionTemplate(label, count, checked, handler, limitMessage) {
    const disabled = this.exceedsLimit(count);
    return html`
      <p class="option ${disabled ? 'disabled has-limit' : ''}" aria-disabled=${disabled ? 'true' : 'false'} @click=${disabled ? null : handler}>
        <dile-icon .icon=${this.selectIcon(checked)} class="drop"></dile-icon>
        <span class="text">
          <span class="label">${label} (${count})</span>
          ${disabled
            ? html`<span class="limit">${limitMessage(this.maxBatchActionItems)}</span>`
            : ''
          }
        </span>
      </p>
    `;
  }

  // Always visible so the user knows it exists, disabled while nothing is selected.
  get clearSelectionTemplate() {
    const disabled = !(this.selectedCount > 0);
    return html`
      <p
        class="option clear ${disabled ? 'disabled' : ''}"
        role="button"
        aria-disabled=${disabled ? 'true' : 'false'}
        @click=${disabled ? null : this.clearSelection}
      >
        <dile-icon .icon=${closeIcon} class="drop"></dile-icon>
        <span class="label">${this.translations.clear_selection}${disabled ? '' : ` (${this.selectedCount})`}</span>
      </p>
    `;
  }

  get pageItemsCount() {
    return this.pageSize > this.numItems ? this.numItems : this.pageSize;
  }

  exceedsLimit(count) {
    return Number.isFinite(this.maxBatchActionItems) && count > this.maxBatchActionItems;
  }

  selectIcon(checked) {
    return checked ? checkboxCheckedIcon : checkboxBlankIcon;
  }

  checkPageItems(e) {
    if(! this.pageChecked) {
      this.mainChecked = true;
      this.pageChecked = true;
      this.allChecked = false;
    } else {
      this.mainChecked = false;
      this.pageChecked = false;
      this.allChecked = false;
    }
    this.dispatchCheked();
  } 

  checkAllItems(e) {
    if(! this.allChecked) {
      this.mainChecked = true;
      this.pageChecked = false;
      this.allChecked = true;
    } else {
      this.mainChecked = false;
      this.pageChecked = false;
      this.allChecked = false;
    }
    this.dispatchCheked();
  }

  dispatchCheked() {
    this.dispatchEvent(new CustomEvent('crud-select-all', {
      bubbles: true,
      composed: true,
      detail: {
        pageChecked: this.pageChecked,
        allChecked: this.allChecked,
      }
    }));
  }

  // Unchecking both options makes dile-crud-list empty the selection, including the items
  // checked one by one.
  clearSelection() {
    this.reset();
  }

  reset() {
    this.resetWithoutDispatch();
    this.dispatchCheked();
  }

  resetWithoutDispatch() {
    this.mainChecked = false;
    this.pageChecked = false;
    this.allChecked = false;
  }
}