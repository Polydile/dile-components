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
    }
  }

  constructor() {
    super();
    this.method = 'post';
    this.url = '';
    this.statusSuccessCodes = [200, 201];
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
      if(this.statusSuccessCodes.includes(response.status)) {
        let res = response.data;
        if(res.error) {
          this.dispatchError(res.data);
        } else {
          this.dispatchEvent(new CustomEvent('ajax-success', {
            detail: res
          }));
        }
      } else {
        this.dispatchError(this.translations.http_unhandled_success);
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
      const status = err.response.status;
      switch (status) {
        case 422: 
        case 400: 
          this.dispatchError(err.response.data.message, err.response.data.errors);
          break;
        case 404:
          if(err.response.data.message) {
            this.dispatchError(err.response.data.message);
          } else {
            this.dispatchError(this.translations.http_404);
          }
          break;
        case 401:
          this.dispatchError(this.translations.http_401);
          break;
        case 405:
            this.dispatchError(this.translations.http_405);
            break;
        case 413:
          this.dispatchError(this.translations.http_413);
          break;
        case 419:
          this.dispatchError(this.translations.http_419);
          break;
        case 502:
          this.dispatchError(this.translations.http_502);
          break;
        case 504:
          this.dispatchError(this.translations.http_504);
          break;
        default:
          this.dispatchError(this.translations.http_other_error);
      }
    } else {
      this.dispatchError(this.translations.http_no_response);
    }
  }

  dispatchError(message, errors = []) {
    this.dispatchEvent(new CustomEvent('ajax-error', {
      detail: {
        message,
        errors
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

