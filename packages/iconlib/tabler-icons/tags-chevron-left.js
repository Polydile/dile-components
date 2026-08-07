import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTagsChevronLeft extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M20.59 19h-12.86a.98 .98 0 0 1 -.81 -.411l-4.185 -6.125a.81 .81 0 0 1 0 -.928l4.184 -6.125a.98 .98 0 0 1 .811 -.411h12.86l-4.782 7l4.782 7" /> <path d="M13.895 19l-4.465 -6.536a.81 .81 0 0 1 0 -.928l4.465 -6.536" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-tags-chevron-left')) {
  customElements.define('dile-tabler-icon-tags-chevron-left', DileIconlibTagsChevronLeft);
}
