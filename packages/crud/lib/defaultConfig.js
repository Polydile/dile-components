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
    elementGetter: response => response.data,
  },
  templates: {
    item: () => templatePlaceholder('item'),
    insertForm: (belongsTo, relationId) => templatePlaceholder('insertForm'),
    updateForm: () => templatePlaceholder('updateForm'),
    help: () => templatePlaceholder('help'),
    detail: () => templatePlaceholder('detail'),
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
    relations: () => '',
  },
  labels: {
    insertAction: 'Create',
    updateAction: 'Save',
    deleteAction: 'Delete',
    insertWindowTitle: 'Insert an item',
    updateWindowTitle: 'Update an item',
    helpTitle: 'Help',
    helpButtonLabel: 'Help',
  },
  formIds: {
    insertForm: 'insertform',
    updateForm: 'updateform',
  },
}