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
      withCredentials: configuration.withCredentials || false,
      withXSRFToken: configuration.withXSRFToken || false,
    }
    if(configuration.baseURL) {
      axiosConfig.baseURL = configuration.baseURL;
    }
    window.axiosInstance = Axios.create(axiosConfig);
  }
}
