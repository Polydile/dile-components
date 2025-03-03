export const DileAppNavigate = (superclass) => class extends superclass {
  goToUrl(url, title = '') {
    console.log('app navigate', url, title)
    document.dispatchEvent(new CustomEvent('dile-lib-navigate', {
      bubbles: true,
      composed: true,
      detail: {
        url,
        title,
      }
    }));
  }
}