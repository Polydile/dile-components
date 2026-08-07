import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandSugarizer extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14.277 16l3.252 -3.252a1.61 1.61 0 0 0 -2.277 -2.276l-3.252 3.251l-3.252 -3.251a1.61 1.61 0 0 0 -2.276 2.276l3.251 3.252l-3.251 3.252a1.61 1.61 0 1 0 2.276 2.277l3.252 -3.252l3.252 3.252a1.61 1.61 0 1 0 2.277 -2.277l-3.252 -3.252" /> <path d="M9 5a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-sugarizer')) {
  customElements.define('dile-tabler-icon-brand-sugarizer', DileIconlibBrandSugarizer);
}
