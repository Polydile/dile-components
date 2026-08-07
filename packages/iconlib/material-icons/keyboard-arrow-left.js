import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibKeyboardArrowLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-keyboard-arrow-left')) {
  customElements.define('dile-material-icon-keyboard-arrow-left', DileIconlibKeyboardArrowLeft);
}
