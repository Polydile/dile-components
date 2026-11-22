import { LitElement, html, css } from 'lit';
import '@dile/ui/components/button/button-icon.js';
import { checkboxBlankIcon, arrowDropDownIcon, checkboxCheckedIcon } from '@dile/icons';
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
      .option {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .option.disabled {
        cursor: default;
        opacity: 0.6;
      }
      .limit {
        margin: 0 0 0.5rem 0;
        font-size: var(--dile-crud-select-all-limit-font-size, 0.875rem);
        color: var(--dile-crud-select-all-limit-color, inherit);
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
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disablePagination = false;
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
                  this.checkPageItems
                )
            }
            ${this.optionTemplate(
              this.translations.select_matching,
              this.numItems,
              this.allChecked,
              this.checkAllItems
            )}
            ${this.exceedsLimit(this.numItems)
              ? html`<p class="limit">${this.translations.select_limit_exceeded(this.numItems, this.maxBatchActionItems)}</p>`
              : ''
            }
          </div>
        </dile-menu-overlay>
      `;
  }

  // Options over the limit are shown disabled instead of hidden, so the user knows why
  // they can't select everything.
  optionTemplate(label, count, checked, handler) {
    const disabled = this.exceedsLimit(count);
    return html`
      <p class="option ${disabled ? 'disabled' : ''}" aria-disabled=${disabled ? 'true' : 'false'} @click=${disabled ? null : handler}>
        <dile-icon .icon=${this.selectIcon(checked)} class="drop"></dile-icon>
        <span>${label} (${count})</span>
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