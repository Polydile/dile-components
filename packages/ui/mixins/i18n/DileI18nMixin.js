
export const DileI18nMixin = (translationService) => (superclass) => class extends superclass {
  static get properties() {
    return {
      language: { type: String },
      translations: { type: Object },
    }
  }

  constructor() {
    super();
    this.language = 'en';
    this.translations = {};
  }

  async connectedCallback() {
    super.connectedCallback();
    this.translations = await translationService.loadTranslations(this.language);
  }

}