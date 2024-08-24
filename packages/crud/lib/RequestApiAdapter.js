/**
 * Default Request Adapter configuration class
 * 
 * You may extend this class and overwrite its methods to create customized request data objets
 * that adapt your API intrerface
 */

export class RequestApiAdapter {
  adaptListRequestData(data) {
    console.log('akiii adaptListRequestData');
    console.log(data);
    return data;
  }
  adaptIdsRequestData(data) {
    console.log('akiii adaptIdsRequestData');
    console.log(data);
    return data;
  }
}