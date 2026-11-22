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

  /**
   * Maximum number of ids the server accepts in /allids, sent with paginated listings.
   * Returns null when the server doesn't send it or has no limit.
   */
  getMaxIds() {
    return this.response.data?.maxIds ?? null;
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