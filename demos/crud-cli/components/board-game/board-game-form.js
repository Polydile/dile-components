import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form'
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/input/input-integer.js';
import '@dile/ui/components/checkbox/checkbox.js';
import '@dile/crud/components/ajax-select-crud/ajax-select-crud';

export class boardGameForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-input label="Nombre" name="name" id="name" hideErrorOnInput></dile-input>
      <dile-input label="Slug" name="slug" id="slug" hideErrorOnInput></dile-input>
      <dile-input-integer name="year" label="Year" hideErrorOnInput id="year"></dile-input-integer>
      <dile-ajax-select-crud
          id="countryselect"
          idProperty="id"
          name="country_id"
          label="País"
          endpoint="https://timer.escuelait.com/api/countries" 
          queryStringVariable="keyword"
          placeholder="Buscar país"
          resultDataProperty="data"
          displayProperty="name"
          selectDefaultPlaceholder="Seleccionar país..."
      ></dile-ajax-select-crud>
      <p><dile-checkbox name="essential">Essential</dile-checkbox></p>

    `;
  }
}
customElements.define('board-game-form', boardGameForm);
