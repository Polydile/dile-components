import { LitElement, html, css } from "lit";

export class DileProgressBar extends LitElement {
  static get styles() {
    return css`
      .progress-bar-title {
        margin-top: var(--dile-progress-bar-title-margin-top, 0px);
        margin-right: var(--dile-progress-bar-title-margin-right, 0px);
        margin-bottom: var(--dile-progress-bar-title-margin-bottom, 10px);
        margin-left: var(--dile-progress-bar-title-margin-left, 0px);
      }

      .progress {
        background: var(--dile-progress-background, #e9ecef);
        border-radius: var(--dile-progress-border-radius, 20px);
      }

      .progress-bar {
        min-height: var(--dile-progress-bar-min-height, 20px);
        display: flex;
        justify-content: var(--dile-progress-bar-align, flex-start);
        background: var(--dile-progress-bar-background, #b8b9b9);
        border-radius: var(--dile-progress-bar-border-radius, 20px);
      }

      .progress-bar span {
        font-size: var(--dile-progress-bar-percentage-font-size, 14px);
        font-weight: var(--dile-progress-bar-percentage-font-weight, 500);
        color: var(--dile-progress-bar-percentage-color, #eaeaea);
        padding-top: var(--dile-progres-bar-percentage-padding-top, 6px);
        padding-right: var(--dile-progres-bar-percentage-padding-right, 6px);
        padding-bottom: var(--dile-progres-bar-percentage-padding-bottom, 6px);
        padding-left: var(--dile-progres-bar-percentage-padding-left, 10px);
        transition: 5s width;
      }

      .progress-bar.animated {
        animation: progress 1500ms ease-in 1;
      }

      @keyframes progress {
        from {
          width: 0;
        }
      }
    `;
  }

  static properties = {
    title: { type: String },
    valuePercentage: { type: String },
    valuePercentageText: { type: String },
    animated: { type: Boolean },
  };

  constructor() {
    super();
    this.title = "";
    this.valuePercentage = "80%";
    this.valuePercentageText = "";
  }

  render() {
    return html` ${this.titleTemplate} ${this.progressTemplate} `;
  }

  get titleTemplate() {
    return this.title
      ? html`<p class="progress-bar-title">${this.title}</p>`
      : "";
  }

  get valueTemplate() {
    return this.valuePercentageText
      ? html`<span>${this.valuePercentageText}</span>`
      : "";
  }

  get progressTemplate() {
    return html`
          <div class="progress">
            <div 
              class="progress-bar ${this.animated ? 'animated' : ''}" 
              style="width: ${this.valuePercentage};"
            >
              ${this.valueTemplate}
            </div>
          </div>
    `;
    
  }

  hasSlot(name) {
    return this.querySelector(`[slot="${name}"]`) !== null;
  }
}
