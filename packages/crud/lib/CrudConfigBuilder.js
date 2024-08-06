import { deepMerge } from './deepMerge.js';
import { defaultConfig } from './defaultConfig.js';

export class CrudConfigBuilder {
  constructor(endpoint, customConfig) {
    this.config = deepMerge(defaultConfig, customConfig);
    this.config.endpoint = endpoint;
  }
 
  getConfig() {
    return this.config;
  }
}
