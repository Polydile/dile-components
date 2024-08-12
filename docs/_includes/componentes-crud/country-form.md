```html:preview
<script type="module">
import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/select/select.js';
import { DileForm } from '@dile/ui/mixins/form'

export class DemoCountryForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-input label="Country name" name="name" id="name" hideErrorOnInput></dile-input>
      <dile-input label="Slug" name="slug" id="slug" hideErrorOnInput></dile-input>
      <dile-select name="continent" id="continent" label="Continent" hideErrorOnInput>
        <select slot="select">
          <option value="">Select...</option>
          <option value="Europe">Europa</option>
          <option value="South America">América del Sur</option>
          <option value="North America">Norte América</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </dile-select>
    `;
  }
}
customElements.define('demo-country-form', DemoCountryForm);
</script>
<demo-country-form></demo-country-form>
```