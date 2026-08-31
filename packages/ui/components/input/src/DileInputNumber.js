import { css } from 'lit';
import { DileInput } from './DileInput.js';

export class DileInputNumber extends DileInput {
    static styles = [
        DileInput.styles,
        css`
            :host {
                display: block;
            }
            input {
              text-align: var(--dile-input-number-text-align, var(--dile-input-text-align, right));
            }
        `
    ];

    static get properties() {
        return {
            decimalSeparator: { type: String },
            allowNegative: { type: Boolean },
            min: { type: Number },
            max: { type: Number },
            step: { type: String },
            decimals: { type: Number },
            normalizeOn: { type: String },
        };
    }

    constructor() {
        super();
        this.type = 'text';
        this.decimalSeparator = '.';
        this.allowNegative = true;
        this.min = null;
        this.max = null;
        this.step = 'any';
        this.decimals = null;
        this.normalizeOn = 'input';
        this.changed = false;
        this.viewValueOnFocus = null;
        this.isInputFocused = false;
    }

    firstUpdated() {
        super.firstUpdated();
        this.syncNativeInputConstraints();
    }

    get safeDecimalSeparator() {
        return this.decimalSeparator === ',' ? ',' : '.';
    }

    get alternateDecimalSeparator() {
        return this.safeDecimalSeparator === ',' ? '.' : ',';
    }

    sanitizeValue(value, options = {}) {
        const normalizeSeparator = options.normalizeSeparator !== false;
        if (value === null || value === undefined) {
            return '';
        }

        const decimalChars = normalizeSeparator
            ? [this.safeDecimalSeparator]
            : [this.safeDecimalSeparator, this.alternateDecimalSeparator];
        let text = value.toString();

        if (normalizeSeparator) {
            text = text.replaceAll(this.alternateDecimalSeparator, this.safeDecimalSeparator);
        }

        let sanitized = '';
        let hasSeparator = false;

        for (const char of text) {
            if (char >= '0' && char <= '9') {
                sanitized += char;
                continue;
            }
            if (decimalChars.includes(char) && !hasSeparator) {
                sanitized += char;
                hasSeparator = true;
                continue;
            }
            if (char === '-' && this.allowNegative && sanitized.length === 0) {
                sanitized += char;
            }
        }

        return sanitized;
    }

    normalizeToCanonical(value) {
        return this.sanitizeValue(value, { normalizeSeparator: false }).replace(',', '.');
    }

    sanitizeForView(value) {
        return this.sanitizeValue(value, { normalizeSeparator: false });
    }

    normalizeForForm(value) {
        if (!value) {
            return '';
        }
        return value
            .toString()
            .replace(',', '.');
    }

    get normalizeOnBlur() {
        return this.safeNormalizeOn === 'blur';
    }

    get safeNormalizeOn() {
        return this.normalizeOn === 'blur' ? 'blur' : 'input';
    }

    toNumber(value) {
        if (value === '' || value === '-' || value === null || value === undefined) {
            return NaN;
        }
        return parseFloat(this.normalizeForForm(value));
    }

    hasMinConstraint() {
        return this.min !== null && this.min !== undefined && !isNaN(this.min);
    }

    hasMaxConstraint() {
        return this.max !== null && this.max !== undefined && !isNaN(this.max);
    }

    hasDecimalsConstraint() {
        return this.decimals !== null && this.decimals !== undefined && !isNaN(this.decimals) && this.decimals >= 0;
    }

    hasStepConstraint() {
        if (this.step === null || this.step === undefined || this.step === '' || this.step === 'any') {
            return false;
        }
        const numericStep = parseFloat(this.step);
        return !isNaN(numericStep) && numericStep > 0;
    }

    roundFloating(value) {
        return parseFloat(value.toFixed(12));
    }

    applyStep(number) {
        if (!this.hasStepConstraint()) {
            return number;
        }
        const numericStep = parseFloat(this.step);
        const base = this.hasMinConstraint() ? this.min : 0;
        const stepped = base + Math.round((number - base) / numericStep) * numericStep;
        return this.roundFloating(stepped);
    }

    clamp(number) {
        let result = number;
        if (this.hasMinConstraint() && result < this.min) {
            result = this.min;
        }
        if (this.hasMaxConstraint() && result > this.max) {
            result = this.max;
        }
        return result;
    }

    formatNumber(number) {
        if (this.hasDecimalsConstraint()) {
            return number.toFixed(this.decimals);
        }
        return number.toString();
    }

    normalizeAndConstrain(value) {
        const sanitized = this.normalizeToCanonical(value);
        const parsed = this.toNumber(sanitized);

        if (isNaN(parsed)) {
            return '';
        }

        let constrained = this.clamp(parsed);
        constrained = this.applyStep(constrained);
        constrained = this.clamp(constrained);

        if (this.hasDecimalsConstraint()) {
            constrained = parseFloat(constrained.toFixed(this.decimals));
        }

        return this.formatNumber(constrained);
    }

    syncNativeInputConstraints() {
        if (!this.el) {
            return;
        }

        this.el.setAttribute('inputmode', 'decimal');

        if (this.hasMinConstraint()) {
            this.el.setAttribute('min', this.min.toString());
        } else {
            this.el.removeAttribute('min');
        }

        if (this.hasMaxConstraint()) {
            this.el.setAttribute('max', this.max.toString());
        } else {
            this.el.removeAttribute('max');
        }

        if (this.hasStepConstraint()) {
            this.el.setAttribute('step', this.step.toString());
        } else {
            this.el.setAttribute('step', 'any');
        }
    }

    _input(e) {
        const sanitizedForView = this.sanitizeForView(e.target.value);
        if (sanitizedForView !== e.target.value) {
            e.target.value = sanitizedForView;
        }
        this.viewValueOnFocus = sanitizedForView;
        this.value = this.normalizeToCanonical(sanitizedForView);

        if (!this.normalizeOnBlur) {
            const formatted = this.computeValue(this.value);
            if (e.target.value !== formatted) {
                e.target.value = formatted;
                this.viewValueOnFocus = formatted;
            }
        }

        if (this.hideErrorOnInput && this.errored) {
          this.clearError();
        }
    }

    doBlur(e) {
        this.isInputFocused = false;
        this.viewValueOnFocus = null;
        const num = this.normalizeAndConstrain(e.target.value);

        if (num !== e.target.value || this.changed) {
            this.value = num;
            this.emmitChange();
            this.changed = false;
        }

        if (this.normalizeOnBlur) {
            this.el.value = this.computeValue(this.value);
        }
    }

    doFocus() {
        this.isInputFocused = true;
        super.doFocus();
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has('normalizeOn') && this.normalizeOn !== this.safeNormalizeOn) {
            this.normalizeOn = this.safeNormalizeOn;
            return;
        }

        if (changedProperties.has('value') && this.value) {
            this.changed = true;
        }

        if (changedProperties.has('min') || changedProperties.has('max') || changedProperties.has('step') || changedProperties.has('decimals')) {
            if (this.value) {
                const normalized = this.normalizeAndConstrain(this.value);
                if (normalized !== this.value) {
                    this.value = normalized;
                    return;
                }
            }
            this.syncNativeInputConstraints();
        }

        if (changedProperties.has('value') || changedProperties.has('decimalSeparator')) {
            this.internals.setFormValue(this.normalizeForForm(this.value));
        }

        if (changedProperties.has('decimalSeparator') || changedProperties.has('normalizeOn')) {
            this.syncNativeInputConstraints();
        }
    }

    computeValue(value) {
        if (this.normalizeOnBlur && this.isInputFocused && this.viewValueOnFocus !== null) {
            return this.viewValueOnFocus;
        }
        const canonical = this.normalizeToCanonical(value);
        return canonical.replace('.', this.safeDecimalSeparator);
    }
}