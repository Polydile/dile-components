import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibStairsFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H21V21H3V15H7V11H11V7H15V3Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-stairs-fill', DileIconlibStairsFill);
