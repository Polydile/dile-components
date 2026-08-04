import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibXboxY extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" /> <path d="M9 8l3 4" /> <path d="M15 8l-2.988 3.984l-.012 4.016" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-xbox-y', DileIconlibXboxY);
