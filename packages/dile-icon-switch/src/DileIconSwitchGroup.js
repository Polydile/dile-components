import { LitElement, html, css } from 'lit';
import '../dile-icon-switch';

export class DileIconSwitchGroup extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
      .flex {
        display: flex;
        align-items: center;
      }
    `
  ];

  render() {
    return html`
    <div class="flex" @dile-icon-switch-changed=${this.processChanged}>
      <slot></slot>
    </div>
    `;
  }

  processChanged(e) {
    this.querySelectorAll('dile-icon-switch').forEach( element => {
      if(element.name != e.detail.name) {
        element.active = false;
      } else {
        if(element.active == false) {
          element.active = true;
          e.stopPropagation();
        }
      }
    });
  }
}

