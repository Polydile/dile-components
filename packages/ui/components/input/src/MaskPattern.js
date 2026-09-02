/**
 * Generic mask pattern that supports letters (A/a), numbers (0), and literal characters.
 * Pattern definition:
 *   'A' = any letter (a-z, A-Z) - will be transformed to UPPERCASE
 *   'a' = any letter (a-z, A-Z) - will be transformed to lowercase
 *   '0' = any digit (0-9)
 *   other chars = fixed literal characters in the mask
 *
 * Examples:
 *   'aa00 0000 0000 0000 0000' = IBAN format (2 lowercase letters, check digit, then numbers with spaces)
 *   '(000) 000-0000' = US phone format
 *   'AA-00-AA' = Format with uppercase letters and digits
 */
export class MaskPattern {
  constructor(pattern, language = 'en') {
    this.pattern = pattern;
    this.language = language;
    this.parsePattern();
  }

  parsePattern() {
    this.patternMap = [];
    
    for (let i = 0; i < this.pattern.length; i++) {
      const char = this.pattern[i];
      if (char === 'A') {
        this.patternMap.push({ type: 'letterUpper', index: i });
      } else if (char === 'a') {
        this.patternMap.push({ type: 'letterLower', index: i });
      } else if (char === '0') {
        this.patternMap.push({ type: 'digit', index: i });
      } else {
        this.patternMap.push({ type: 'literal', char, index: i });
      }
    }
  }

  setPattern(newPattern) {
    this.pattern = newPattern;
    this.parsePattern();
  }

  setLanguage(language) {
    this.language = language;
  }

  getTotalCharactersExpected() {
    return this.patternMap.filter(p => p.type !== 'literal').length;
  }

  maskIt(value) {
    let valueIndex = 0;
    let masked = '';

    for (let i = 0; i < this.patternMap.length; i++) {
      const patternInfo = this.patternMap[i];

      if (patternInfo.type === 'literal') {
        masked += patternInfo.char;
      } else {
        if (valueIndex < value.length) {
          masked += value[valueIndex];
          valueIndex++;
        } else {
          break;
        }
      }
    }

    return masked;
  }

  /**
   * Validates if the given value matches the pattern requirements
   * Only validates positions that have been filled
   * Note: Validation only checks if a character is a letter or digit, 
   * actual case transformation is done by transformValue()
   */
  validate(value) {
    let valueIndex = 0;

    for (let i = 0; i < this.patternMap.length && valueIndex < value.length; i++) {
      const patternInfo = this.patternMap[i];

      if (patternInfo.type === 'letterUpper' || patternInfo.type === 'letterLower') {
        const char = value[valueIndex];
        if (!/[a-zA-Z]/.test(char)) {
          return {
            valid: false,
            error: this.getErrorMessage('invalidLetter', valueIndex + 1, char),
          };
        }
        valueIndex++;
      } else if (patternInfo.type === 'digit') {
        const char = value[valueIndex];
        if (!/[0-9]/.test(char)) {
          return {
            valid: false,
            error: this.getErrorMessage('invalidDigit', valueIndex + 1, char),
          };
        }
        valueIndex++;
      }
    }

    return { valid: true, error: null };
  }

  isComplete(value) {
    return value.length === this.getTotalCharactersExpected();
  }

  getFormatDescription() {
    const lettersUpper = this.patternMap.filter(p => p.type === 'letterUpper').length;
    const lettersLower = this.patternMap.filter(p => p.type === 'letterLower').length;
    const digits = this.patternMap.filter(p => p.type === 'digit').length;
    
    const parts = [];
    if (lettersUpper > 0) parts.push(`${lettersUpper} uppercase letter${lettersUpper !== 1 ? 's' : ''}`);
    if (lettersLower > 0) parts.push(`${lettersLower} lowercase letter${lettersLower !== 1 ? 's' : ''}`);
    if (digits > 0) parts.push(`${digits} digit${digits !== 1 ? 's' : ''}`);
    
    return parts.join(' + ');
  }

  getCleanValue(maskedValue) {
    return maskedValue.replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Transforms a clean value according to the pattern's case requirements
   * 'A' positions will be uppercase, 'a' positions will be lowercase
   * Returns only the transformed value (letters and digits), without literals
   * @param {string} cleanValue - The clean value (letters and digits only)
   * @returns {string} The transformed value with case applied (no literals)
   */
  transformValue(cleanValue) {
    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < this.patternMap.length; i++) {
      const patternInfo = this.patternMap[i];

      if (patternInfo.type === 'letterUpper') {
        if (valueIndex < cleanValue.length) {
          result += cleanValue[valueIndex].toUpperCase();
          valueIndex++;
        }
      } else if (patternInfo.type === 'letterLower') {
        if (valueIndex < cleanValue.length) {
          result += cleanValue[valueIndex].toLowerCase();
          valueIndex++;
        }
      } else if (patternInfo.type === 'digit') {
        if (valueIndex < cleanValue.length) {
          result += cleanValue[valueIndex];
          valueIndex++;
        }
      }
      // Note: We skip literals here, they will be added by maskIt()
    }

    return result;
  }

  getErrorMessage(type, position, char) {
    const messages = {
      en: {
        invalidLetter: `Position ${position}: expected a letter but got "${char}"`,
        invalidDigit: `Position ${position}: expected a digit but got "${char}"`,
      },
      es: {
        invalidLetter: `Posición ${position}: se esperaba una letra pero recibió "${char}"`,
        invalidDigit: `Posición ${position}: se esperaba un dígito pero recibió "${char}"`,
      },
      fr: {
        invalidLetter: `Position ${position} : lettre attendue mais reçu "${char}"`,
        invalidDigit: `Position ${position} : chiffre attendu mais reçu "${char}"`,
      },
      de: {
        invalidLetter: `Position ${position}: Buchstabe erwartet, aber "${char}" erhalten`,
        invalidDigit: `Position ${position}: Ziffer erwartet, aber "${char}" erhalten`,
      },
      cat: {
        invalidLetter: `Posició ${position}: s'esperava una lletra però va rebre "${char}"`,
        invalidDigit: `Posició ${position}: s'esperava un dígit però va rebre "${char}"`,
      },
    };

    const lang = messages[this.language] || messages['en'];
    return lang[type] || '';
  }
}

