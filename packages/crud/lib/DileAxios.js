import { AxiosInstanceBuilder } from './AxiosInstanceBuilder.js';

export const DileAxios = (superclass) => class extends superclass {
  get axiosInstance() {
    if (window.axiosInstance) {
      return window.axiosInstance;
    }
    if (window.axios) {
      return window.axios;
    }
    new AxiosInstanceBuilder()
    return window.axiosInstance;
  }
}