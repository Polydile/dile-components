import { deepMerge } from './deepMerge.js';
import { defaultConfig } from './defaultConfig.js';

export class CrudConfigBuilder {
  constructor(endpoint, customConfig) {
    this.config = deepMerge(defaultConfig, customConfig);
    this.config.endpoint = endpoint;
  }
 
  getConfig(endpoint = null) {
    if (endpoint !== null) {
      const configCopy = { ...this.config };
      configCopy.endpoint = endpoint;
      return configCopy;
    }
    return this.config;
  }
}
