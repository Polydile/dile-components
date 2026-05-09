export const DileOverlay = function(superClass) {
  return class extends superClass {
    
    static get properties() {
      return {
        _opening: {
          type: Boolean,
        },
        moveTop: {
          type: Number,
        },
        moveLeft: {
          type: Number,
        },
        /**
         * The css class to show or hide the overlay
         * @type {String}
         */
        _overlayClass: {
          state: true,
          type: String,
        },
        /**
         * The position of the overlay: left, right or center.
         * @type {String}
         */
        horizontalAlign: {
          type: String,
        },
        /**
         * The position of the overlay: bottom, top or center.
         * @type {String}
         */
        verticalAlign: {
          type: String,
        },
      };
    }

    constructor() {
      super();
      this._opening = false;
      this.moveTop = 0;
      this.moveLeft = 0;
      this._overlayClass = '';
      this.horizontalAlign = 'under_left';
      this.verticalAlign = 'bottom';
      this.delayId = null;
      this._rafId = null;
      this._onScrollResize = () => {
        if (this._rafId) return;
        this._rafId = requestAnimationFrame(() => {
          this._rafId = null;
          if (this._overlayClass === 'opened') this.updatePosition();
        });
      };
    }

    firstUpdated() {
      this.overlay = this.shadowRoot.getElementById('overlay');
      this.trigger = this.shadowRoot.getElementById('trigger');
    }

    /**
    * toggles the overlay
    */
    toggle(e) {
      //e.stopPropagation();
      if(this._overlayClass) {
        this.close()
      } else {
        this.open();
      }
    }
    cancelDelay() {
      if(this.reardo) {
        clearTimeout(this.delayId);
      }
      this.delayId = null;
    }
    /**
    * closes the overlay
    */
    close() {
      this.dispatchEvent(new CustomEvent('overlay-closed', {
        bubbles: true,
        composed: true,
      }));
      if(!this._opening && this._overlayClass=='opened') {
        this._overlayClass = '';
        this._removePositionListeners();
        this.cancelDelay();
        this.delayId = setTimeout(() => {
          this.overlay.style.display = 'none'
        }, 500);
      }
    }
    /**
    * opens the overlay
    */
    open() {
      this.dispatchEvent(new CustomEvent('overlay-opened', {
        bubbles: true,
        composed: true,
      }));
      if(!this._opening) {
        this._opening = true;
        this.updatePosition();
        if(this.closeAll) {
          this.closeAll();
        };
        this.overlay.style.display = 'block';
        this.cancelDelay();
        this.delayId = setTimeout(() => {
          this._overlayClass = 'opened'
          this._opening = false;
          this.overlay.style.display = 'block';
          this._addPositionListeners();
        }, 50);
      }
    }

    _addPositionListeners() {
      window.addEventListener('scroll', this._onScrollResize, { passive: true, capture: true });
      window.addEventListener('resize', this._onScrollResize, { passive: true });
    }

    _removePositionListeners() {
      window.removeEventListener('scroll', this._onScrollResize, { capture: true });
      window.removeEventListener('resize', this._onScrollResize);
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    }

    updatePosition() {
      let moveTop = parseInt(this.moveTop);
      let moveLeft = parseInt(this.moveLeft);

      let triggerRect = this.trigger.getBoundingClientRect();

      // Switch to fixed positioning so overflow:hidden ancestors don't clip the overlay
      this.overlay.style.position = 'fixed';
      let lastDisplay = this.overlay.style.display;
      this.overlay.style.top = '-10000px';
      this.overlay.style.left = '-10000px';
      this.overlay.style.display = 'block';

      let overlayWidth = parseInt(this.overlay.offsetWidth);
      let overlayHeight = parseInt(this.overlay.offsetHeight);

      switch(this.verticalAlign) {
        case 'top':
          this.setOverlayStyleTop(triggerRect.top - overlayHeight + moveTop, triggerRect, overlayHeight, 'top');
          break;
        case 'center':
          this.setOverlayStyleTop(triggerRect.top - ((overlayHeight - (triggerRect.height / 2)) / 2) - moveTop, triggerRect, overlayHeight, 'center');
          break;
        default:
          this.setOverlayStyleTop(triggerRect.bottom + 10 + moveTop, triggerRect, overlayHeight, 'bottom');
      }

      switch(this.horizontalAlign) {
        case 'under_left':
          this.setOverlayStyleLeft(triggerRect.left);
          break;
        case 'under_right':
          this.setOverlayStyleLeft(triggerRect.right - overlayWidth);
          break;
        case 'left':
          this.setOverlayStyleLeft(triggerRect.left - overlayWidth - moveLeft);
          break;
        case 'right':
          this.setOverlayStyleLeft(triggerRect.right + moveLeft);
          break;
        default:
          this.setOverlayStyleLeft(triggerRect.left - ((overlayWidth - triggerRect.width) / 2) - moveLeft);
      }

      this.overlay.style.display = lastDisplay;
    }

    setOverlayStyleTop(topValue, triggerRect, overlayHeight, direction) {
      const viewportHeight = document.documentElement.clientHeight;
      const margin = 10;
      if (direction === 'bottom' && topValue + overlayHeight > viewportHeight - margin) {
        const flipped = triggerRect.top - overlayHeight - margin;
        topValue = flipped >= margin ? flipped : viewportHeight - overlayHeight - margin;
      } else if (direction === 'top' && topValue < margin) {
        const flipped = triggerRect.bottom + margin;
        topValue = flipped + overlayHeight <= viewportHeight - margin ? flipped : margin;
      }
      if (topValue < margin) topValue = margin;
      if (topValue + overlayHeight > viewportHeight - margin) topValue = viewportHeight - overlayHeight - margin;
      this.overlay.style.top = topValue + 'px';
    }

    setOverlayStyleLeft(posLeft) {
      const pageWidth = document.querySelector('html').clientWidth;
      const overlayWidth = this.overlay.offsetWidth;
      if (posLeft < 10) {
        posLeft = 10;
      } else if (posLeft + overlayWidth > pageWidth - 15) {
        posLeft = pageWidth - overlayWidth - 15;
      }
      this.overlay.style.left = posLeft + 'px';
    }
  }

}

