import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibNumber10Small extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 8h1v8" /> <path d="M14 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-number-10-small', DileIconlibNumber10Small);
