import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSignalLow extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 20h.01" /> <path d="M7 20v-4" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-signal-low', DileIconlibSignalLow);
