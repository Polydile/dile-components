import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBorderLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 20l0 -16" /> <path d="M8 4l0 .01" /> <path d="M12 4l0 .01" /> <path d="M16 4l0 .01" /> <path d="M20 4l0 .01" /> <path d="M12 8l0 .01" /> <path d="M20 8l0 .01" /> <path d="M8 12l0 .01" /> <path d="M12 12l0 .01" /> <path d="M16 12l0 .01" /> <path d="M20 12l0 .01" /> <path d="M12 16l0 .01" /> <path d="M20 16l0 .01" /> <path d="M8 20l0 .01" /> <path d="M12 20l0 .01" /> <path d="M16 20l0 .01" /> <path d="M20 20l0 .01" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-border-left')) {
  customElements.define('dile-tabler-icon-border-left', DileIconlibBorderLeft);
}
