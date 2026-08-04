import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber60Small extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" /> <path d="M10 9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-number-60-small', DileIconlibNumber60Small);
