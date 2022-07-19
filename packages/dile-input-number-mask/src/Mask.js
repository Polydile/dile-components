export class Mask {
  constructor(pattern) {
    this.pattern = pattern;
  }

  setPattern(newPattern) {
    this.pattern = newPattern;
  }

  maskIt(value) {
    let position = 0;
    let masked = '';
    let currentChar = 0;
    while (position < this.pattern.length && currentChar < value.length) {
      if (this.pattern[position] === '0') {
        masked += value[currentChar];
        currentChar++;
      } else {
        masked += this.pattern[position];
      }
      position++;
    }
    return masked;
  }

  getNumberCharactersOnPattern() {
    let numberChars = 0;
    for (let i = 0; i < this.pattern.length; i++) {
      if (this.pattern[i] === '0') {
        numberChars++;
      }
    }
    return numberChars;
  }

  
}