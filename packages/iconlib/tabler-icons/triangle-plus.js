import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTrianglePlus extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0v.001" /> <path d="M9 13h6" /> <path d="M12 10v6" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-triangle-plus', DileIconlibTrianglePlus);
