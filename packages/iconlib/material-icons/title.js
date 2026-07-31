import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTitle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>`;
  }
}

customElements.define('dile-material-icon-title', DileIconlibTitle);
