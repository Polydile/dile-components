class TranslationService {
  constructor() {
    this.translations = {};
  }

  async loadTranslations(language) {
    try {
      if (!this.translations[language]) {
        const module = await import(`./i18n/${language}.js`);
        this.translations[language] = module.translations;
      }
    } catch (error) {
      console.warn(`Could not load translations for language: ${language}, falling back to English`);
      
      if (!this.translations['en']) {
        const defaultModule = await import('./i18n/en.js');
        this.translations['en'] = defaultModule.translations;
      }
      
      return this.translations['en'];
    }

    return this.translations[language];
  }
}

export const translationService = new TranslationService();
