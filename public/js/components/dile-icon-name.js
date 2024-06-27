import { LitElement, html, css } from 'lit';
import { 
  arrowDropDownIcon, 
  settingsIcon,
  paletteIcon,
  scaleIcon,
  checkboxCheckedIcon,
  autoAwesomeIcon,
  helpIcon,
} from '@dile/icons';
import '@dile/ui/components/icon/icon';

const iconNames = {
  arrowDropDown: arrowDropDownIcon,
  settings: settingsIcon,
  palette: paletteIcon,
  scale: scaleIcon,
  checkboxChecked: checkboxCheckedIcon,
  autoAwesome: autoAwesomeIcon,
  help: helpIcon,
}

export class DileIconName extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `
  ];

  static get properties() {
    return {
      icon: { type: String },
    };
  }

  render() {
    return html`<dile-icon .icon="${iconNames[this.icon]}"></dile-icon>`;
  }
}
customElements.define('dile-icon-name', DileIconName);
