/**
 * Default Request Adapter configuration class
 * 
 * You may extend this class and overwrite its methods to create customized request data objets
 * that adapt your API intrerface
 */

export class RequestApiAdapter {
  adaptListRequestData(data) {
    return data;
  }
  adaptIdsRequestData(data) {
    return data;
  }
  adaptBooleanValue(data) {
    return data;
  }
}