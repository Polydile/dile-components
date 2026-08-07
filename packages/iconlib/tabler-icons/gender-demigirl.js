import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibGenderDemigirl extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 9a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" /> <path d="M12 14v7" /> <path d="M9 18h3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-gender-demigirl')) {
  customElements.define('dile-tabler-icon-gender-demigirl', DileIconlibGenderDemigirl);
}
