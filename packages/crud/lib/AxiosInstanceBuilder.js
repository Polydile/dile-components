import Axios from 'axios'

export class AxiosInstanceBuilder {
  constructor(configuration) {
    if(!configuration || typeof configuration != 'object') {
      configuration = {}
    }
    const axiosConfig = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
    }
    if(configuration.baseURL) {
      axiosConfig.baseURL = configuration.baseURL;
    }
    if(configuration.withCredentials) {
      axiosConfig.withCredentials = true;
    }
    if(configuration.withXSRFToken) {
      axiosConfig.withXSRFToken = true;
    }
    if(configuration.headerAuthorization) {
      axiosConfig.headers.Authorization = configuration.headerAuthorization;
    }
    window.axiosInstance = Axios.create(axiosConfig);
  }
}
