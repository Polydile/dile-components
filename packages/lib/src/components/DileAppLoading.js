import { LitElement, html, css } from 'lit';
import { DileState } from '../lib/DileState.js';
import '@dile/ui/components/spinner/spinner-modal';

export const DileAppLoading = (store) => class extends DileState(store)(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      loading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.loading = false;
  }

  render() {
    return html`
      <dile-spinner-modal ?active=${this.loading}></dile-spinner-modal>
    `;
  }

  stateChanged(state) {
    this.loading = state.feedback.loading;
  }
}
