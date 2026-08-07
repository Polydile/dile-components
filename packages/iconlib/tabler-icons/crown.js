import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCrown extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4l4 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-crown')) {
  customElements.define('dile-tabler-icon-crown', DileIconlibCrown);
}
