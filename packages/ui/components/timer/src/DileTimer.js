import { html, css, LitElement } from "lit";
import "../../button/button.js";

export class DileTimer extends LitElement {
    static properties = {
        duration: { type: Number },
        remaining: { type: Number, reflect: true },
        running: { type: Boolean, reflect: true },
        tick: { type: Number },
        autoStart: { type: Boolean },
        format: { type: String },
        title: { type: String },
        subtitle: { type: String },
        controls: { type: Boolean, reflect: true },
        startText: { type: String, attribute: "start-text" },
        pauseText: { type: String, attribute: "pause-text" },
        resetText: { type: String, attribute: "reset-text" },
        disabled: { type: Boolean, reflect: true },
    };

    constructor() {
        super();
        this.duration = 60_000;
        this.remaining = this.duration;
        this.running = false;
        this.tick = 250;
        this.autoStart = false;
        this.format = "mm:ss";
        this.title = "";
        this.subtitle = "";
        this.controls = false;
        this.startText = "Start";
        this.pauseText = "Pause";
        this.resetText = "Reset";
        this.disabled = false;
        this._intervalId = null;
        this._targetEndTs = null;
        this._hasAutoStarted = false;
    }

    static get styles() {
        return css`
        :host {
            display: inline-flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            font-family: var(--dile-timer-font-family, inherit);
            color: var(--dile-timer-color, inherit);
            background: var(--dile-timer-background, transparent);
            border-radius: var(--dile-timer-border-radius, 10px);
            border: var(--dile-timer-border, 1px solid rgba(0, 0, 0, 0.08));
            width: var(--dile-timer-width, auto);
            min-width: var(--dile-timer-min-width, 220px);
            max-width: var(--dile-timer-max-width, 100%);
            box-sizing: border-box;
            padding: var(--dile-timer-padding, 12px);
            letter-spacing: var(--dile-timer-letter-spacing, 0.02em);
            font-variant-numeric: tabular-nums;
        }

        :host([running]) {
            color: var(--dile-timer-running-color, inherit);
        }

        :host([remaining="0"]) {
            color: var(--dile-timer-finished-color, #5ba75d);
        }

        header {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin-bottom: 10px;
        }

        .title {
            font-size: var(--dile-timer-title-font-size, 1rem);
            font-weight: var(--dile-timer-title-font-weight, 700);
            color: var(--dile-timer-title-color, inherit);
            margin: 0;
        }

        .subtitle {
            font-size: var(--dile-timer-subtitle-font-size, 0.9rem);
            font-weight: var(--dile-timer-subtitle-font-weight, 400);
            color: var(--dile-timer-subtitle-color, rgba(0, 0, 0, 0.65));
            margin: 0;
        }

        .display {
            display: flex;
            align-items: center;
            justify-content: center;
            height: var(--dile-timer-height, 72px);
            font-size: var(--dile-timer-font-size, 2rem);
            font-weight: var(--dile-timer-font-weight, 700);
            border-radius: var(--dile-timer-display-border-radius, 10px);
            background: var(--dile-timer-display-background, rgba(0, 0, 0, 0.04));
            color: var(--dile-timer-display-color, inherit);
        }

        :host([remaining="0"]) .display {
            background: var(--dile-timer-finished-display-background, rgba(211, 47, 47, 0.1));
        }

        .controls {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
        }

        .controls dile-button {
            --dile-button-padding-y: var(--dile-timer-button-padding-y, 0.55rem);
            --dile-button-padding-x: var(--dile-timer-button-padding-x, 0.75rem);
            --dile-button-border-radius: var(--dile-timer-button-border-radius, 10px);
            --dile-primary-color: var(--dile-timer-button-background, #ffffff);
            --dile-primary-dark-color: var(--dile-timer-button-border-color, rgba(0, 0, 0, 0.12));
            --dile-on-primary-color: var(--dile-timer-button-color, rgba(0, 0, 0, 0.82));
            --dile-button-hover-background-color: var(--dile-timer-button-hover-background, rgba(0, 0, 0, 0.04));
            --dile-button-hover-border-color: var(--dile-timer-button-hover-border, rgba(0, 0, 0, 0.18));
            --dile-button-hover-text-color: var(--dile-timer-button-hover-color, rgba(0, 0, 0, 0.82));
            --dile-button-ring-color: var(--dile-timer-button-focus-ring, rgba(18, 201, 233, 0.35));
            --dile-button-font-size: var(--dile-timer-button-font-size, 0.95rem);
            --dile-button-font-weight: var(--dile-timer-button-font-weight, 600);
            width: 100%;
            display: block;
            text-align: center;
        }

        :host([disabled]) {
            opacity: 0.7;
            pointer-events: none;
        }`;
    }

    render() {
        return html`
            ${this._headerTemplate}
            <div class="display">
                ${this._formatMs(this.remaining)}
            </div>
            ${this.controls ? this._controlsTemplate : ""}
        `;
    }

    get _headerTemplate() {
        if (!this.title && !this.subtitle) return "";
        return html`
        <header>
            ${this.title ? html`<p class="title">${this.title}</p>` : ""}
            ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ""}
        </header>`;
    }

    get _controlsTemplate() {
        return html`
        <div class="controls">
            <dile-button @click=${this._onStartClick} ?disabled=${this.disabled || this.running}>
                ${this.startText}
            </dile-button>
            <dile-button @click=${this._onPauseClick} ?disabled=${this.disabled || !this.running}>
                ${this.pauseText}
            </dile-button>
            <dile-button @click=${this._onResetClick} ?disabled=${this.disabled}>
                ${this.resetText}
            </dile-button>
        </div>`;
    }

    _onStartClick() {
        if (this.disabled) return;
        this.start();
    }

    _onPauseClick() {
        if (this.disabled) return;
        this.pause();
    }

    _onResetClick() {
        if (this.disabled) return;
        this.reset();
    }

    willUpdate(changed) {
        if (changed.has("duration")) {
            const d = Number(this.duration);
            this.duration = Number.isFinite(d) && d >= 0 ? d : 0;
            if (!this.running) {
                this.remaining = this.duration;
                this._targetEndTs = null;
            }
            if (this.autoStart && !this._hasAutoStarted) {
                this._hasAutoStarted = true;
                this.start();
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopInterval();
    }

    start() {
        if (this.running) return;
        if (this.remaining <= 0) {
            this.remaining = this.duration;
        }
        this.running = true;
        const now = Date.now();
        this._targetEndTs = now + this.remaining;
        this._startInterval();
        this._dispatchTick();
    }

    pause() {
        if (!this.running) return;
        this._syncRemaining();
        this.running = false;
        this._stopInterval();
        this._dispatchTick();
    }

    reset() {
        this.running = false;
        this._stopInterval();
        this.remaining = this.duration;
        this._targetEndTs = null;
        this._dispatchTick();
    }

    _startInterval() {
        this._stopInterval();
        this._intervalId = window.setInterval(() => this._onInterval(), this.tick);
    }

    _stopInterval() {
        if (this._intervalId != null) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }

    _onInterval() {
        if (!this.running) return;
        this._syncRemaining();
        this._dispatchTick();
        if (this.remaining <= 0) {
            this.remaining = 0;
            this.running = false;
            this._stopInterval();
            this._eventDispatcher("dile-timer-finished", { duration: this.duration });
        }
    }

    _syncRemaining() {
        if (this._targetEndTs == null) return;
        this.remaining = Math.max(0, this._targetEndTs - Date.now());
    }

    _dispatchTick() {
        this._eventDispatcher("dile-timer-tick", {
            remaining: this.remaining,
            duration: this.duration,
            running: this.running,
        });
    }

    _eventDispatcher(name, detail) {
        this.dispatchEvent(
            new CustomEvent(name, {
                detail,
                bubbles: true,
                composed: true,
            })
        );
    }

    _formatMs(ms) {
        const safe = Math.max(0, Number(ms) || 0);
        const totalSeconds = Math.floor(safe / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        const pad2 = (n) => String(n).padStart(2, "0");
        return (this.format === "hh:mm:ss" || hours > 0) 
            ? `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}` 
            : `${pad2(minutes)}:${pad2(seconds)}`;
    }  
}
