import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGenderAgender extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M6 12a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /> <path d="M7 12h11" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-gender-agender')) {
  customElements.define('dile-tabler-icon-gender-agender', DileIconlibGenderAgender);
}
