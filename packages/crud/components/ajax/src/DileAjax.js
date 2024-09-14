import { LitElement, html } from 'lit';
import { DileAxios } from '../../../lib/DileAxios.js';

export class DileAjax extends DileAxios(LitElement) {
  static get properties() {
    return {
      data: {  type: Object },
      method: { type: String },
      url: { type: String },
      statusSuccessCodes: { type: Array },
    }
  }

  constructor() {
    super();
    this.data = {};
    this.method = 'post';
    this.url = '';
    this.statusSuccessCodes = [200, 201];
  }

  generateRequest() {
    let request;
    switch(this.method.toLowerCase().trim()) {
      case 'post':
        request = this.axiosInstance.post(this.url, this.data);
        break;
      case 'get':
        request = this.axiosInstance.get(this.url, {
          params: this.data
        });
        break;
      case 'put':
        request = this.axiosInstance.put(this.url, this.data);
        break;
      case 'delete':
        request = this.axiosInstance.delete(this.url, this.data);
        break;
      case 'patch':
        request = this.axiosInstance.patch(this.url, this.data);
        break
    }
    request.then((response) => {
      if(this.statusSuccessCodes.includes(response.status)) {
        let res = response.data;
        if(res.error) {
          this.dispatchError(res.data);
        } else if (res.error === false) {
          this.dispatchEvent(new CustomEvent('ajax-success', {
            detail: res.data
          }));
        } else {
          this.dispatchEvent(new CustomEvent('ajax-success', {
            detail: res
          }));
        }
      } else {
        this.dispatchError('Unhandled success server response');
      }
    })
    .catch(err => {
      this.describeError(err);
    }) 
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
            this.dispatchError("Not found error");
          }
          break;
        case 401:
          this.dispatchError('Unauthorized. Your session may have expired');
          break;
        case 419:
          this.dispatchError('Your session has expired. Please refresh the page');
          break;
        case 502:
          this.dispatchError('Connection error, invalid gateway');
          break;
        case 504:
          this.dispatchError('Connection timeout with the gateway');
          break;
        default:
          this.dispatchError('Action not completed due to a server error');
      }
    } else {
      this.dispatchError('No response received from the server');
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
}

