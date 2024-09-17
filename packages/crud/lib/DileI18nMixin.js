import { translationService } from './translationService.js';

export const DileI18nMixin = (superclass) => class extends superclass {
  static get properties() {
    return {
      language: { type: String },
      translations: { type: Object },
    }
  }

  constructor() {
    super();
    this.language = 'en';
  }

  async connectedCallback() {
    super.connectedCallback();
    this.translations = await translationService.loadTranslations(this.language);
  }

}