import { deepMerge } from './deepMerge.js';

const templatePlaceHolder = (templateName) => `Please provide config.templates.${templateName}`

export const defaultConfig = {
  endpoint: '',
  availableFilters: [],
  customization: {
    hideCountSummary: true,
    hidePageReport: false,
    hideCheckboxSelection: true,
    hideEmptyInsertButton: false,
    disableInsert: false,
    disableEdit: false,
    disablePagination: false,
  },
  api: {
    // responseDataProperty: 'data',
    // responseMessageProperty: 'message',
    // validationErrorsProperty: 'errors',
    getElementList: response => response.data,
    getPaginationData:  response => response.data,
  },
  templates: {
    item: () => templatePlaceHolder('item'),
  },
  labels: {
    insertAction: 'Create'
  },
}

export const makeResourceConfig = (endpoint, customConfig) => {
  const config = deepMerge(defaultConfig, customConfig);
  config.endpoint = endpoint;
  return config;
}