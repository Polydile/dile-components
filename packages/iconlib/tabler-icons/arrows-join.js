import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowsJoin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 7h5l3.5 5h9.5" /> <path d="M3 17h5l3.495 -5" /> <path d="M18 15l3 -3l-3 -3" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrows-join', DileIconlibArrowsJoin);
