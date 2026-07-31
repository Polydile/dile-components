import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNorthWest extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M5,15h2V8.41L18.59,20L20,18.59L8.41,7H15V5H5V15z"/></svg>`;
  }
}

customElements.define('dile-material-icon-north-west', DileIconlibNorthWest);
