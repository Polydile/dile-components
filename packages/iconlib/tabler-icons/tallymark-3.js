import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTallymark3 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 5l0 14" /> <path d="M12 5l0 14" /> <path d="M16 5l0 14" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-tallymark-3', DileIconlibTallymark3);
