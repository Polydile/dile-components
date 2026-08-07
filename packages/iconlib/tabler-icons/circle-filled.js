import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibCircleFilled extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"> <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-circle-filled')) {
  customElements.define('dile-tabler-icon-circle-filled', DileIconlibCircleFilled);
}
