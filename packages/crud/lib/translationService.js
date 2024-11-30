import { TranslationService as OriginalTranslationService } from '@dile/ui/mixins/i18n/TranslationService.js';

class TranslationService extends OriginalTranslationService {
  async importLanguage(language) {
    switch (language) {
      case 'es':
        return import('./i18n/es.js');
      case 'en':
        return import('./i18n/en.js');
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  async importFallback() {
    try {
      return import('./i18n/en.js');
    } catch (error) {
      throw new Error('Fallback translation file not found.');
    }
  }
}

export const translationService = new TranslationService();
