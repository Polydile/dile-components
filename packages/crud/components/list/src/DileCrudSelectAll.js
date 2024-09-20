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
        --dile-icon-color: #303030;
      }
      .drop {
        --dile-icon-size: 1.5rem;
      }
      dile-button-icon {
        display: flex;
        align-items: center;
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
      .option dile-icon {
        --dile-icon-size: 1.5rem;
        --dile-icon-color: var(--primary-dark-color, #303030);
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
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disablePagination = false;
  }

  render() {
    return html`
      <dile-menu-overlay>
        <dile-button-icon no-wrap small .icon="${this.selectIcon(this.mainChecked)}" slot="trigger">
          <div>${this.translations.select} <span class="desk">${this.translations.all}</span></div>
          <dile-icon .icon=${arrowDropDownIcon} class="drop"></dile-icon>
        </dile-button-icon>
        <div slot="content" class="content">
          ${this.disablePagination
            ? ''
            : html`
              <p class="option" @click=${this.checkPageItems}>
                <dile-icon .icon=${this.selectIcon(this.pageChecked)} class="drop"></dile-icon>
                <span>
                  ${this.translations.all_in_page} 
                  (${this.pageSize > this.numItems ? this.numItems : this.pageSize})
                </span>
              </p>
            `
          }
          <p class="option" @click=${this.checkAllItems}>
            <dile-icon .icon=${this.selectIcon(this.allChecked)} class="drop"></dile-icon>
            <span>
              ${this.translations.select_matching}
              (${this.numItems})
            </span>
          </p>
        </div>
      </dile-menu-overlay>
    `;
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