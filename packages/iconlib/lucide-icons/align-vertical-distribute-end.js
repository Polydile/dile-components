import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAlignVerticalDistributeEnd extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect width="14" height="6" x="5" y="14" rx="2" /> <rect width="10" height="6" x="7" y="4" rx="2" /> <path d="M2 20h20" /> <path d="M2 10h20" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-align-vertical-distribute-end', DileIconlibAlignVerticalDistributeEnd);
