import { Routes, Router } from '@lit-labs/router';

export const DileAppRouter = (superclass) => class extends superclass {

  static get properties() {
    return {
      _routes: { type: Object },
    };
  }

  constructor() {
    super();
    this.navigateHandler = this.programaticNavigation.bind(this);
  }

  programaticNavigation(e) {
    const title = e.detail.title;
    const url = e.detail.url;
    history.pushState(
      null, 
      title || 'App', 
      url);
    setTimeout(() => this._routes.goto(e.detail.url), 100);

    if(title) {
      document.title = title;
    }
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
    new Router(this, []);

    this._routes = new Routes(this, routes);
  }
}