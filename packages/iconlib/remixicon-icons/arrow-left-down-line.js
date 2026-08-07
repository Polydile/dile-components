import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowLeftDownLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 13.589L17.6066 4.98242L19.0208 6.39664L10.4142 15.0032H18V17.0032H7V6.00324H9V13.589Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-arrow-left-down-line')) {
  customElements.define('dile-remixicon-icon-arrow-left-down-line', DileIconlibArrowLeftDownLine);
}
