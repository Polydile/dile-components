import { LitElement, html, css } from 'lit';
import { appsIcon } from "@dile/icons";
import '@dile/ui/components/button/button-icon.js';
import '@dile/ui/components/select/select.js';
import '@dile/iconlib/tabler-icons/invoice.js';
import '@dile/iconlib/tabler-icons/align-box-bottom-right.js';
import '@dile/iconlib/phosphor-icons/cloud-sun.js';

/**
 * Renders a sample of real dile-* components styled with the theme
 * variables passed in `values`, so the theme builder can show how the
 * palette looks applied to actual UI rather than just color swatches.
 */
export class DileThemeComponentsPreview extends LitElement {

  static get properties() {
    return {
      values: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 1.5rem;
      }
      .components-preview {
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 8px;
        padding: 1rem;
        background-color: var(--dile-background-color);
        color: var(--dile-on-background-color);
      }
      .components-row {
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
      }
      div.icons {
          margin: 1rem 0;
          display: flex;
          gap: 0.65rem;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 999px;
          background-color: var(--dile-gray-very-light-color);
          justify-content: center;
      }
      .icon {
          --dile-icon-size: 32px;
      }
      .primary-icon {
          --dile-icon-color: var(--dile-on-primary-color);
          --dile-icon-rounded-background-color: var(--dile-primary-color);
      }
      .secondary-icon {
          --dile-icon-color: var(--dile-on-secondary-color);
          --dile-icon-rounded-background-color: var(--dile-secondary-color);
      }
      .terciary-icon {
          --dile-icon-color: var(--dile-on-terciary-color);
          --dile-icon-rounded-background-color: var(--dile-terciary-color);
      }
      .invert-primary-icon {
          --dile-icon-color: var(--dile-primary-color);
          --dile-icon-rounded-background-color: var(--dile-on-primary-color);
      }
      .invert-secondary-icon {
          --dile-icon-color: var(--dile-secondary-color);
          --dile-icon-rounded-background-color: var(--dile-on-secondary-color);
      }
      .invert-terciary-icon {
          --dile-icon-color: var(--dile-terciary-color);
          --dile-icon-rounded-background-color: var(--dile-on-terciary-color);
      }
    `;
  }

  render() {
    const styleVars = Object.entries(this.values || {})
      .map(([name, value]) => `${name}: ${value}`)
      .join('; ');
    return html`
      <h3>Components preview</h3>
      <div class="components-preview" style="${styleVars}">
        <dile-nav>
          <span slot="title">Sample nav</span>
          <span slot="menu">
            <dile-hamburger></dile-hamburger>
          </span>
          <span slot="actions"><dile-avatar initial="D"></dile-avatar></span>
        </dile-nav>
        <div class="components-row">
          <dile-button>Click here</dile-button>
          <dile-button-icon .icon=${appsIcon}>Control Panel</dile-button-icon>
        </div>
        <div class="icons">
                <dile-tabler-icon-invoice rounded class="icon primary-icon"></dile-tabler-icon-invoice>
                <dile-tabler-icon-align-box-bottom-right rounded class="icon secondary-icon"></dile-tabler-icon-align-box-bottom-right>
                <dile-phosphor-icon-cloud-sun rounded class="icon terciary-icon"></dile-phosphor-icon-cloud-sun>
                <dile-tabler-icon-invoice rounded class="icon invert-primary-icon"></dile-tabler-icon-invoice>
                <dile-tabler-icon-align-box-bottom-right rounded class="icon invert-secondary-icon"></dile-tabler-icon-align-box-bottom-right>
                <dile-phosphor-icon-cloud-sun rounded class="icon invert-terciary-icon"></dile-phosphor-icon-cloud-sun>
        </div>
        <dile-input label="Sample input" placeholder="Write something..."></dile-input>
        <dile-select name="select1" label="Selector">
          <select slot="select">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </dile-select>
      </div>
    `;
  }
}
