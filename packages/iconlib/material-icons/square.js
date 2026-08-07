import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSquare extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><rect height="18" width="18" x="3" y="3"/></g></g></svg>`;
  }
}

if (!customElements.get('dile-material-icon-square')) {
  customElements.define('dile-material-icon-square', DileIconlibSquare);
}
