import { TranslationService as OriginalTranslationService } from '@dile/ui/mixins/i18n/TranslationService.js';

const translations = import.meta.glob('./i18n/*.js', { eager: true });

class TranslationService extends OriginalTranslationService {
  async importLanguage(language) {
    const importPath = `./i18n/${language}.js`;

    if (translations[importPath]) {
      return translations[importPath];
    } else {
      throw new Error(`Translation file for language "${language}" not found.`);
    }
  }

  async importFallback() {
    const fallbackPath = './i18n/en.js';

    if (translations[fallbackPath]) {
      return translations[fallbackPath];
    } else {
      throw new Error('Fallback translation file not found.');
    }
  }
}

export const translationService = new TranslationService();