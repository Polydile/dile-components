import { LitElement, html, css } from 'lit';
import { DileAppNavigate } from '../lib/DileAppNavigate';
import { DileState } from '../lib/DileState.js';
import '@dile/ui/components/spinner/spinner-block.js';

export const DileAuthGuard = (store) => class extends DileAppNavigate(DileState(store)(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      loaded: { type: Boolean },
      pageTitle: { type: String },
    };
  }

  constructor() {
    super();
    this.pageTitle = '';
    console.log('soy auth guard');
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    eeste es el auth guard
      ${this.loaded
        ? html`<slot></slot>`
        : this.loadingTemplate
      }
      
    `;
  }

  firstUpdated() {
    const currentState = this.getState();
    this.stateChanged(currentState);
  }

  stateChanged(state) {
    if(!state) return;
    if (state.user.isInitialized) {
      if(state.user.isLoggedIn && state.user.userData.is_admin === true) {
        this.loaded = true;
      } else {
        this.goToUrl('/', this.pageTitle);
      }
    } 
  }

  get loadingTemplate() {
    return  html`
      <dile-spinner-block></dile-spinner-block>
    `;
  }
}
