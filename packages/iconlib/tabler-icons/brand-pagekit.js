import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibBrandPagekit extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12.077 20h-5.077v-16h11v14h-5.077" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-brand-pagekit')) {
  customElements.define('dile-tabler-icon-brand-pagekit', DileIconlibBrandPagekit);
}
