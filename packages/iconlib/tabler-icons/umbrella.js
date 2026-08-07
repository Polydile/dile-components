import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUmbrella extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12a8 8 0 0 1 16 0l-16 0" /> <path d="M12 12v6a2 2 0 0 0 4 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-umbrella')) {
  customElements.define('dile-tabler-icon-umbrella', DileIconlibUmbrella);
}
