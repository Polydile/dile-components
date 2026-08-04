import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCell extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 4l-4 2v5l4 2l4 -2v-5l-4 -2" /> <path d="M12 11l4 2l4 -2v-5l-4 -2l-4 2" /> <path d="M8 13v5l4 2l4 -2v-5" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-cell', DileIconlibCell);
