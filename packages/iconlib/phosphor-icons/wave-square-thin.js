import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibWaveSquareThin extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M236,128v56a4,4,0,0,1-4,4H128a4,4,0,0,1-4-4V76H28v52a4,4,0,0,1-8,0V72a4,4,0,0,1,4-4H128a4,4,0,0,1,4,4V180h96V128a4,4,0,0,1,8,0Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-wave-square-thin')) {
  customElements.define('dile-phosphor-icon-wave-square-thin', DileIconlibWaveSquareThin);
}
