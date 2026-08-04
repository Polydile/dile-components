import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDragDrop2 extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M8 10a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8" /> <path d="M4 4l0 .01" /> <path d="M8 4l0 .01" /> <path d="M12 4l0 .01" /> <path d="M16 4l0 .01" /> <path d="M4 8l0 .01" /> <path d="M4 12l0 .01" /> <path d="M4 16l0 .01" /></svg>`;
  }
}

customElements.define('dile-tabler-icon-drag-drop-2', DileIconlibDragDrop2);
