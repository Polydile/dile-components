import { html, css } from 'lit';
import '@dile/ui/components/button/button.js';
import { DileCrudActions } from './DileCrudActions.js';

export class DileCrudSingleActionDispatcher extends DileCrudActions {
  static styles = [
    super.styles,
    css`
      dile-button {
        --dile-button-background-color: var(--dile-crud-single-action-background-color, var(--dile-primary-color, #7BB93D));
        --dile-button-text-color: var(--dile-crud-single-action-text-color, var(--dile-on-primary-color, #fff));
        --dile-button-border-color: var(--dile-crud-single-action-border-color, var(--dile-primary-dark-color, #12354d));
        --dile-button-hover-background-color: var(--dile-crud-single-action-hover-background-color, var(--dile-primary-light-color, #f3f3ae));
        --dile-button-hover-text-color: var(--dile-crud-single-action-hover-text-color, var(--dile-on-primary-light-color, #303030));
        --dile-button-hover-border-color: var(--dile-crud-single-action-hover-border-color, var(--dile-primary-color, #666666));
      }
    `
  ];

  static get properties() {
    return {
      actionName: { type: String },
    };
  }

  get selection() {
    return this.actionName;
  }
  set selection(_value) {
    // this dispatcher always runs the configured actionName
  }

  get currentAction() {
    return this.actions.find(action => action.name === this.actionName);
  }

  get actionListTemplate() {
    return html`
      <dile-button
        class="${this.actionIds.length > 0 ? 'visible' : 'hide'}"
        @click=${this.showAction}
      >${this.currentAction ? this.currentAction.label : ''}</dile-button>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('actionName') || changedProperties.has('actions')) {
      this.computeDestructive();
    }
  }
}
