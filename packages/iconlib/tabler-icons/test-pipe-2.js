import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTestPipe2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 3v15a3 3 0 0 1 -6 0v-15" /> <path d="M9 12h6" /> <path d="M8 3h8" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-test-pipe-2', DileIconlibTestPipe2);
