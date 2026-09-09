import { html, css, LitElement } from "lit";
import '@dile/iconlib/dile-iconlib.js';
import '@dile/iconlib/lucide-icons/timer.js';

export class DileTimeDuration extends LitElement {
  static properties = {
    seconds: { 
      type: Number
    },
    precision: {
      type: String
    },
    extended: {
      type: Boolean
    },
    language: {
      type: String
    },
    icon: {
      type: String
    }
  };

  constructor() {
    super();
    this.seconds = 0;
    this.precision = "seconds"; // seconds, minutes, hours, days
    this.extended = false;
    this.language = "en";
    this.icon = "lucide.timer";
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: var(--dile-time-duration-font-size, 0.875rem);
        color: var(--dile-time-duration-color, var(--dile-on-background-color, #303030));
      }

      .icon {
        display: flex;
        align-items: center;
        --dile-icon-color: var(--dile-primary-color, #888);
        --dile-icon-size: var(--dile-time-duration-icon-size, 20px);
      }

      .time-text {
        display: inline;
        font-weight: var(--dile-time-duration-font-weight, normal);
        font-family: var(--dile-time-duration-font-family, inherit);
        letter-spacing: var(--dile-time-duration-letter-spacing, 0);
      }
    `;
  }

  #getTranslations() {
    const translations = {
      en: {
        day: { singular: 'day', plural: 'days' },
        hour: { singular: 'hour', plural: 'hours' },
        minute: { singular: 'minute', plural: 'minutes' },
        second: { singular: 'second', plural: 'seconds' },
        and: 'and'
      },
      es: {
        day: { singular: 'día', plural: 'días' },
        hour: { singular: 'hora', plural: 'horas' },
        minute: { singular: 'minuto', plural: 'minutos' },
        second: { singular: 'segundo', plural: 'segundos' },
        and: 'y'
      }
    };
    return translations[this.language] || translations.en;
  }

  #getUnitLabel(unit, value) {
    const t = this.#getTranslations();
    const labels = {
      day: t.day,
      hour: t.hour,
      minute: t.minute,
      second: t.second
    };
    const label = labels[unit];
    return value === 1 ? label.singular : label.plural;
  }

  #formatTime() {
    if (!Number.isFinite(this.seconds) || this.seconds < 0) {
      return '';
    }

    const units = [
      { name: 'day', seconds: 86400 },
      { name: 'hour', seconds: 3600 },
      { name: 'minute', seconds: 60 },
      { name: 'second', seconds: 1 }
    ];

    const precisionLevels = {
      days: ['day'],
      hours: ['day', 'hour'],
      minutes: ['day', 'hour', 'minute'],
      seconds: ['day', 'hour', 'minute', 'second']
    };

    const allowedUnits = precisionLevels[this.precision] || precisionLevels.minutes;
    const parts = [];
    let remaining = Math.floor(this.seconds);

    for (const unit of units) {
      if (!allowedUnits.includes(unit.name)) continue;

      const value = Math.floor(remaining / unit.seconds);
      if (value > 0) {
        parts.push({ name: unit.name, value });
        remaining -= value * unit.seconds;
      }
    }

    // If everything is 0, show 0 of the smallest allowed unit
    if (parts.length === 0) {
      const smallestUnit = allowedUnits[allowedUnits.length - 1];
      parts.push({ name: smallestUnit, value: 0 });
    }

    // Keep only two parts
    const displayParts = parts.slice(0, 2);

    if (this.extended) {
      return this.#formatExtended(displayParts);
    } else {
      return this.#formatCompact(displayParts);
    }
  }

  #formatCompact(parts) {
    const unitAbbreviations = {
      en: { day: 'd', hour: 'h', minute: 'm', second: 's' },
      es: { day: 'd', hour: 'h', minute: 'm', second: 's' }
    };
    const abbr = unitAbbreviations[this.language] || unitAbbreviations.en;
    
    return parts
      .map(part => `${part.value}${abbr[part.name]}`)
      .join(' ');
  }

  #formatExtended(parts) {
    const t = this.#getTranslations();
    const formattedParts = parts.map(part => 
      `${part.value} ${this.#getUnitLabel(part.name, part.value)}`
    );
    
    if (formattedParts.length === 1) {
      return formattedParts[0];
    }
    
    return formattedParts.join(` ${t.and} `);
  }

  render() {
    const formattedTime = this.#formatTime();
    
    return html`
      ${this.icon ? html`
        <div class="icon">
          <dile-iconlib icon="${this.icon}"></dile-iconlib>
        </div>
      ` : ''}
      <span class="time-text">${formattedTime}</span>
    `;
  }
}
