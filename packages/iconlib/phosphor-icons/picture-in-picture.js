import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibPictureInPicture extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48H40A16,16,0,0,0,24,64V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,64H216v56H136a8,8,0,0,0-8,8v64H40ZM216,192H144V136h72v56Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-picture-in-picture')) {
  customElements.define('dile-phosphor-icon-picture-in-picture', DileIconlibPictureInPicture);
}
