import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibExclamationMark extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 19v.01" /> <path d="M12 15v-10" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-exclamation-mark', DileIconlibExclamationMark);
