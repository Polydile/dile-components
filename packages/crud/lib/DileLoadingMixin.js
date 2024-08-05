import { html, css } from 'lit';
import '@dile/ui/components/spinner/spinner.js';

export const loadingStyles = css`
    .loading {
      padding: var(--dile-crud-list-loading-padding, 3rem 1rem);
      text-align: center;
    }
`

export const DileLoadingMixin = (superclass) => class extends superclass {

  static get properties() {
    return {
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = true;
  }

  get loadingTemplate() {
    return html`
      <div class="loading">
          <dile-spinner active></dile-spinner>
      </div>
    `;
  }
}