import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibSidebarSimpleThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,44H40A12,12,0,0,0,28,56V200a12,12,0,0,0,12,12H216a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44ZM36,200V56a4,4,0,0,1,4-4H84V204H40A4,4,0,0,1,36,200Zm184,0a4,4,0,0,1-4,4H92V52H216a4,4,0,0,1,4,4Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-sidebar-simple-thin')) {
  customElements.define('dile-phosphor-icon-sidebar-simple-thin', DileIconlibSidebarSimpleThin);
}
