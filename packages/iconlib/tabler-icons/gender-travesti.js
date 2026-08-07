import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGenderTravesti extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 20a5 5 0 1 1 0 -10a5 5 0 0 1 0 10" /> <path d="M6 6l5.4 5.4" /> <path d="M4 8l4 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-gender-travesti')) {
  customElements.define('dile-tabler-icon-gender-travesti', DileIconlibGenderTravesti);
}
