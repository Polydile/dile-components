import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 6h12v12H6z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-stop')) {
  customElements.define('dile-material-icon-stop', DileIconlibStop);
}
