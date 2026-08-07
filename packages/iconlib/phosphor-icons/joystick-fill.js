import { DileBaseIcon } from '../src/DileBaseIcon.js';

export class DileIconlibJoystickFill extends DileBaseIcon {
  getSvgIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M224,160v48a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V160a16,16,0,0,1,16-16h72V95.19a40,40,0,1,1,16,0V144h72A16,16,0,0,1,224,160Zm-64-40a8,8,0,0,0,8,8h32a8,8,0,0,0,0-16H168A8,8,0,0,0,160,120Z"/></svg>`;
  }
}

if (!customElements.get('dile-phosphor-icon-joystick-fill')) {
  customElements.define('dile-phosphor-icon-joystick-fill', DileIconlibJoystickFill);
}
