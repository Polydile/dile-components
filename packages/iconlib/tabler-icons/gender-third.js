import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGenderThird extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M11 12a5 5 0 1 0 10 0a5 5 0 0 0 -10 0" /> <path d="M11 12h-3" /> <path d="M8 12l-5 -4v8l5 -4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-gender-third')) {
  customElements.define('dile-tabler-icon-gender-third', DileIconlibGenderThird);
}
