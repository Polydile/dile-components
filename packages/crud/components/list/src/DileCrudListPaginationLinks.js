import { LitElement, html, css } from 'lit';
import '../../ui/crud-pagination-nav-button';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileCrudListPaginationLinks extends DileI18nMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      .pagination {
        margin-top: 1rem;
        display: grid;
        align-items: center;
        grid-template-columns: auto 1fr auto;
      }
      .pagination-summary, .pagination-summary-one-page {
          text-align: center;
          font-size: 0.8em;
      }
      .pagination-summary-one-page {
          text-align: center;
          padding-top: 0.5rem;
          width: 100%;
          margin-bottom: -0.4rem;
      }
      .pagination-prev {
        margin-left: 0.5rem;
      }
      .pagination-next {
          margin-right: 0.5rem;
      }
    `
  ];

  static get properties() {
    return {
      paginationData: { type: Object },
      pageSize: { type: Number },
      numItems: { type: Number },
    };
  }

  render() {
    if (this.numPages(this.numItems, this.pageSize) > 1) {
      return html`
          <div class="pagination">
              <span class="pagination-prev">
                  <dile-crud-pagination-nav-button 
                    @click=${this.goPrev} 
                    ?disabled="${!this.paginationData.prevPage}" 
                    direction="left"
                  ></dile-crud-pagination-nav-button>
              </span>
              <span class="pagination-summary">
                  ${this.translations.current_page(this.paginationData.currentPage, this.numPages(this.numItems, this.pageSize))}
              </span>
              <span class="pagination-next">
                  <dile-crud-pagination-nav-button 
                    @click=${this.goNext}
                    ?disabled="${!this.paginationData.nextPage}"
                    direction="right"
                  ></dile-crud-pagination-nav-button>
              </span>
          </div>
      `
    } else {
      return html`
          <div class="pagination-summary-one-page">
                  ${this.translations.one_page}
          </div>
      `;
    }
  }

  numPages(count, size) {
      const result = Math.ceil(count / size);
      if(isNaN(result)) {
          return "";
      }
      return result;
  }

  goPrev() {
    this.dispatchEvent(new CustomEvent('crud-pagination-prev'));
  }
  goNext() {
    this.dispatchEvent(new CustomEvent('crud-pagination-next'));
  }
}