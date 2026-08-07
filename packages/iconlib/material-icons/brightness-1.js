import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrightness1 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-brightness-1')) {
  customElements.define('dile-material-icon-brightness-1', DileIconlibBrightness1);
}
