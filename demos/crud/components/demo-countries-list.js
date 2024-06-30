import { LitElement, html, css } from 'lit';

      export class CrudListDemo extends LitElement {
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
            endpoint: 'api/countries',
            filters: [],
            itemTemplate: (country) => html`<demo-country-item .country=${country}></demo-country-item>`,
            customization: {
              hideCountSummary: false,
              hidePageReport: false,
              hideCheckboxSelection: true,
              hideEmptyInsertButton: false,
              disableInsert: false,
              disableEdit: false,
              disablePagination: true,
            },
            apiConfig: {
              responseDataProperty: 'data',
              responseMessageProperty: 'message',
              validationErrorsProperty: 'errors',
              getResultsListFromResponse(results) {
                return results.data;
              }
            }
          }
        }

        render() {
          return html`

            <dile-crud-list
              .config="${this.config}"
            ></dile-crud-list>
          `;
        }

      }
      customElements.define('crud-list-demo', CrudListDemo);