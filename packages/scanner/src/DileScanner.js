import { LitElement, html, css, nothing } from "lit";
import "@dile/ui/components/modal/modal.js";
import "@dile/ui/components/button/button.js";
import "@dile/ui/components/spinner/spinner.js";
import "@dile/ui/components/progress-bar/progress-bar.js";
import "@dile/iconlib/dile-iconlib.js";
import "@dile/iconlib/lucide-icons/camera.js";
import "@dile/iconlib/lucide-icons/image.js";
import "@dile/iconlib/lucide-icons/check.js";
import "@dile/iconlib/lucide-icons/x.js";
import "@dile/iconlib/lucide-icons/undo-2.js";
import "@dile/iconlib/lucide-icons/maximize.js";
import "@dile/iconlib/lucide-icons/rotate-cw.js";
import "@dile/iconlib/lucide-icons/crop.js";
import "@dile/iconlib/lucide-icons/chevron-left.js";
import "@dile/iconlib/lucide-icons/chevron-right.js";
import "@dile/iconlib/lucide-icons/trash-2.js";
import { DEFAULT_LABELS } from "./default-labels.js";
import { cornerEditorStyles } from "./corner-editor-styles.js";
import {
  preloadEngine,
  detectCorners,
  extractDocument,
  createCornerEditor,
} from "./scanner-engine.js";
import {
  fileToCanvas,
  blobToCanvas,
  canvasToBlob,
  rotateCanvas,
  encodeJpeg,
  fullImageCorners,
} from "./image-utils.js";
import { buildPdf } from "./pdf-builder.js";

// Longest side of the original photo kept for detection and re-adjusting.
// Keeps the canvas under the iOS area limit and bounds memory per page.
const SOURCE_MAX_SIDE = 3000;
const SOURCE_QUALITY = 0.92;
// Smaller encodings tried in order when the document exceeds maxBytes. Each
// step lowers both the size and the quality, because lowering only the
// quality saves little (about 15% from 0.8 to 0.7 in Safari).
const SIZE_FALLBACKS = [
  { maxSide: 1600, quality: 0.7 },
  { maxSide: 1400, quality: 0.6 },
  { maxSide: 1200, quality: 0.5 },
];

// Document scanner: takes photos (or images), detects the edges of the
// document, lets the user adjust the corners, straightens the perspective and
// returns the result as a PDF (output="pdf", default) or as JPEG images
// (output="images"). With "multipage" the user can add several pages, reorder
// them, rotate them, adjust them again and remove them. With "ml-detector"
// the edges are detected with scanic's neural detector (about 2.2 MB
// downloaded with gzip the first time the scanner opens) instead of the
// classical one; off by default. A photo waits for that download at most
// "ml-max-wait" ms, and "ml-fast-connection-only" skips it on slow
// connections.
//
// It does not upload anything: when the user saves, it dispatches
// "dile-document-scanned" with the files and closes. Closing it without saving
// dispatches "dile-document-scan-cancelled".
//
//   <dile-scanner multipage max-bytes="5242880"
//     @dile-document-scanned=${e => upload(e.detail.file)}></dile-scanner>
//   scanner.open();
export class DileScanner extends LitElement {
  static styles = [
    cornerEditorStyles,
    css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
        --dile-modal-width: var(--dile-scanner-modal-width, min(96vw, 900px));
        --dile-modal-max-width: 100vw;
        --dile-modal-height: auto;
        --dile-modal-max-height: var(--dile-scanner-modal-max-height, 92dvh);
        --dile-modal-content-padding: 1rem;
        --dile-modal-border-radius: var(--dile-scanner-modal-border-radius, 15px);
        --dile-modal-content-background-color: var(--dile-background-color, #fff);
        --dile-modal-content-text-color: var(--dile-on-background-color, #303030);
        /* Grays mixed from the theme background and text colors, so the
           scanner works with light and dark themes without hardcoded grays. */
        --_fg: var(--dile-on-background-color, #303030);
        --_bg: var(--dile-background-color, #fff);
        --_surface: color-mix(in srgb, var(--_fg) 6%, var(--_bg));
        --_surface-strong: color-mix(in srgb, var(--_fg) 12%, var(--_bg));
        --_border: color-mix(in srgb, var(--_fg) 15%, var(--_bg));
        --_muted: color-mix(in srgb, var(--_fg) 68%, var(--_bg));
      }
      @media (max-width: 600px) {
        :host {
          --dile-modal-width: 100vw;
          --dile-modal-border-radius: 0;
          --dile-modal-height: calc(100dvh - 2rem);
          --dile-modal-max-height: calc(100dvh - 2rem);
        }
      }
      .step {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .step[hidden] {
        display: none;
      }
      .scanner {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 100%;
      }
      h2 {
        font-size: 1.3rem;
        font-weight: 300;
        margin: 0;
      }
      p {
        margin: 0;
      }
      .message {
        font-size: 0.9rem;
      }
      .error {
        color: var(--dile-alert-error-color, #c00);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .footer {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      @media (max-width: 600px) {
        .footer {
          display: grid;
          grid-auto-columns: 1fr;
          grid-auto-flow: column;
          --dile-button-padding-x: 0.6rem;
          --dile-button-font-size: 0.9rem;
        }
        .footer dile-button {
          display: grid;
        }
      }
      /* Secondary buttons set their own text color: inheriting
         --dile-on-primary-color can leave text without contrast on their
         background. By default they use the theme background and text colors,
         so they also work with dark themes. Hover keeps the same
         colors so a theme hover color does not ruin the contrast either. */
      .secondary {
        --dile-button-background-color: var(--dile-scanner-secondary-button-color, var(--_surface-strong));
        --dile-button-border-color: var(--dile-scanner-secondary-button-color, var(--_surface-strong));
        --dile-button-text-color: var(--dile-scanner-secondary-button-text-color, var(--_fg));
        --dile-button-hover-background-color: var(--dile-scanner-secondary-button-color, var(--_surface-strong));
        --dile-button-hover-border-color: var(--dile-scanner-secondary-button-color, var(--_surface-strong));
        --dile-button-hover-text-color: var(--dile-scanner-secondary-button-text-color, var(--_fg));
      }
      /* Outlined buttons to add pages, lighter than the main action. */
      .outline {
        --dile-button-background-color: transparent;
        --dile-button-hover-background-color: transparent;
        --dile-button-border-color: var(--dile-scanner-outline-button-color, var(--_fg));
        --dile-button-hover-border-color: var(--dile-scanner-outline-button-color, var(--_fg));
        --dile-button-text-color: var(--dile-scanner-outline-button-color, var(--_fg));
        --dile-button-hover-text-color: var(--dile-scanner-outline-button-color, var(--_fg));
        --dile-button-border-width: 1px;
        --dile-button-font-weight: normal;
      }
      .file-input {
        display: none;
      }
      .editor {
        position: relative;
        width: 100%;
        height: var(--dile-scanner-editor-height, min(62dvh, 640px));
        border-radius: 0.5rem;
        overflow: hidden;
        background-color: var(--dile-scanner-editor-background-color, #1e1e1e);
      }
      @media (max-width: 600px) {
        .editor {
          height: calc(100dvh - 18rem);
        }
      }
      .subtitle {
        margin-top: -0.75rem;
        font-size: 0.9rem;
        color: var(--dile-scanner-muted-text-color, var(--_muted));
      }
      /* Pages in a horizontal scroll area with snap: on a phone each card
         takes most of the width and the next one peeks out; on wider screens
         several cards fit side by side. */
      .pages {
        display: flex;
        gap: 0.75rem;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 0.25rem 0.25rem 0.75rem;
        margin: 0 -0.25rem;
        scrollbar-width: thin;
      }
      .page {
        flex: 0 0 var(--dile-scanner-page-width, min(78%, 250px));
        scroll-snap-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.75rem;
        background-color: var(--dile-scanner-page-background-color, var(--_bg));
        border: 1px solid var(--dile-scanner-page-border-color, var(--_border));
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .page-header .page-number {
        color: var(--_fg);
      }
      .page img {
        width: 100%;
        height: 200px;
        object-fit: contain;
        padding: 0.5rem;
        background-color: var(--dile-scanner-page-image-background-color, var(--_surface-strong));
        border-radius: 0.5rem;
      }
      .single .pages {
        justify-content: center;
      }
      .single .page {
        flex-basis: min(100%, 420px);
      }
      .single .page img {
        height: min(55dvh, 520px);
      }
      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.25rem;
        padding: 0.25rem;
        border-radius: 0.5rem;
        background-color: var(--dile-scanner-page-header-background-color, var(--_surface));
        --dile-button-border-radius: 0.4rem;
        --dile-button-border-width: 0;
        --dile-button-padding-y: 0.3rem;
        --dile-button-padding-x: 0.3rem;
        --dile-button-background-color: var(--dile-scanner-move-button-color, #5f6368);
        --dile-button-hover-background-color: var(--dile-scanner-move-button-color, #5f6368);
        --dile-button-text-color: #fff;
        --dile-button-hover-text-color: #fff;
        --dile-button-disabled-background-color: transparent;
        --dile-button-disabled-text-color: var(--_border);
      }
      .page-number {
        flex: 1;
        font-size: 0.9rem;
        text-align: center;
      }
      .page-actions {
        display: grid;
        grid-auto-columns: 1fr;
        grid-auto-flow: column;
        gap: 0.25rem;
      }
      .page-action {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        padding: 0.35rem 0.2rem;
        border: none;
        border-radius: 0.4rem;
        background: none;
        font: inherit;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.02em;
        cursor: pointer;
        color: var(--dile-scanner-page-action-color, var(--_fg));
        --dile-icon-color: currentColor;
        --dile-icon-size: 22px;
      }
      .page-action:hover {
        background-color: var(--dile-scanner-page-header-background-color, var(--_surface));
      }
      .page-action:focus-visible {
        outline: 2px solid var(--dile-button-ring-color, #12c9e9);
      }
      .page-action.remove {
        color: var(--dile-scanner-remove-button-color, var(--dile-alert-error-color, #c00));
        font-weight: bold;
      }
      .size {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        font-size: 0.85rem;
        --dile-progress-background: var(--dile-scanner-size-track-color, var(--_surface-strong));
        --dile-progress-bar-background: var(--dile-scanner-size-bar-color, var(--dile-scanner-accent-color, var(--_fg)));
        --dile-progress-bar-min-height: 6px;
        --dile-progress-bar-percentage-font-size: 0;
        --dile-progres-bar-percentage-padding-top: 0;
        --dile-progres-bar-percentage-padding-right: 0;
        --dile-progres-bar-percentage-padding-bottom: 0;
        --dile-progres-bar-percentage-padding-left: 0;
      }
      .size.full {
        --dile-progress-bar-background: var(--dile-alert-error-color, #c00);
      }
      .size-row {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
      }
      .size-value {
        color: var(--dile-scanner-muted-text-color, var(--_muted));
      }
      .busy {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-height: 8rem;
        justify-content: center;
      }
    `,
  ];

  static get properties() {
    return {
      /** Allows several pages in the same document. */
      multipage: { type: Boolean },
      /** "pdf" (one PDF with every page) or "images" (one JPEG per page). */
      output: { type: String },
      /** Maximum size in bytes of the result (0 means no limit). */
      maxBytes: { type: Number, attribute: "max-bytes" },
      /** Longest side in pixels of each scanned page. */
      maxSide: { type: Number, attribute: "max-side" },
      /** JPEG quality of each page, from 0 to 1. */
      quality: { type: Number },
      /** File name without extension. By default, prefix + date and time. */
      filename: { type: String },
      /** Partial object to override the texts (see default-labels.js). */
      labels: { type: Object },
      /**
       * Detects the edges with scanic's neural detector (more robust on hard
       * photos), falling back to the classical one when it finds nothing.
       * Downloads about 2.2 MB with gzip (3.5 MB uncompressed) the first
       * time the scanner is opened.
       */
      mlDetector: { type: Boolean, attribute: "ml-detector" },
      /**
       * Base URL of a self-hosted copy of the "scanic-ml" files (model and
       * ONNX runtime). Empty: they are downloaded from jsDelivr.
       */
      mlAssetsUrl: { type: String, attribute: "ml-assets-url" },
      /**
       * Maximum time in milliseconds a photo waits for the ML detector while
       * it downloads (0 means no limit). When it is not ready, the classical
       * detector is used for that photo and the download goes on in the
       * background.
       */
      mlMaxWait: { type: Number, attribute: "ml-max-wait" },
      /**
       * Does not download the ML detector when the browser reports a slow
       * connection (2G, 3G or data saver), unless it is already in the cache
       * (Cache Storage). The classical detector is used instead.
       */
      mlFastConnectionOnly: { type: Boolean, attribute: "ml-fast-connection-only" },
      _step: { type: String, state: true },
      _pages: { type: Array, state: true },
      _busy: { type: Boolean, state: true },
      _detected: { type: Boolean, state: true },
      _message: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this.multipage = false;
    this.output = "pdf";
    this.maxBytes = 0;
    this.maxSide = 2000;
    this.quality = 0.8;
    this.filename = "";
    this.labels = {};
    this.mlDetector = false;
    this.mlAssetsUrl = "";
    this.mlMaxWait = 5000;
    this.mlFastConnectionOnly = false;
    this._step = "capture";
    this._pages = [];
    this._busy = false;
    this._detected = false;
    this._message = "";
    this._queue = [];
    this._adjusting = null;
    this._editor = null;
    this._saved = false;
    this._scrollToPage = null;
    // Changes on every reset: an async task started before closing or
    // reopening the scanner checks it to discard its result.
    this._session = 0;
    this._isTouchDevice = window.matchMedia?.("(pointer: coarse)").matches;
  }

  get _labels() {
    return { ...DEFAULT_LABELS, ...this.labels };
  }

  get _engineOptions() {
    return {
      ml: this.mlDetector,
      mlAssetsUrl: this.mlAssetsUrl,
      mlMaxWait: this.mlMaxWait,
      mlFastConnectionOnly: this.mlFastConnectionOnly,
    };
  }

  get _modal() {
    return this.shadowRoot.getElementById("modal");
  }

  /** Opens the scanner with an empty document. */
  open() {
    this._reset();
    this._saved = false;
    preloadEngine(this._engineOptions);
    this._modal.open();
  }

  /** Closes the scanner, discarding the pages (dispatches the cancel event). */
  close() {
    this._modal.close();
  }

  updated() {
    // Brings a new or moved page into view in the horizontal page list. It
    // waits while the step is hidden (busy), because a hidden element can't
    // be scrolled.
    if (this._scrollToPage === null || this._busy || this._step !== "pages") {
      return;
    }
    const page = this.shadowRoot.querySelector(`.page[data-index="${this._scrollToPage}"]`);
    this._scrollToPage = null;
    page?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._reset();
  }

  render() {
    const labels = this._labels;
    return html`
      <dile-modal id="modal" blocking @dile-modal-closed=${this._onModalClosed}>
        <div class="scanner">
          <h2>${labels.title}</h2>
          ${this._step === "pages" && this.multipage && !this._busy
            ? html`<p class="subtitle">
                ${this._pages.length}
                ${this._pages.length === 1 ? labels.pageScanned : labels.pagesScanned}
              </p>`
            : nothing}
          ${this._busy
            ? html`<div class="busy">
                <dile-spinner active></dile-spinner>
                <span>${labels.processing}</span>
              </div>`
            : nothing}
          <div class="step" ?hidden=${this._busy}>
            ${this._stepTemplate(labels)}
          </div>
          ${this._message
            ? html`<p class="message error" role="alert">${this._message}</p>`
            : nothing}
        </div>
      </dile-modal>
      <input
        id="camerainput"
        class="file-input"
        type="file"
        accept="image/*"
        capture="environment"
        @change=${this._onFilesSelected}
      />
      <input
        id="galleryinput"
        class="file-input"
        type="file"
        accept="image/*"
        ?multiple=${this.multipage}
        @change=${this._onFilesSelected}
      />
    `;
  }

  _stepTemplate(labels) {
    switch (this._step) {
      case "adjust":
        return this._adjustTemplate(labels);
      case "pages":
        return this._pagesTemplate(labels);
      default:
        return this._captureTemplate(labels);
    }
  }

  _captureTemplate(labels) {
    return html`
      <p>${labels.captureHint}</p>
      <div class="actions">
        ${this._captureButtons(labels.takePhoto, labels.chooseImage)}
      </div>
      <div class="footer">
        <dile-button class="secondary" icon="lucide.x" @click=${this.close}
          >${labels.cancel}</dile-button
        >
      </div>
    `;
  }

  _captureButtons(photoLabel, imageLabel, disabled = false, className = "") {
    return html`
      ${this._isTouchDevice
        ? html`<dile-button
            class=${className}
            icon="lucide.camera"
            ?disabled=${disabled}
            @click=${this._takePhoto}
            >${photoLabel}</dile-button
          >`
        : nothing}
      <dile-button
        class=${className}
        icon="lucide.image"
        ?disabled=${disabled}
        @click=${this._chooseImage}
        >${imageLabel}</dile-button
      >
    `;
  }

  _adjustTemplate(labels) {
    return html`
      <p class="message">
        ${this._detected ? labels.adjustHint : labels.notDetected}
      </p>
      <div id="editor" class="editor"></div>
      <div class="actions">
        <dile-button class="secondary" icon="lucide.undo-2" @click=${this._resetCorners}
          >${labels.reset}</dile-button
        >
        <dile-button
          class="secondary"
          icon="lucide.maximize"
          @click=${this._useFullImage}
          >${labels.useFullImage}</dile-button
        >
      </div>
      <div class="footer">
        <dile-button class="secondary" icon="lucide.x" @click=${this._cancelAdjust}
          >${labels.cancel}</dile-button
        >
        <dile-button icon="lucide.check" @click=${this._acceptAdjust}
          >${labels.accept}</dile-button
        >
      </div>
    `;
  }

  _pagesTemplate(labels) {
    const limitReached = this._limitReached;
    const count = this._pages.length;
    return html`
      <div class="${this.multipage ? "" : "single"}">
        <div class="pages">
          ${this._pages.map((page, index) => this._pageTemplate(page, index, labels))}
        </div>
      </div>
      ${this.maxBytes ? this._sizeTemplate(labels, limitReached) : nothing}
      ${this.multipage && limitReached
        ? html`<p class="message">${labels.sizeLimitReached}</p>`
        : nothing}
      <div class="actions">
        ${this.multipage
          ? this._captureButtons(labels.addPhoto, labels.addImage, limitReached, "outline")
          : this._captureButtons(labels.retakePhoto, labels.replaceImage, false, "outline")}
      </div>
      <div class="footer">
        <dile-button class="secondary" icon="lucide.x" @click=${this.close}
          >${labels.cancel}</dile-button
        >
        <dile-button icon="lucide.check" @click=${this._save}
          >${labels.confirm}${this.multipage ? ` (${count})` : ""}</dile-button
        >
      </div>
    `;
  }

  _sizeTemplate(labels, limitReached) {
    const percent = Math.min(100, Math.round((this._pagesSize / this.maxBytes) * 100));
    return html`
      <div class="size ${limitReached ? "full" : ""}">
        <div class="size-row">
          <span>${labels.documentSize}</span>
          <span class="size-value"
            >${this._formatSize(this._pagesSize)} ${labels.sizeOf}
            ${this._formatSize(this.maxBytes)}</span
          >
        </div>
        <dile-progress-bar value=${percent} aria-hidden="true"></dile-progress-bar>
      </div>
    `;
  }

  _pageTemplate(page, index, labels) {
    const count = this._pages.length;
    const showOrder = this.multipage && count > 1;
    return html`
      <div class="page" data-index=${index}>
        ${this.multipage
          ? html`<div class="page-header">
              ${showOrder
                ? html`<dile-button
                    icon="lucide.chevron-left"
                    label=${labels.moveBefore}
                    title=${labels.moveBefore}
                    ?disabled=${index === 0}
                    @click=${() => this._movePage(index, -1)}
                  ></dile-button>`
                : nothing}
              <span class="page-number"
                >${labels.page} ${index + 1} ${labels.pageOf} ${count}</span
              >
              ${showOrder
                ? html`<dile-button
                    icon="lucide.chevron-right"
                    label=${labels.moveAfter}
                    title=${labels.moveAfter}
                    ?disabled=${index === count - 1}
                    @click=${() => this._movePage(index, 1)}
                  ></dile-button>`
                : nothing}
            </div>`
          : nothing}
        <img src=${page.url} alt="${labels.page} ${index + 1}" />
        <div class="page-actions">
          ${this._pageAction("lucide.rotate-cw", labels.rotate, () => this._rotatePage(index))}
          ${this._pageAction("lucide.crop", labels.adjust, () => this._adjustPage(index))}
          ${this.multipage
            ? this._pageAction("lucide.trash-2", labels.remove, () => this._removePage(index), "remove")
            : nothing}
        </div>
      </div>
    `;
  }

  _pageAction(icon, label, onClick, className = "") {
    return html`
      <button type="button" class="page-action ${className}" data-icon=${icon} @click=${onClick}>
        <dile-iconlib icon=${icon} aria-hidden="true"></dile-iconlib>
        <span>${label}</span>
      </button>
    `;
  }

  // ---- Capture ----

  _takePhoto() {
    this.shadowRoot.getElementById("camerainput").click();
  }

  _chooseImage() {
    this.shadowRoot.getElementById("galleryinput").click();
  }

  _onFilesSelected(e) {
    const input = e.target;
    const files = [...(input.files ?? [])];
    // Cleared so choosing the same file again also fires "change".
    input.value = "";
    if (files.length === 0) {
      return;
    }
    this._message = "";
    this._queue = this.multipage ? files : files.slice(0, 1);
    this._processNextFile();
  }

  // The selected images are processed one by one: each one goes through the
  // corner adjustment before the next one.
  async _processNextFile() {
    const file = this._queue.shift();
    if (!file) {
      this._step = this._pages.length ? "pages" : "capture";
      return;
    }
    if (this.multipage && this._limitReached) {
      this._queue = [];
      this._step = "pages";
      return;
    }
    const session = this._session;
    this._busy = true;
    let canvas;
    try {
      canvas = await fileToCanvas(file, SOURCE_MAX_SIDE);
    } catch {
      if (session !== this._session) {
        return;
      }
      this._busy = false;
      this._message = this._labels.readError;
      this._processNextFile();
      return;
    }
    try {
      const [corners, sourceBlob] = await Promise.all([
        detectCorners(canvas, this._engineOptions).catch(() => null),
        canvasToBlob(canvas, "image/jpeg", SOURCE_QUALITY),
      ]);
      if (session !== this._session) {
        return;
      }
      await this._startAdjust({
        canvas,
        sourceBlob,
        corners,
        rotation: 0,
        // Without multipage the new image replaces the current page.
        index: this.multipage || this._pages.length === 0 ? null : 0,
      });
    } catch {
      if (session === this._session) {
        this._failProcessing();
      }
    }
  }

  // ---- Corner adjustment ----

  async _startAdjust(adjusting) {
    this._destroyEditor();
    this._adjusting = adjusting;
    this._detected = Boolean(adjusting.corners);
    this._step = "adjust";
    this._busy = false;
    const session = this._session;
    await this.updateComplete;
    const editor = await createCornerEditor({
      container: this.shadowRoot.getElementById("editor"),
      image: adjusting.canvas,
      corners: adjusting.corners,
      labels: this._labels,
    });
    if (session !== this._session || this._adjusting !== adjusting) {
      editor.destroy();
      return;
    }
    this._editor = editor;
  }

  _resetCorners() {
    this._editor?.reset();
  }

  _useFullImage() {
    const { canvas } = this._adjusting;
    this._editor?.setCorners(fullImageCorners(canvas.width, canvas.height));
    this._acceptAdjust();
  }

  _cancelAdjust() {
    this._destroyEditor();
    this._adjusting = null;
    this._processNextFile();
  }

  async _acceptAdjust() {
    if (!this._editor || !this._adjusting) {
      return;
    }
    const corners = this._editor.getCorners();
    const adjusting = this._adjusting;
    const session = this._session;
    this._busy = true;
    try {
      const page = await this._renderPage({ ...adjusting, corners });
      if (session !== this._session) {
        return;
      }
      this._destroyEditor();
      this._adjusting = null;
      this._putPage(page, adjusting.index);
      this._busy = false;
      this._processNextFile();
    } catch {
      if (session === this._session) {
        this._busy = false;
        this._message = this._labels.processError;
      }
    }
  }

  _destroyEditor() {
    this._editor?.destroy();
    this._editor = null;
  }

  // ---- Pages ----

  // Straightens the original with the corners, applies the rotation and
  // encodes the result. The original is kept to be able to adjust or rotate
  // the page again without losing quality.
  async _renderPage(page, settings = this._encodeSettings) {
    const source = page.canvas ?? (await blobToCanvas(page.sourceBlob));
    const extracted = await extractDocument(source, page.corners);
    const rotated = rotateCanvas(extracted, page.rotation);
    const { blob, width, height } = await encodeJpeg(rotated, settings);
    return {
      sourceBlob: page.sourceBlob,
      corners: page.corners,
      rotation: page.rotation,
      blob,
      width,
      height,
      url: URL.createObjectURL(blob),
    };
  }

  get _encodeSettings() {
    return { maxSide: this.maxSide, quality: this.quality };
  }

  _putPage(page, index) {
    const pages = [...this._pages];
    if (index === null || index === undefined) {
      pages.push(page);
      this._scrollToPage = pages.length - 1;
    } else {
      URL.revokeObjectURL(pages[index].url);
      pages[index] = page;
    }
    this._pages = pages;
  }

  async _rotatePage(index) {
    const page = this._pages[index];
    const session = this._session;
    this._busy = true;
    try {
      const rotated = await this._renderPage({
        ...page,
        rotation: (page.rotation + 90) % 360,
      });
      if (session !== this._session) {
        URL.revokeObjectURL(rotated.url);
        return;
      }
      this._putPage(rotated, index);
    } catch {
      if (session !== this._session) {
        return;
      }
      this._message = this._labels.processError;
    }
    this._busy = false;
  }

  async _adjustPage(index) {
    const page = this._pages[index];
    this._message = "";
    const session = this._session;
    this._busy = true;
    try {
      const canvas = await blobToCanvas(page.sourceBlob);
      if (session !== this._session) {
        return;
      }
      await this._startAdjust({
        canvas,
        sourceBlob: page.sourceBlob,
        corners: page.corners,
        rotation: page.rotation,
        index,
      });
    } catch {
      if (session === this._session) {
        this._failProcessing();
      }
    }
  }

  _movePage(index, offset) {
    const target = index + offset;
    if (target < 0 || target >= this._pages.length) {
      return;
    }
    const pages = [...this._pages];
    [pages[index], pages[target]] = [pages[target], pages[index]];
    this._pages = pages;
    this._scrollToPage = target;
  }

  _removePage(index) {
    URL.revokeObjectURL(this._pages[index].url);
    this._pages = this._pages.filter((_, i) => i !== index);
    this._message = "";
    if (this._pages.length === 0) {
      this._step = "capture";
    }
  }

  get _pagesSize() {
    return this._pages.reduce((total, page) => total + page.blob.size, 0);
  }

  get _limitReached() {
    return Boolean(this.maxBytes) && this._pagesSize >= this.maxBytes;
  }

  _failProcessing() {
    this._busy = false;
    this._message = this._labels.processError;
    this._queue = [];
    this._step = this._pages.length ? "pages" : "capture";
  }

  // ---- Result ----

  async _save() {
    if (this._pages.length === 0) {
      return;
    }
    this._message = "";
    const session = this._session;
    this._busy = true;
    try {
      let result = await this._buildResult(this._pages);
      for (const fallback of SIZE_FALLBACKS) {
        if (!this.maxBytes || result.size <= this.maxBytes) {
          break;
        }
        const smallerPages = await Promise.all(
          this._pages.map((page) =>
            this._renderPage(page, {
              maxSide: Math.min(this.maxSide, fallback.maxSide),
              quality: Math.min(this.quality, fallback.quality),
            }),
          ),
        );
        smallerPages.forEach((page) => URL.revokeObjectURL(page.url));
        result = await this._buildResult(smallerPages);
      }
      if (session !== this._session) {
        return;
      }
      if (this.maxBytes && result.size > this.maxBytes) {
        this._busy = false;
        this._message = this._labels.tooBig;
        return;
      }
      this._saved = true;
      this.dispatchEvent(
        new CustomEvent("dile-document-scanned", {
          bubbles: true,
          composed: true,
          detail: result.detail,
        }),
      );
      this.close();
    } catch {
      if (session === this._session) {
        this._busy = false;
        this._message = this._labels.processError;
      }
    }
  }

  async _buildResult(pages) {
    const name = this._baseFilename();
    const pageFiles = pages.map(
      (page, index) =>
        new File(
          [page.blob],
          pages.length === 1 ? `${name}.jpg` : `${name}-${index + 1}.jpg`,
          { type: "image/jpeg", lastModified: Date.now() },
        ),
    );
    if (this.output === "images") {
      return {
        size: pageFiles.reduce((total, file) => total + file.size, 0),
        detail: { files: pageFiles, pages: pageFiles },
      };
    }
    const file = await buildPdf(pages, `${name}.pdf`);
    return { size: file.size, detail: { file, pages: pageFiles } };
  }

  _baseFilename() {
    if (this.filename) {
      return this.filename;
    }
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}`;
    return `${this._labels.filenamePrefix}-${date}-${time}`;
  }

  // ---- Closing ----

  _onModalClosed(e) {
    // The modal event is internal: the component has its own events.
    e.stopPropagation();
    const saved = this._saved;
    this._reset();
    if (!saved) {
      this.dispatchEvent(
        new CustomEvent("dile-document-scan-cancelled", {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  _reset() {
    this._session++;
    this._destroyEditor();
    this._pages.forEach((page) => URL.revokeObjectURL(page.url));
    this._pages = [];
    this._queue = [];
    this._adjusting = null;
    this._busy = false;
    this._message = "";
    this._step = "capture";
  }

  _formatSize(bytes) {
    if (bytes < 1024 * 1024) {
      return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }
    return `${(bytes / (1024 * 1024)).toLocaleString(undefined, {
      maximumFractionDigits: 1,
    })} MB`;
  }
}
