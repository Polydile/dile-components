import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCrop75Filled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M18 5a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-crop-7-5-filled')) {
  customElements.define('dile-tabler-icon-crop-7-5-filled', DileIconlibCrop75Filled);
}
