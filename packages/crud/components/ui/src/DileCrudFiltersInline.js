import { DileCrudFilters } from './DileCrudFilters.js';
import { html, css } from 'lit';
import '@dile/ui/components/card/card.js';

export class DileCrudFiltersInline extends DileCrudFilters {
  static get styles() {
    return css`
      :host {
          display: block;
      }
      dile-card {
          margin: var(--dile-crud-filters-inline-margin, 0.5rem 0) !important;
          --dile-card-background-color: var(--dile-crud-filters-inline-background-color, var(--dile-gray-very-light-color, #f5f5f5));
          --dile-card-text-color
          --dile-card-border: var(--dile-crud-filters-inline-border, none);
      }
      dile-crud-filters-form {
          display: grid;
          align-items: center;
      }
      @media (min-width: 500px) {
          dile-crud-filters-form {
              gap: var(--dile-crud-filters-inline-gap, 1rem);
              grid-template-columns: var(--dile-crud-filters-inline-columns-medium, 1fr 1fr);
          }
      }
      @media (min-width: 1200px) {
          dile-crud-filters-form {
              grid-template-columns: var(--dile-crud-filters-inline-columns-large, 1fr 1fr 1fr);
          }
      }
    `;
  }

  render() {
      return html`
        <dile-card>
          ${this.formTemplate}
        </dile-card>
    `
    }
}
