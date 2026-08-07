import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibUploadLine extends DileBaseIcon {
  getSvgIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z"/></svg>`;
  }
}

if (!customElements.get('dile-remixicon-icon-upload-line')) {
  customElements.define('dile-remixicon-icon-upload-line', DileIconlibUploadLine);
}
