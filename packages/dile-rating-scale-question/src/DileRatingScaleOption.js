import { LitElement, html, css } from 'lit';

export class DileRatingScaleOption extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }
            span {
                display: block;
                margin-left: 0;
            }
            label {
                position: relative;
                overflow: hidden;
                cursor: pointer;
                display: flex;
                flex-wrap: wrap;
                align-items: self-start;
            }
            input {
                overflow: visible;
                font-size: 100%;
                font-family: inherit;
                margin: 0;
            }
            input[type="radio"] {
                cursor: pointer;
                display: block;
                position: absolute;
                width: 30px;
                height: 30px;
                opacity: 0;
                box-sizing: border-box;
                padding: 0;
            }
            span:hover .leftColor {
                background-color: var(--dile-rating-scale-color-left,#33a474);
            }
            span:hover .neutralColor {
                background-color: var(--dile-rating-scale-color-neutral,#9b9faa);
            }
            span:hover .rightColor {
                background-color: var(--dile-rating-scale-color-right,#88619a);
            }
            .leftColor {
                border-color: var(--dile-rating-scale-color-left, #33a474);
            }
            .neutralColor {
                border-color: var(--dile-rating-scale-color-neutral,#9b9faa);
            }
            .rightColor {
                border-color: var(--dile-rating-scale-color-right,#88619a);
            }
            .sizeBigger{
                height: var(--dile-rating-scale-option-size-bigger, 45px);
	            width: var(--dile-rating-scale-option-size-bigger, 45px);
            }
            .sizeBig{
                height: var(--dile-rating-scale-option-size-big, 35px);
	            width: var(--dile-rating-scale-option-size-big, 35px);
            }
            .sizeSmall{
                height: var(--dile-rating-scale-option-size-small, 28px);
	            width: var(--dile-rating-scale-option-size-small, 28px);
            }
            .sizeSmaller{
                height: var(--dile-rating-scale-option-size-smaller, 25px);
	            width: var(--dile-rating-scale-option-size-smaller, 25px);
            }
            .radio_tick {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0px 10px;
                text-align: center;
                box-shadow: inset 0 1px rgba(81,89,106,.05);
                border-width: 2px;
                border-style: solid;
                border-radius: 50%;
                background-color: #fff;
                transition: all .2s ease-in-out;
            }
            .radio_label {
                position: absolute;
                width: 30px;
                height: 30px;
                opacity: 0;
                display: inline-flex;
                align-items: center;
                transition: all .2s ease-in-out;
                font-size: 1rem;
                line-height: 1.5rem;
            }
            .radio_spinner {
                display: flex;
            }
            @media (min-width: 992px){
                .radio_tick {
                    border-width: 3px;
                }
            }
        `
    ];

    static get properties() {
      return {
        label: { type: String },
        value: { type: String },
        size: { type: String },
        color: { type: String },
        selected: {
            type: Boolean,
            reflect: true
        },
      };
    }

    constructor() {
        super();
        this.label = '';
        this.value = '';
        this.size = 'sizeSmaller';
        this.color = 'neutralColor';
        this.selected = false;
    }

    render() {
        return html`
            <span @click=${this.select}>
                <label>
                    <input type="radio" >
                    <span class="radio_tick ${this.size} ${this.color}">
                        <span class="radio_spinner"></span>
                    </span>
                    <span class="radio_label">${this.label}</span>
                </label>
            </span>
        `;
    }

    select() {
        this.dispatchEvent(new CustomEvent('dile-rating-scale-option-selected', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value
            }
        }));
    }
}
