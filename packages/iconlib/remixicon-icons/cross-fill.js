import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCrossFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H10V8H4V12H10V22H14V12H20V8H14V2Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-cross-fill')) {
  customElements.define('dile-remixicon-icon-cross-fill', DileIconlibCrossFill);
}
