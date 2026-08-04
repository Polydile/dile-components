import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCreativeCommonsSa extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M12 16a4 4 0 1 0 -4 -4v1" /> <path d="M6 12l2 2l2 -2" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-creative-commons-sa', DileIconlibCreativeCommonsSa);
