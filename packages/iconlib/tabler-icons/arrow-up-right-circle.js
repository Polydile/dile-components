import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibArrowUpRightCircle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8.464 15.536l9.536 -9.536" /> <path d="M18 10v-4h-4" /> <path d="M8.414 15.586a2 2 0 1 0 -2.828 2.828a2 2 0 0 0 2.828 -2.828" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-arrow-up-right-circle', DileIconlibArrowUpRightCircle);
