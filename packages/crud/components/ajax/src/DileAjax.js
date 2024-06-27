import { LitElement, html } from 'lit';
import { AxiosInstanceBuilder } from '../../../lib/AxiosInstanceBuilder.js';

export class DileAjax extends LitElement {
  static get properties() {
    return {
      data: {  type: Object },
      method: { type: String },
      url: { type: String }
    }
  }

  constructor() {
    super();
    this.data = {};
    this.method = 'post';
    this.url = '';
    if(!window.axiosInstance) {
      new AxiosInstanceBuilder()
    }
  }

  generateRequest() {
    let request;
    switch(this.method.toLowerCase().trim()) {
      case 'post':
        request = window.axiosInstance.post(this.url, this.data);
        break;
      case 'get':
        request = window.axiosInstance.get(this.url, {
          params: this.data
        });
        break;
      case 'put':
        request = window.axiosInstance.put(this.url, this.data);
        break;
      case 'delete':
        request = window.axiosInstance.delete(this.url, this.data);
        break;
      case 'patch':
        request = window.axiosInstance.patch(this.url, this.data);
        break
    }
    request.then((response) => {
      if(response.status == 200) {
        let res = response.data;
        if(res.error) {
          this.dispatchError(res.data);
        } else {
          this.dispatchEvent(new CustomEvent('ajax-success', {
            detail: res.data
          }));
        }
      } else {
        this.dispatchError('Bad server response');
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

