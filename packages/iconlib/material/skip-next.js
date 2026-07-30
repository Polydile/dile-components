import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSkipNext extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
  }
}

customElements.define('dile-material-icon-skip-next', DileIconlibSkipNext);
