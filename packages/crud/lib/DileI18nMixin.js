import { DileI18nMixin as OriginalDileI18nMixin } from '@dile/ui/mixins/i18n/DileI18nMixin.js';
import { translationService } from './translationService.js';
export const DileI18nMixin = (superclass) => 
  class extends OriginalDileI18nMixin(translationService)(superclass) {
    constructor() {
      super();
      this.translations = {
        success_operation: () => '',
        error_operation: () => '',
        showing_page_size: () => '',
        current_page: () => '',
      };
    }
  };