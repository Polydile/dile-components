import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCheck extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-check')) {
  customElements.define('dile-material-icon-check', DileIconlibCheck);
}
