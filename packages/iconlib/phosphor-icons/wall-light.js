import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWallLight extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,50H32a6,6,0,0,0-6,6V200a6,6,0,0,0,6,6H224a6,6,0,0,0,6-6V56A6,6,0,0,0,224,50ZM86,146V110h84v36Zm-48,0V110H74v36Zm144-36h36v36H182Zm36-12H134V62h84ZM122,62V98H38V62ZM38,158h84v36H38Zm96,36V158h84v36Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-wall-light')) {
  customElements.define('dile-phosphor-icon-wall-light', DileIconlibWallLight);
}
