import Axios from 'axios'

export class AxiosInstanceBuilder {
  constructor(configuration) {
    console.log('akkk', configuration);
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
    console.log('crear instancia axiosInstance', axiosConfig);
    window.axiosInstance = Axios.create(axiosConfig);
  }
}
