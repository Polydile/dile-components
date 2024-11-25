import {TranslationService as OriginalTranslationService} from '@dile/ui/mixins/i18n/TranslationService.js';

const translations = import.meta.glob('./i18n/*.js', { eager: true })

class TranslationService extends OriginalTranslationService {
  async importLanguage(language) {
    const module = await import(`./i18n/${language}.js`);
    return module;
  }

  async importFallback() {
    const defaultModule = await import('./i18n/en.js');
    return defaultModule;
  }
}

export const translationService = new TranslationService();
