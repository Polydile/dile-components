import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSortDescendingShapes extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M4 15l3 3l3 -3" /> <path d="M7 6v12" /> <path d="M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-4" /> <path d="M17 4l-3.5 6h7l-3.5 -6" /></svg>`;
  }
}

if (!customElements.get('dile-tabler-icon-sort-descending-shapes')) {
  customElements.define('dile-tabler-icon-sort-descending-shapes', DileIconlibSortDescendingShapes);
}
