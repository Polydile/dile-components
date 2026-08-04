import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandYandex extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M15 20v-16h-2a4 4 0 0 0 -4 4v1a4 4 0 0 0 4 4h2" /> <path d="M9 20l3 -7" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-brand-yandex', DileIconlibBrandYandex);
