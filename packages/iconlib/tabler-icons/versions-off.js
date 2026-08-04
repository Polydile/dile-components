import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibVersionsOff extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10.184 6.162a2 2 0 0 1 1.816 -1.162h6a2 2 0 0 1 2 2v9m-1.185 2.827a1.993 1.993 0 0 1 -.815 .173h-6a2 2 0 0 1 -2 -2v-7" /> <path d="M7 7v10" /> <path d="M4 8v8" /> <path d="M3 3l18 18" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-versions-off', DileIconlibVersionsOff);
