import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPlaystationTriangle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" /> <path d="M7.5 15h9l-4.5 -8l-4.5 8" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-playstation-triangle')) {
  customElements.define('dile-tabler-icon-playstation-triangle', DileIconlibPlaystationTriangle);
}
