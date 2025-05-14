import { Routes, Router } from '@lit-labs/router';

export const DileAppRouter = (superclass) => class extends superclass {

  static get properties() {
    return {
      _routes: { type: Object },
      _router: { type: Object },
    };
  }

  constructor() {
    super();
    this.navigateHandler = this.programaticNavigation.bind(this);
  }

  programaticNavigation(e) {
    history.pushState(
      null, 
      e.detail.url || 'App', 
      e.detail.url);
    setTimeout(() => this._routes.goto(e.detail.url), 100);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('dile-lib-navigate', this.navigateHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('dile-lib-navigate', this.navigateHandler); 
  }

  createRoutes(routes) {
    this._router = new Router(this, routes);

    //this._routes = new Routes(this, routes);
  }
}