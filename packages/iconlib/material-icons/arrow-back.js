import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowBack extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;
  }
}

if (!customElements.get('dile-material-icon-arrow-back')) {
  customElements.define('dile-material-icon-arrow-back', DileIconlibArrowBack);
}
