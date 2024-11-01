import { LitElement, html } from 'lit';
import { DileAxios } from '../../../lib/DileAxios.js';
import { DileI18nMixin } from '../../../lib/DileI18nMixin.js';

export class DileAjax extends DileAxios(DileI18nMixin(LitElement)) {
  static get properties() {
    return {
      data: {  type: Object },
      method: { type: String },
      url: { type: String },
      statusSuccessCodes: { type: Array },
      sendDataAsFormData: { type: Boolean },
      getValidationErrors: { type: Object },
    }
  }

  constructor() {
    super();
    this.method = 'post';
    this.url = '';
    this.statusSuccessCodes = [200, 201];
    this.getValidationErrors = (data) => {
      return data.errors
    }
  }

  get computedData() {
    if(this.formData) {
      return this.formData;
    }
    return this.data || {};
  }

  generateRequest() {
    let request;
    if(this.sendDataAsFormData) {
      this._prepareFormData();
    }
    switch(this.method.toLowerCase().trim()) {
      case 'post':
        request = this.axiosInstance.post(this.url, this.computedData);
        break;
      case 'get':
        request = this.axiosInstance.get(this.url, {
          params: this.data
        });
        break;
      case 'put':
        request = this.axiosInstance.put(this.url, this.computedData);
        break;
      case 'delete':
        request = this.axiosInstance.delete(this.url, this.computedData);
        break;
      case 'patch':
        request = this.axiosInstance.patch(this.url, this.computedData);
        break
    }
    request.then((response) => {
      this.dispatchResponse(response)
      if(this.statusSuccessCodes.includes(response.status)) {
        this.dispatchEvent(new CustomEvent('ajax-success', {
          detail: response.data
        }));
      } else {
        this.dispatchError(this.translations.http_unhandled_success, response.data);
      }
    })
    .catch(err => {
      this.describeError(err);
    }) 
    .finally(() => {
      this.formData = null;
    });
  }

  describeError(err) {
    if (err.response) {
      const res = err.response;
      this.dispatchResponse(res); 
      
      const status = res.status;
      switch (status) {
        case 422: 
          this.dispatchError(res.data.message || this.translations.http_422, res.data, this.getValidationErrors(res.data));
          break;
        case 400: 
          this.dispatchError(res.data.message || this.translations.http_400, res.data, this.getValidationErrors(res.data));
          break;
        case 404:
          if(res.data.message) {
            this.dispatchError(res.data.message, res.data);
          } else {
            this.dispatchError(this.translations.http_404, res.data);
          }
          break;
        case 401:
          this.dispatchError(this.translations.http_401, res.data);
          break;
        case 405:
            this.dispatchError(this.translations.http_405, res.data);
            break;
        case 413:
          this.dispatchError(this.translations.http_413, res.data);
          break;
        case 419:
          this.dispatchError(this.translations.http_419, res.data);
          break;
        case 502:
          this.dispatchError(this.translations.http_502, res.data);
          break;
        case 504:
          this.dispatchError(this.translations.http_504, res.data);
          break;
        default:
          this.dispatchError(this.translations.http_other_error, res.data);
      }
    } else {
      this.dispatchError(this.translations.http_no_response, {});
    }
  }

  dispatchError(message, data, errors = []) {
    this.dispatchEvent(new CustomEvent('ajax-error', {
      detail: {
        message,
        data,
        errors
      } 
    }));
  }

  dispatchResponse(response) {
    this.dispatchEvent(new CustomEvent('ajax-response', {
      bubbles: true,
      composed: true,
      detail: {
        response
      }
    }));
  }

  _prepareFormData() {
    this._createFormData();
    this._addObjectToFormData(this.data);
  }

  _createFormData() {
    this.formData = new FormData();
  }

  _addObjectToFormData(data) {
    if (!this.formData) {
      this.createFormData();
    }
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        this.formData.append(key, data[key]);
      }
    }
  }
}

