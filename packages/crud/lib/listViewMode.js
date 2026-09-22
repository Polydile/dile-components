import { defaultConfig } from './defaultConfig.js';

export function hasGridView(config) {
  return typeof config?.templates?.grid === 'function'
    || Array.isArray(config?.grid?.columns);
}

export function hasItemView(config) {
  return typeof config?.templates?.item === 'function'
    && config.templates.item !== defaultConfig.templates.item;
}

export function canSwitchListView(config) {
  return hasGridView(config)
    && hasItemView(config)
    && !config?.customization?.disableListWiewSwitch;
}
