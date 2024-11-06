import { DileI18nMixin as OriginalDileI18nMixin } from '@dile/ui/mixins/i18n/DileI18nMixin.js';
import { translationService } from './translationService';

export const DileI18nMixin = (superclass) => 
  class extends OriginalDileI18nMixin(translationService)(superclass) {
    
  };