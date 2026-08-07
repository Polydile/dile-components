import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSkipLeftFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 18V6H9V18H7ZM11 12 17 6V18L11 12Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-skip-left-fill')) {
  customElements.define('dile-remixicon-icon-skip-left-fill', DileIconlibSkipLeftFill);
}
