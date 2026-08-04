import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCrop32Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M18 6a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-crop-3-2-filled', DileIconlibCrop32Filled);
