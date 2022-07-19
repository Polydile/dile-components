import { LitElement, html, css } from 'lit';
import { LionTextarea } from '@lion/textarea';

export class DileTextarea extends LionTextarea {

  static get styles() {
    return [super.styles, css`
      :host {
        margin-bottom: 10px;
      }
      ::slotted(label) {
        display: none;
        margin-bottom: var(--dile-textarea-label-margin-bottom, 4px);
        color: var(--dile-textarea-label-color, #59e);
        font-size: var(--dile-textarea-label-font-size, 1em);
      }
      :host([label]) ::slotted(label){
        display: inline-block;
      }
      ::slotted(textarea) {
        border: var(--dile-textarea-border, 1px solid #888);
        border-radius: var(--dile-textarea-border-radius, 5px);;
        padding: var(--dile-textarea-padding, 5px);
      }
      .input-group__container > .input-group__input ::slotted(textarea.form-control) {
        font-size: var(--dile-textarea-font-size, 1em);
        font-family: var(--dile-textarea-font-family, sans-serif);
      }

    `];
  }

  get textareaElement() {
    return this.querySelector('textarea');
  }

  placeCursorAtEnd() {
    let element = this.textareaElement;
    element.setSelectionRange(element.value.length, element.value.length);
    element.focus();
  }
  
}