import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBook2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H21V22H6C4.34315 22 3 20.6569 3 19V4C3 2.89543 3.89543 2 5 2H21V18ZM16 9V7H8V9H16Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-book-2-fill')) {
  customElements.define('dile-remixicon-icon-book-2-fill', DileIconlibBook2Fill);
}
