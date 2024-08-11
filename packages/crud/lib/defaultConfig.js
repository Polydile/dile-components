import { html } from "lit";

const templatePlaceholder = (templateName) => `Please provide config.templates.${templateName}`

export const defaultConfig = {
  endpoint: '',
  availableFilters: [],
  sort: {
    options: [],
    initialSortField: null,
  },
  pageSize: {
    available: [10, 25, 50],
    initial: 25,
  },
  customization: {
    hideCountSummary: true,
    hidePageReport: false,
    hideCheckboxSelection: true,
    hideEmptyInsertButton: false,
    disableInsert: false,
    disableEdit: false,
    disablePagination: false,
    disableSort: false,
    disableFilter: false,
    disableHelp: true,
  },
  api: {
    responseDataGetter: response => response.data,
    responseMessageGetter: response => response.message,
    validationErrorsGetter: response => response.errors,
    elementListGetter: response => response.data,
    paginationDataGetter: response => response.data,
  },
  templates: {
    item: () => templatePlaceholder('item'),
    insertForm: () => templatePlaceholder('insertForm'),
    updateForm: () => templatePlaceholder('updateForm'),
    help: () => templatePlaceholder('help'),
    selectActions: (deleteLabel) => html`
        <dile-select>
            <select slot="select">
                <option value="DeleteAction">${deleteLabel}</option>
            </select>
        </dile-select>
    `,
    formActions: (actionName) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
  },
  labels: {
    insertAction: 'Create',
    updateAction: 'Save',
    deleteAction: 'Delete',
    insertWindowTitle: 'Insert a country',
    updateWindowTitle: 'Update a country',
    helpTitle: 'Help',
    helpButtonLabel: 'Help',
  },
  formIds: {
    insertForm: 'insertform',
    updateForm: 'updateform',
  },
}