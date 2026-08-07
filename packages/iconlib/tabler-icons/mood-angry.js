import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibMoodAngry extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9 9 0 1 1 0 -18a9 9 0 0 1 0 18" /> <path d="M8 9l2 1" /> <path d="M16 9l-2 1" /> <path d="M14.5 16.05a3.5 3.5 0 0 0 -5 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-mood-angry')) {
  customElements.define('dile-tabler-icon-mood-angry', DileIconlibMoodAngry);
}
