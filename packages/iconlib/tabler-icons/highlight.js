import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibHighlight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /> <path d="M12.5 5.5l4 4" /> <path d="M4.5 13.5l4 4" /> <path d="M21 15v4h-8l4 -4l4 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-highlight', DileIconlibHighlight);
