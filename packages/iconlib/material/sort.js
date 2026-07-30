import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSort extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>`;
  }
}

customElements.define('dile-material-icon-sort', DileIconlibSort);
