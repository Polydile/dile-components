export class TranslationService {
  constructor() {
    this.translations = {};
  }

  async loadTranslations(language) {
    try {
      if (!this.translations[language]) {
        const module = await this.importLanguage(language)
        this.translations[language] = module.translations;
      }
    } catch (error) {
      console.warn(`Could not load translations for language: ${language}, falling back to English`);
      
      if (!this.translations['en']) {
        const defaultModule = await this.importFallback();
        this.translations['en'] = defaultModule.translations;
      }
      
      return this.translations['en'];
    }

    return this.translations[language];
  }

  async importLanguage(language) {
    // overwrite to import the language
  }

  async importFallback() {
    // overwrite to import the fallback language
  }
}
