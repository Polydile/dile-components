import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibDragHandle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z"/></g></g></g></svg>`;
  }
}

if (!customElements.get('dile-material-icon-drag-handle')) {
  customElements.define('dile-material-icon-drag-handle', DileIconlibDragHandle);
}
