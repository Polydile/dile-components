import '../lucide-icons/dot.js';
import { DileIconWrapperBase } from "./DileIconWrapperBase.js";

const KNOWN_FAMILIES = ['lucide', 'material', 'fontawesome', 'phosphor', 'tabler'];

export class DileIconlib extends DileIconWrapperBase {
  constructor() {
    super('lucide.dot'); // único default (no uno por familia); ya viene en formato "familia.nombre"
  }

  getTagName() {
    if (!this.icon) return null;
    const dotIndex = this.icon.indexOf('.');
    if (dotIndex === -1) {
      console.warn(`dile-iconlib: icon="${this.icon}" no tiene el formato "familia.nombre", ej. "lucide.home".`);
      return null;
    }
    const family = this.icon.slice(0, dotIndex);
    const name = this.icon.slice(dotIndex + 1);
    if (!name) return null;
    if (!KNOWN_FAMILIES.includes(family)) {
      console.warn(`dile-iconlib: familia desconocida "${family}". Esperado: ${KNOWN_FAMILIES.join(', ')}.`);
    }
    return `dile-${family}-icon-${name}`;
  }
}
