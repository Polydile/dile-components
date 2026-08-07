import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCrop11Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-crop-1-1-filled')) {
  customElements.define('dile-tabler-icon-crop-1-1-filled', DileIconlibCrop11Filled);
}
