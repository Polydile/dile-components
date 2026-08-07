import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWoman2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M13.94,8.31C13.62,7.52,12.85,7,12,7s-1.62,0.52-1.94,1.31L7,16h3.5v6h3v-6H17L13.94,8.31z"/><circle cx="12" cy="4" r="2"/></g></g></g></svg>`;
  }
}

if (!customElements.get('dile-material-icon-woman-2')) {
  customElements.define('dile-material-icon-woman-2', DileIconlibWoman2);
}
