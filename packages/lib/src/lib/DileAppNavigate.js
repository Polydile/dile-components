export const DileAppNavigate = (superclass) => class extends superclass {
  goToUrl(url, title = '') {
    document.dispatchEvent(new CustomEvent('dile-lib-navigate', {
      bubbles: true,
      composed: true,
      detail: {
        url,
        title,
      }
    }));
  }

  routerLinkHandler(e) {
    e.preventDefault();
    this.goToUrl(e.target.getAttribute('href'));
  }
}