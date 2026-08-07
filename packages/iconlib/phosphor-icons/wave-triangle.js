import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWaveTriangle extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M238.48,132.68l-52,72a8,8,0,0,1-13,0L76,69.66l-45.51,63a8,8,0,1,1-13-9.36l52-72a8,8,0,0,1,13,0l97.51,135,45.51-63a8,8,0,1,1,13,9.36Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-wave-triangle')) {
  customElements.define('dile-phosphor-icon-wave-triangle', DileIconlibWaveTriangle);
}
