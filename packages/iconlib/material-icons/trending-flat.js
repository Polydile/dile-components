import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrendingFlat extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 12l-4-4v3H3v2h15v3z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-trending-flat')) {
  customElements.define('dile-material-icon-trending-flat', DileIconlibTrendingFlat);
}
