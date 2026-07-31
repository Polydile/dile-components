import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFlashOn extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`;
  }
}

customElements.define('dile-material-icon-flash-on', DileIconlibFlashOn);
