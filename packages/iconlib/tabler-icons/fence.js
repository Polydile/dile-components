import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibFence extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 12v4h16v-4l-16 0" /> <path d="M6 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" /> <path d="M14 16v4h4v-4m0 -4v-6l-2 -2l-2 2v6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-fence', DileIconlibFence);
