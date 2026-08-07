import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBracketsFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 3V5H6V19H9V21H4V3H9ZM15 3H20V21H15V19H18V5H15V3Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-brackets-fill')) {
  customElements.define('dile-remixicon-icon-brackets-fill', DileIconlibBracketsFill);
}
