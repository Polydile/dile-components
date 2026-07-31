import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignVerticalTop extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M22,2v2H2V2H22z M7,22h3V6H7V22z M14,16h3V6h-3V16z"/></svg>`;
  }
}

customElements.define('dile-material-icon-align-vertical-top', DileIconlibAlignVerticalTop);
