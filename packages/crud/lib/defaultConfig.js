import { html } from "lit";
import { ResponseApiAdapter } from "./ResponseApiAdapter";

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
  responseAdapter: new ResponseApiAdapter(),
  // api: {
  //   responseDataGetter: response => response.data,
  //   responseMessageGetter: response => response.message,
  //   validationErrorsGetter: response => response.errors,
  //   elementListGetter: response => response.data,
  //   paginationDataGetter: response => response.data,
  //   elementGetter: response => response.data,
  // },
  actions: {
    list: [
      {
        label: 'Delete',
        name: 'DeleteAction'
      }
    ],
    single: [],
  },
  templates: {
    item: () => templatePlaceholder('item'),
    insertForm: (belongsTo, relationId) => templatePlaceholder('insertForm'),
    updateForm: () => templatePlaceholder('updateForm'),
    help: () => templatePlaceholder('help'),
    detail: () => templatePlaceholder('detail'),
    formActions: (actionName) => html`
        <dile-pages attrForSelected="action" selected="${actionName}">
            <dile-crud-delete-action action="DeleteAction"></dile-crud-delete-action>
        </dile-pages>
    `,
    relations: () => '',
    formSingleActions: () => '',
  },
  labels: {
    insertAction: 'Create',
    updateAction: 'Save',
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