import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibAirConditioningDisabled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M3 10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -4" /> <path d="M7 16v-3a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v3" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-air-conditioning-disabled')) {
  customElements.define('dile-tabler-icon-air-conditioning-disabled', DileIconlibAirConditioningDisabled);
}
