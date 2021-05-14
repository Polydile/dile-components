import { LitElement, html, css } from 'lit-element';
import { LionTextarea } from '@lion/textarea';

export class DileTextarea extends LionTextarea {

  static get styles() {
    return [super.styles, css`
      ::slotted(label) {
        display: inline-block;
        margin-bottom: var(--dile-textarea-label-margin-bottom, 4px);
        color: var(--dile-textarea-label-color, #59e);
        font-size: var(--dile-textarea-label-font-size, 1rem);
      }
      ::slotted(textarea) {
        border: var(--dile-textarea-border, 1px solid #888);
        border-radius: var(--dile-textarea-border-radius, 5px);;
        padding: var(--dile-textarea-padding, 5px);
        
      }
      .input-group__container > .input-group__input ::slotted(textarea.form-control) {
        font-size: var(--dile-textarea-font-size, 0.9rem);
        font-family: var(--dile-textarea-font-family, sans-serif);
      }
    `];
  }
}