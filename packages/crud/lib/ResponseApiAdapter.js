/**
 * Default Response Adapter configuration class
 * 
 * You may extend this class and overwrite its methods to create customized response adapters
 */

export class ResponseApiAdapter {
  
  setResponse(response) {
    this.response = response;
  }

  getData() {
    return this.response.data;
  }

  getMessage() {
    return this.response.message;
  }
  
  getValidationErrors() {
    return this.response.errors || [];
  }

  getElementList() {
    return this.response.data;
  }

  getPaginationData() {
    return this.response.data;
  }

  getIds() {
    return this.response.data;
  }

  getActionResponseMessage() {
    return this.response.message;
  }
  getActionResponseActionName() {
    return this.response.data.action;
  }
  getActionResponseActionData() {
    return this.response.data.data;
  }
  getActionResponseValidationErrorMessage() {
    return this.response.message
  }
}