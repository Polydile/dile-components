import { html, css, LitElement } from "lit";
import "../../button/button.js";
import '../../icon/icon.js';
import { zoomInIcon, zoomOutIcon, cropIcon } from "@dile/icons/index.js";

export class DileWebVisor extends LitElement {

    static styles = css`
        :host {
            display: block;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            font-family: sans-serif;
            background: #f5f5f5;
        }

        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            background: #ffffff;
            border-bottom: 1px solid #e0e0e0;
        }

        .controls {
            display: flex;
            gap: 8px;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
            transform-origin: 0 0;
            transition: transform 0.2s ease-in-out;
        }

        .zoom {
            --dile-icon-color: #000000;
        }
  `;
    static properties = {
        url: { type: String },
        title: { type: String },
        _zoom: { type: Number }
    };

    constructor() {
        super();
        this.url = "";
        this.title = "";
        this._zoom = 1;
    }

    render() {
        return html`
            <div class="web-visor">
                ${this._toolbarTemplate}
                ${this._webTemplate}
            </div>
        `;
    }

    get _toolbarTemplate() {
        return html`
            <div class="toolbar">
                <span class="url-display">${this.title}</span>
                <div class="controls">
                    <dile-button @click=${this._zoomOut}>
                        <dile-icon class="zoom" .icon=${zoomOutIcon}></dile-icon>
                    </dile-button>
                    <dile-button @click=${this._zoomIn}>
                        <dile-icon class="zoom" .icon=${zoomInIcon}></dile-icon>
                    </dile-button>
                    <dile-button @click=${this._toggleFullScreen}>
                        <dile-icon class="zoom" .icon=${cropIcon}></dile-icon>
                    </dile-button>
            </div>
        </div>
      `;
    }

    get _webTemplate() {
        return html`
            <iframe
                src="${this.url}"
                style="transform: scale(${this._zoom}); width: ${100 / this._zoom}%; height: ${100 / this._zoom}%;"
                title=${this.title}
            ></iframe>
        `;
    }

    _toggleFullScreen() {
        const target = this.renderRoot?.querySelector(".web-visor");
        if (!target) return;

        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

        if (!isFullscreen) {
            const request = target.requestFullscreen || target.webkitRequestFullscreen;
            if (request) {
            request.call(target).catch?.((err) => {
                console.error("Error al entrar en pantalla completa:", err);
            });
            }
        } else {
            const exit = document.exitFullscreen || document.webkitExitFullscreen;
            if (exit) {
            exit.call(document);
            }
        }
    }

    _zoomIn() {
        this._zoom += 0.1;
    }
    
    _zoomOut() {
        if (this._zoom > 0.2) this._zoom -= 0.1;
    }
}