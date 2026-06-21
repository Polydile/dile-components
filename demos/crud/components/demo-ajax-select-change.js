import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select.js';
import '@dile/crud/components/ajax-change/ajax-change.js'

export class DemoAjaxChange extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .demo-section {
        margin-bottom: 30px;
      }
      h2 {
        margin-bottom: 20px;
        font-size: 1.3em;
        color: #333;
      }
      p {
        margin-bottom: 10px;
        color: #666;
      }
    `
  ];

  render() {
    return html`
      <div class="demo-section">
        <h2>Select a continent:</h2>
        <p>Change the value and it will send it to the API via AJAX (PATCH request)</p>
        
        <dile-ajax-change 
          endpoint="https://timer.escuelait.com/api/board-games/1"
          method="patch"
          dataFieldName="essential"
        >
          <dile-select name="continent" slot="input" label="Continent">
            <select slot="input">
              <option value="">Select...</option>
              <option value="Europe">Europe</option>
              <option value="South America">South America</option>
              <option value="North America">North America</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </dile-select>
        </dile-ajax-change>
      </div>

      <div class="demo-section">
        <h2>Select a status:</h2>
        <p>Another example with different data field name</p>
        
        <dile-ajax-change 
          endpoint="https://timer.escuelait.com/api/board-games/1"
          method="patch"
          dataFieldName="status"
        >
          <dile-select name="status" slot="input" label="Status">
            <select slot="input">
              <option value="">Select...</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="archived">Archived</option>
            </select>
          </dile-select>
        </dile-ajax-change>
      </div>
    `;
  }
}
customElements.define('demo-ajax-change', DemoAjaxChange);
