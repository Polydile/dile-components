```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/input/input.js';

export class DemoChangeNameAction extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      actionIds: { type: Array }
    };
  }

  constructor() {
    super();
    this.actionIds = [];
  }

  render() {
    return html`
      <p>Please inform a new name for the element:</p>
      <dile-input name="name"></dile-input>
    `;
  }
}
customElements.define('demo-change-name-action', DemoChangeNameAction);
</script>
```