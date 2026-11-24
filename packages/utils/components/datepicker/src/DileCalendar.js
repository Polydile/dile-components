import { css, html, svg, nothing } from 'lit';
import { LionCalendar } from '@lion/ui/calendar.js';
import { getMonthNames } from '@lion/ui/localize-no-side-effects.js';
import '@dile/ui/components/wheel-picker/wheel-picker.js';

const DEFAULT_YEAR_RANGE = 100;
// Lion normalizes dates with new Date(year, month, day), which maps years 0-99 to 1900-1999,
// so the earliest date that compares correctly is in year 100.
const EARLIEST_DATE = new Date(100, 0, 1);
const LATEST_DATE = new Date(8640000000000000);
const isValidDate = (date) => date instanceof Date && !Number.isNaN(date.getTime());
const checkIcon = svg`<path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>`;

export class DileCalendar extends LionCalendar {
    static get properties() {
        return {
            ...super.properties,
            minYear: { type: Number },
            maxYear: { type: Number },
            monthYearAcceptLabel: { type: String },
            __monthYearOpen: { type: Boolean, state: true },
        };
    }

    static get styles() {
        return [
            super.styles,
            css`
                .calendar__navigation {
                    display: flex;
                    justify-content: var(--dile-calendar-navigation-justify-content, space-between);
                    align-items: center;
                    margin-top: 0.4rem;
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
                .calendar__navigation-toggle {
                    min-height: 30px;
                    padding: 0 4px;
                    border: 0;
                    border-bottom: 1px dotted currentColor;
                    border-radius: 0;
                    background: transparent;
                    color: var(--dile-calendar-day-text-color, #303030);
                    font: inherit;
                    text-align: center;
                    cursor: pointer;
                }
                .calendar__navigation-toggle[aria-expanded="true"] {
                    border-bottom-style: solid;
                }
                .calendar__navigation-toggle:focus-visible {
                    outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                    outline-offset: 2px;
                }
                .calendar-body {
                    position: relative;
                }
                .calendar-body.month-year-open > :not(.month-year-layer) {
                    visibility: hidden;
                }
                .month-year-layer {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    gap: 0.25rem;
                    padding-bottom: 12px;
                    box-sizing: border-box;
                    --dile-wheel-picker-item-height: var(--dile-calendar-wheel-item-height, 36px);
                    --dile-wheel-picker-font-size: var(--dile-calendar-wheel-font-size, 1.1rem);
                    --dile-wheel-picker-text-color: var(--dile-calendar-wheel-text-color, color-mix(in srgb, var(--dile-calendar-day-text-color, #303030) 60%, transparent));
                    --dile-wheel-picker-selected-text-color: var(--dile-calendar-wheel-selected-text-color, var(--dile-calendar-day-text-color, #303030));
                    --dile-wheel-picker-band-background-color: var(--dile-calendar-wheel-band-background-color, var(--dile-calendar-day-background-color, rgba(90, 90, 90, 0.08)));
                }
                .month-year-columns {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .month-year-accept {
                    flex-shrink: 0;
                    align-self: center;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    padding: 0;
                    border: 1px solid var(--dile-calendar-month-year-accept-border-color, color-mix(in srgb, currentColor 35%, transparent));
                    border-radius: 50%;
                    background: transparent;
                    color: var(--dile-calendar-month-year-accept-color, var(--dile-calendar-nav-buttons-color, #303030));
                    cursor: pointer;
                }
                .month-year-accept:hover {
                    background-color: var(--dile-calendar-day-background-color, rgba(90, 90, 90, 0.08));
                }
                .month-year-accept:focus-visible {
                    outline: 2px solid var(--dile-input-focus-border-color, var(--dile-link-color, #6af));
                    outline-offset: 2px;
                }
                .month-year-accept svg {
                    width: 18px;
                    height: 18px;
                    fill: currentColor;
                }
                .month-wheel {
                    flex: 3;
                }
                .year-wheel {
                    flex: 2;
                }
            `
        ];
    }

    constructor() {
        super();
        this.minDate = new Date(EARLIEST_DATE);
        this.monthYearAcceptLabel = 'OK';
        this.__monthYearOpen = false;
        this.__monthItemsCache = { key: '', items: [] };
        this.__yearItemsCache = { key: '', items: [] };
    }

    requestUpdate(name, oldValue, options) {
        // Lion rebuilds the days as soon as these properties change, so empty
        // or invalid values are replaced by the defaults before that happens.
        if (name === 'minDate' && (!isValidDate(this.minDate) || this.minDate < EARLIEST_DATE)) {
            this.minDate = new Date(EARLIEST_DATE);
            return;
        }
        if (name === 'maxDate' && !isValidDate(this.maxDate)) {
            this.maxDate = new Date(LATEST_DATE);
            return;
        }
        if (name === 'disableDates' && typeof this.disableDates !== 'function') {
            this.disableDates = () => false;
            return;
        }
        super.requestUpdate(name, oldValue, options);
    }

    willUpdate(changedProperties) {
        super.willUpdate?.(changedProperties);
        const limitsChanged = ['minDate', 'maxDate', 'disableDates'].some(name => changedProperties.has(name));
        if (this.hasUpdated && limitsChanged && !this.__isEnabledDate(this.centralDate)) {
            this.centralDate = this.findNearestEnabledDate(this.centralDate);
        }
    }

    render() {
        return html`
            <div class="calendar" role="application" @keydown="${this.__onCalendarKeydown}">
                ${this.__renderNavigation()}
                <div class="calendar-body ${this.__monthYearOpen ? 'month-year-open' : ''}">
                    ${this.__renderData()}
                    ${this.__monthYearOpen ? this.__renderMonthYearLayer() : nothing}
                </div>
            </div>
        `;
    }

    /**
     * Shows the month and year selection layer instead of the days grid.
     * @param {'month'|'year'} focusColumn column that receives the focus
     */
    async openMonthYearPicker(focusColumn = 'year') {
        this.__monthYearOpen = true;
        await this.updateComplete;
        const wheel = this.shadowRoot.querySelector(focusColumn === 'month' ? '.month-wheel' : '.year-wheel');
        await wheel?.updateComplete;
        wheel?.focus();
    }

    /**
     * Hides the month and year selection layer and shows the days grid again.
     */
    closeMonthYearPicker() {
        this.__monthYearOpen = false;
    }

    /**
     * Shows the month of the given date, or of the nearest enabled date.
     * @param {Date} [date] defaults to today
     */
    goToDate(date = new Date()) {
        const target = new Date(date);
        this.centralDate = this.__isEnabledDate(target) ? target : this.findNearestEnabledDate(target);
    }

    get monthYearPickerOpened() {
        return this.__monthYearOpen;
    }

    __renderNavigation() {
        const monthNames = this.__monthNames();
        const monthIndex = this.centralDate.getMonth();
        const month = monthNames[monthIndex];
        const year = this.centralDate.getFullYear();
        const nextMonth = monthNames[(monthIndex + 1) % 12];
        const previousMonth = monthNames[(monthIndex + 11) % 12];
        const nextMonthYear = monthIndex === 11 ? year + 1 : year;
        const previousMonthYear = monthIndex === 0 ? year - 1 : year;
        return html`
            <div class="calendar__navigation">
                <div class="calendar__navigation__month">
                    ${this.__renderPreviousButton('Month', previousMonth, previousMonthYear)}
                    <h2 class="calendar__navigation-heading" id="month" aria-atomic="true">
                        ${this.__renderToggle('month', month, this.__fieldLabel('month'))}
                    </h2>
                    ${this.__renderNextButton('Month', nextMonth, nextMonthYear)}
                </div>
                <div class="calendar__navigation__year">
                    ${this.__renderPreviousButton('FullYear', month, year - 1)}
                    <h2 class="calendar__navigation-heading" id="year" aria-atomic="true">
                        ${this.__renderToggle('year', year, this.__fieldLabel('year'))}
                    </h2>
                    ${this.__renderNextButton('FullYear', month, year + 1)}
                </div>
            </div>
        `;
    }

    __renderToggle(column, text, fieldLabel) {
        return html`
            <button
                type="button"
                class="calendar__navigation-toggle calendar__navigation-toggle--${column}"
                aria-expanded="${this.__monthYearOpen ? 'true' : 'false'}"
                aria-controls="month-year-layer"
                aria-label="${fieldLabel}: ${text}"
                title="${fieldLabel}"
                @click="${() => this.__toggleMonthYear(column)}"
            >${text}</button>
        `;
    }

    __renderMonthYearLayer() {
        return html`
            <div
                id="month-year-layer"
                class="month-year-layer"
                @dile-wheel-picker-changed="${this.__stopEvent}"
                @element-changed="${this.__stopEvent}"
            >
                <div class="month-year-columns">
                <dile-wheel-picker
                    class="month-wheel"
                    label="${this.__fieldLabel('month')}"
                    .items="${this.__monthItems()}"
                    .value="${this.centralDate.getMonth()}"
                    @dile-wheel-picker-changed="${this.__onMonthChanged}"
                ></dile-wheel-picker>
                <dile-wheel-picker
                    class="year-wheel"
                    label="${this.__fieldLabel('year')}"
                    .items="${this.__yearItems()}"
                    .value="${this.centralDate.getFullYear()}"
                    @dile-wheel-picker-changed="${this.__onYearChanged}"
                ></dile-wheel-picker>
                </div>
                <button
                    type="button"
                    class="month-year-accept"
                    aria-label="${this.monthYearAcceptLabel}"
                    title="${this.monthYearAcceptLabel}"
                    @click="${this.__acceptMonthYear}"
                ><svg viewBox="0 0 24 24" aria-hidden="true">${checkIcon}</svg></button>
            </div>
        `;
    }

    __monthNames() {
        return getMonthNames({ locale: this.__getLocale() });
    }

    __fieldLabel(field) {
        const fallback = field === 'year' ? 'Year' : 'Month';
        try {
            const locale = this.__getLocale() || document.documentElement.lang || navigator.language || 'en';
            return new Intl.DisplayNames([locale], { type: 'dateTimeField' }).of(field) || fallback;
        } catch (e) {
            return fallback;
        }
    }

    __monthItems() {
        const year = this.centralDate.getFullYear();
        const names = this.__monthNames();
        const key = [names.join(), year, this.minDate?.getTime(), this.maxDate?.getTime()].join('|');
        if (this.__monthItemsCache.key !== key) {
            const items = names.map((label, month) => {
                const firstDay = new Date(this.centralDate);
                firstDay.setFullYear(year, month, 1);
                firstDay.setHours(0, 0, 0, 0);
                const lastDay = new Date(firstDay);
                lastDay.setFullYear(year, month + 1, 0);
                lastDay.setHours(23, 59, 59, 999);
                const disabled = Boolean((this.minDate && lastDay < this.minDate)
                    || (this.maxDate && firstDay > this.maxDate));
                return { value: month, label, disabled };
            });
            this.__monthItemsCache = { key, items };
        }
        return this.__monthItemsCache.items;
    }

    __yearRange() {
        const currentYear = new Date().getFullYear();
        let from = Number.isFinite(this.minYear) ? this.minYear : currentYear - DEFAULT_YEAR_RANGE;
        let to = Number.isFinite(this.maxYear) ? this.maxYear : currentYear + DEFAULT_YEAR_RANGE;
        if (this.minDate) {
            from = Math.max(from, this.minDate.getFullYear());
        }
        if (this.maxDate) {
            to = Math.min(to, this.maxDate.getFullYear());
        }
        const centralYear = this.centralDate.getFullYear();
        return { from: Math.min(from, centralYear), to: Math.max(to, centralYear) };
    }

    __yearItems() {
        const { from, to } = this.__yearRange();
        const key = `${from}|${to}`;
        if (this.__yearItemsCache.key !== key) {
            const items = [];
            for (let year = from; year <= to; year++) {
                items.push(year);
            }
            this.__yearItemsCache = { key, items };
        }
        return this.__yearItemsCache.items;
    }

    __toggleMonthYear(column) {
        if (this.__monthYearOpen) {
            this.closeMonthYearPicker();
        } else {
            this.openMonthYearPicker(column);
        }
    }

    __acceptMonthYear() {
        this.closeMonthYearPicker();
        this.updateComplete.then(() => {
            this.shadowRoot.querySelector('.calendar__navigation-toggle--year')?.focus();
        });
    }

    __stopEvent(e) {
        e.stopPropagation();
    }

    __onMonthChanged(e) {
        this.__setCentralMonthYear(this.centralDate.getFullYear(), Number(e.detail.value));
    }

    __onYearChanged(e) {
        this.__setCentralMonthYear(Number(e.detail.value), this.centralDate.getMonth());
    }

    __setCentralMonthYear(year, month) {
        const lastDayOfMonth = new Date(this.centralDate);
        lastDayOfMonth.setFullYear(year, month + 1, 0);
        const date = new Date(this.centralDate);
        date.setFullYear(year, month, Math.min(this.centralDate.getDate(), lastDayOfMonth.getDate()));
        if (Number.isNaN(date.getTime())) {
            return;
        }
        if (this.minDate && date < this.minDate) {
            this.centralDate = new Date(this.minDate);
        } else if (this.maxDate && date > this.maxDate) {
            this.centralDate = new Date(this.maxDate);
        } else {
            this.centralDate = date;
        }
    }

    __onCalendarKeydown(e) {
        if (!this.__monthYearOpen) {
            return;
        }
        const inLayer = e.composedPath().some(node => node.id === 'month-year-layer');
        if (e.key === 'Escape' || (e.key === 'Enter' && inLayer)) {
            e.preventDefault();
            e.stopPropagation();
            const column = e.composedPath().some(node => node.classList?.contains('month-wheel')) ? 'month' : 'year';
            this.closeMonthYearPicker();
            this.updateComplete.then(() => {
                this.shadowRoot.querySelector(`.calendar__navigation-toggle--${column}`)?.focus();
            });
        }
    }
}
