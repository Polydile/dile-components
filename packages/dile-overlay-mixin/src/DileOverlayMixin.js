export const DileOverlayMixin = function(superClass) {
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
      this.horizontalAlign = 'left';
      this.verticalAlign = 'bottom';
      this.delayId = null;
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
        }, 50);
      }
    }

    updatePosition() {
      let triggerWidth = parseInt(this.trigger.offsetWidth);
      let triggerHeight = parseInt(this.trigger.offsetHeight);
      let moveTop = parseInt(this.moveTop);
      let moveLeft = parseInt(this.moveLeft);
      
      let lastDisplay = this.overlay.style.display;
      this.overlay.style.top = "-1000px";
      this.overlay.style.display = 'block';
      
      let overlayWidth = parseInt(this.overlay.offsetWidth);
      let overlayHeight = parseInt(this.overlay.offsetHeight);
      
      switch(this.verticalAlign) {
        case 'top':
          this.overlay.style.top = (0 - overlayHeight + moveTop) + 'px';
          break;
        case 'center':
          this.overlay.style.top = '-' + (((overlayHeight - (triggerHeight / 2)) / 2) + moveTop) + 'px';
          break;
        default:
          this.overlay.style.top = (triggerHeight + 10 + moveTop) + 'px';
      }
      switch(this.horizontalAlign) {
        case 'left':
          this.setOverlayStyleLeft('-' + (overlayWidth - triggerWidth - 25 + moveLeft) + 'px');
          break;
        case 'right':
            this.setOverlayStyleLeft((triggerWidth + moveLeft) + 'px');
          break;
        default:
            this.setOverlayStyleLeft('-' + (((overlayWidth - triggerWidth) / 2) + moveLeft) + 'px');
      }
      this.overlay.style.display = lastDisplay;
    }
    
    setOverlayStyleLeft(pos) {
      this.overlay.style.left = pos;
      var rect = this.overlay.getBoundingClientRect();
      if (rect.left < 0) {
        let posLeft = parseInt(this.overlay.style.left);
        this.overlay.style.left = (posLeft - rect.left + 10) + 'px';
      }
      
    }
  }

}

