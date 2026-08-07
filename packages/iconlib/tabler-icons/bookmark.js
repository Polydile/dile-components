import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBookmark extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-bookmark')) {
  customElements.define('dile-tabler-icon-bookmark', DileIconlibBookmark);
}
