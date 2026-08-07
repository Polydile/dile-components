import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArchive2Fill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 20V7L20 3H4L2 7.00353V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20ZM5.23582 5H18.7638L19.7638 7H4.23682L5.23582 5ZM9 11H15V13H9V11Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-archive-2-fill')) {
  customElements.define('dile-remixicon-icon-archive-2-fill', DileIconlibArchive2Fill);
}
