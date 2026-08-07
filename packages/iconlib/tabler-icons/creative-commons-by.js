import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCreativeCommonsBy extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M11 7a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /> <path d="M9 13v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-.5l-.5 4h-2l-.5 -4h-.5a1 1 0 0 1 -1 -1" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-creative-commons-by')) {
  customElements.define('dile-tabler-icon-creative-commons-by', DileIconlibCreativeCommonsBy);
}
