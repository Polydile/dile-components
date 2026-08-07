import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCategoryMinus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 4h6v6h-6v-6" /> <path d="M14 4h6v6h-6v-6" /> <path d="M4 14h6v6h-6v-6" /> <path d="M14 17h6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-category-minus')) {
  customElements.define('dile-tabler-icon-category-minus', DileIconlibCategoryMinus);
}
