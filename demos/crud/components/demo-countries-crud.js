import { LitElement, html, css } from 'lit';
import './demo-countries-form';

export class DemoCountriesCrud extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.config = {
      endpoint: 'https://timer.escuelait.com/api/countries',
      filters: [],
      sortOptions: [
        {
          name: 'name',
          label: 'Name',
          direction: 'asc'
      },
      ],
      initialSortField: 'name',
      initialSortDirection: 'asc',
      filters: [
        {
          name: 'continent',
          label: 'Continent',
          active: false,
          value: false,
          type: 'select',
          options: [
              {
                  name: 'Europe',
                  label: 'Europe'
              },
              {
                  name: 'Africa',
                  label: 'Africa'
              },
              {
                name: 'Asia',
                label: 'Asia'
            },
          ]
      },
      ],
      availablePageSizes: [10,25,50],
      pageSize: 25,
      itemTemplate: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
      insertForm: () => html`<demo-countries-form id="insertform"></demo-countries-form>`,
      updateForm: () => html`<demo-countries-form id="updateform"></demo-countries-form>`,
      customization: {
        hideCountSummary: false,
        hidePageReport: false,
        hideCheckboxSelection: true,
        hideEmptyInsertButton: false,
        disableInsert: false,
        disableEdit: false,
        disablePagination: true,
        disableSort: false,
        disableFilter: false,
      },
      apiConfig: {
        responseDataProperty: 'data',
        responseMessageProperty: 'message',
        validationErrorsProperty: 'errors',
        getResultsListFromResponse(results) {
          return results.data;
        }
      },
      labels: {
        insertAction: 'Insert country',
        updateAction: 'Save',
        insertWindowTitle: 'Insert a country',
        updateWindowTitle: 'Update a country',
      },
      formIds: {
        insertForm: 'insertform',
        updateForm: 'updateform',
      }
    }
  }

  render() {
    return html`
      <dile-crud
        .config="${this.config}"
      ></dile-crud>
    `;
  }
}
customElements.define('demo-countries-crud', DemoCountriesCrud);
