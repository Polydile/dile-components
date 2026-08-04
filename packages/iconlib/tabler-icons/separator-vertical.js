import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSeparatorVertical extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 4l0 16" /> <path d="M8 8l-4 4l4 4" /> <path d="M16 16l4 -4l-4 -4" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-separator-vertical', DileIconlibSeparatorVertical);
