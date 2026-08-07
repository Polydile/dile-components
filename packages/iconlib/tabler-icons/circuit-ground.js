import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircuitGround extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 13v-8" /> <path d="M4 13h16" /> <path d="M7 16h10" /> <path d="M10 19h4" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circuit-ground')) {
  customElements.define('dile-tabler-icon-circuit-ground', DileIconlibCircuitGround);
}
