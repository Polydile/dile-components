import { html } from "lit";
import { ResponseApiAdapter } from "./ResponseApiAdapter";
import { RequestApiAdapter } from "./RequestApiAdapter";

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
    disableKeywordSearch: true,
    hideCountSummary: false,
    hidePageReport: false,
    hideCheckboxSelection: true,
    hideEmptyInsertButton: false,
    disableInsert: false,
    disableEdit: false,
    disablePagination: true,
    disableSort: true,
    disableFilter: true,
    disableHelp: true,
  },
  responseAdapter: new ResponseApiAdapter(),
  requestAdapter: new RequestApiAdapter(),
  insertOperation: {
    type: 'modal'
  },
  updateOperation: {
    type: 'modal'
  },
  insertOperation: {
    type: 'modal'
  },
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