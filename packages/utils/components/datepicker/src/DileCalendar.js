import { css, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
//import { LionCalendar } from '@lion/ui/components/calendar/src/LionCalendar.js';
import { LionCalendar } from '@lion/ui/calendar.js';

export class DileCalendar extends LionCalendar {
    static get properties() {
        return {
            ...super.properties,
            __yearPickerOpen: { type: Boolean, state: true },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
                .calendar-shell {
                    position: relative;
                }
                .calendar__navigation {
                    display: flex;
                    justify-content: var(--dile-calendar-navigation-justify-content, space-between);
                    align-items: center;
                    margin-top: 0.4rem;
                }
                .calendar__navigation__year h2 {
                    width: 9ch;
                    flex-shrink: 0;
                    visibility: hidden;
                }
                 .calendar__navigation button {
                    min-height: auto;
                    min-width: 30px;
                 }
                .calendar__navigation h2 {
                    margin: 0;
                    display: flex;
                    align-items: center;
                    min-height: auto;
                    font-size: 0.9rem;
                    line-height: 1.36;
                }
                @media(min-width: 400px) {
                    .calendar__navigation h2 {
                        font-size: var(--dile-calendar-navigation-text-size, 1.1rem);
                    }
                }
                .calendar__day-button {
                    min-width: 26px;
                    min-height: 26px;
                    background-color: var(--dile-calendar-day-background-color, rgba(90, 90, 90, 0.08));
                    color: var(--dile-calendar-day-text-color, #303030);
                    border-radius: var(--dile-calendar-day-border-radius, 2px);
                    font: inherit;
                    font-weight: normal;
                    line-height: 1;
                }
                .calendar__day-button__text {
                    font: inherit;
                    font-weight: normal;
                    line-height: 1;
                }
                .calendar__day-button[today] {
                    background-color: var(--dile-calendar-today-background-color, rgba(90, 90, 90, 0.20));
                }
                .calendar__day-button[next-month], .calendar__day-button[previous-month] {
                    color: var(--dile-calendar-out-day-text-color, #777);
                    opacity: 0.6;
                }
                .calendar__next-button , .calendar__previous-button{
                    background-color: transparent;
                    color: var(--dile-calendar-nav-buttons-color, #303030);
                    font-size: 1.1em;
                }
                @media(min-width: 350px) {
                    .calendar__day-button {
                        min-width: var(--dile-calendar-day-size, 28px);
                        min-height: var(--dile-calendar-day-size, 28px);
                    }
                }
                @media(min-width: 400px) {
                    .calendar__day-button {
                        min-width: var(--dile-calendar-day-size, 32px);
                        min-height: var(--dile-calendar-day-size, 32px);
                    } 
                }
                @media(min-width: 500px) {
                    .calendar__day-button {
                        min-width: var(--dile-calendar-day-size, 36px);
                        min-height: var(--dile-calendar-day-size, 36px);
                    } 
                }
                .year-picker {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: calc(8px + 30px);
                    display: flex;
                    align-items: center;
                    height: 1.36em;
                    font-size: 0.9rem;
                }
                @media(min-width: 400px) {
                    .year-picker {
                        font-size: var(--dile-calendar-navigation-text-size, 1.1rem);
                    }
                }
                .year-picker-trigger {
                    min-height: 30px;
                    width: 9ch;
                    padding: 0 4px;
                    border: 0;
                    border-bottom: 1px dotted currentColor;
                    background: transparent;
                    color: var(--dile-calendar-day-text-color, #303030);
                    font: inherit;
                    font-size: 0.9rem;
                    text-align: center;
                    cursor: pointer;
                }
                .year-picker-trigger:focus-visible,
                .year-picker-input:focus-visible {
                    outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                    outline-offset: 2px;
                }
                .year-picker-input {
                    box-sizing: border-box;
                    width: 9ch;
                    min-height: 30px;
                    padding: 2px 4px;
                    border: 1px solid var(--dile-input-border-color, #888);
                    border-radius: 3px;
                    background: var(--dile-input-background-color, #fff);
                    color: var(--dile-calendar-day-text-color, #303030);
                    font: inherit;
                    font-size: 0.9rem;
                    text-align: center;
                }
                @media(min-width: 400px) {
                    .year-picker-trigger,
                    .year-picker-input {
                        font-size: var(--dile-calendar-navigation-text-size, 1.1rem);
                    }
                }
            `
        ];
    }

    constructor() {
        super();
        const earliestDate = new Date(0);
        earliestDate.setFullYear(1, 0, 1);
        this.minDate = earliestDate;
        this.__yearPickerOpen = false;
    }

    render() {
        const year = this.centralDate.getFullYear();
        return html`
            <div class="calendar-shell">
                <div class="year-picker">
                    ${this.__yearPickerOpen
                        ? html`
                            <input
                                id="year-picker-input"
                                class="year-picker-input"
                                type="number"
                                step="1"
                                required
                                aria-label="${this.__yearFieldLabel}"
                                min="${ifDefined(this.minDate?.getFullYear())}"
                                max="${ifDefined(this.maxDate?.getFullYear())}"
                                .value="${String(year)}"
                                @keydown="${this.__handleYearKeydown}"
                                @blur="${this.__closeYearPicker}"
                            >
                        `
                        : html`
                            <button
                                class="year-picker-trigger"
                                type="button"
                                title="${this.__yearFieldLabel}"
                                aria-label="${this.__yearFieldLabel}: ${year}"
                                @click="${this.__openYearPicker}"
                            >${year}</button>
                        `}
                </div>
                ${super.render()}
            </div>
        `;
    }

    get __yearFieldLabel() {
        const locale = this.locale || document.documentElement.lang || navigator.language || 'en';
        return new Intl.DisplayNames([locale], { type: 'dateTimeField' }).of('year') || 'Year';
    }

    async __openYearPicker() {
        this.__yearPickerOpen = true;
        await this.updateComplete;
        const input = this.shadowRoot.querySelector('.year-picker-input');
        input?.focus();
        input?.select();
    }

    __closeYearPicker(event) {
        this.__commitYear(event.currentTarget, false);
    }

    __handleYearKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.__commitYear(event.currentTarget);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.__yearPickerOpen = false;
            this.updateComplete.then(() => this.shadowRoot.querySelector('.year-picker-trigger')?.focus());
        }
    }

    __commitYear(input, restoreFocus = true) {
        input.setCustomValidity('');
        if (!this.__yearPickerOpen || !input.reportValidity()) {
            return;
        }

        const year = input.valueAsNumber;
        const date = new Date(this.centralDate);
        date.setFullYear(year, this.centralDate.getMonth(), 1);

        if (!Number.isInteger(year) || Number.isNaN(date.getTime())) {
            input.setCustomValidity('Enter a valid year.');
            input.reportValidity();
            return;
        }

        input.setCustomValidity('');
        this.__yearPickerOpen = false;
        this.centralDate = date;
        if (restoreFocus) {
            this.updateComplete.then(() => this.shadowRoot.querySelector('.year-picker-trigger')?.focus());
        }
    }
}