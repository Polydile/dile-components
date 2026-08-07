import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlag extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-flag')) {
  customElements.define('dile-material-icon-flag', DileIconlibFlag);
}
