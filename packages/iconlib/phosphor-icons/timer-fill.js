import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibTimerFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm45.66,61.66-40,40a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,11.32ZM96,16a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8,8,0,0,1,96,16Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-timer-fill')) {
  customElements.define('dile-phosphor-icon-timer-fill', DileIconlibTimerFill);
}
