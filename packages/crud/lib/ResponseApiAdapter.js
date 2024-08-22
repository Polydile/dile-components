export class ResponseApiAdapter {
  
  setResponse(response) {
    this.response = response;
  }

  // responseDataGetter: response => response.data,
  getData() {
    return this.response.data;
  }

  // responseMessageGetter: response => response.message,
  getMessage() {
    return this.response.message;
  }
  
  // validationErrorsGetter: response => response.errors,
  getValidationErrors() {
    return this.response.errors || [];
  }

  // elementListGetter: response => response.data,
  getElementList() {
    return this.response.data;
  }

  // paginationDataGetter: response => response.data,
  getPaginationData() {
    return this.response.data;
  }

  // elementGetter: response => response.data,
  getElement() {
    return this.response.data;
  }
  
}