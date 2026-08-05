import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFilterFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 4V6H20L14 15V22H10V15L4 6H3V4H21Z"/></svg>`;
  }
}

customElements.define('dile-remixicon-icon-filter-fill', DileIconlibFilterFill);
