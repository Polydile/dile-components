import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWavesHorizontal extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" /> <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" /> <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" /></svg>`;
  }
}

customElements.define('dile-lucide-icon-waves-horizontal', DileIconlibWavesHorizontal);
