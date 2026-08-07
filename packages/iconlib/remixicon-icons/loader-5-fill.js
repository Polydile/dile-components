import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibLoader5Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C16.9706 3 21 7.02944 21 12H19C19 8.13401 15.866 5 12 5V3Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-loader-5-fill')) {
  customElements.define('dile-remixicon-icon-loader-5-fill', DileIconlibLoader5Fill);
}
