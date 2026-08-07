import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibThumbsUpFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-thumbs-up-fill')) {
  customElements.define('dile-phosphor-icon-thumbs-up-fill', DileIconlibThumbsUpFill);
}
