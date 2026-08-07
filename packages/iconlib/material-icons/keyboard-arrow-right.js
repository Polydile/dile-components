import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibKeyboardArrowRight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-keyboard-arrow-right')) {
  customElements.define('dile-material-icon-keyboard-arrow-right', DileIconlibKeyboardArrowRight);
}
