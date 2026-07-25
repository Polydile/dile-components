export const DileSlideDown = (SuperClass) => {
  return class extends SuperClass {
    constructor(...args) {
      super(...args);
      this._slideAnimating = false;
      this._currentSlideAction = null;
      this._pendingSlideAction = null;
      this._slideTransitionListener = null;
      this._slideFallbackTimer = null;
    }

    _getElementHeight(elem, targetHeight = "0px") {
      let height = 300;
      elem.style.opacity = 0;
      elem.style.height = "auto";
      if (elem.offsetHeight) {
        height = elem.offsetHeight;
      }
      elem.style.height = targetHeight;
      elem.style.opacity = 1;
      return height;
    }

    _clearSlideWait(elem) {
      if (this._slideTransitionListener) {
        elem.removeEventListener('transitionend', this._slideTransitionListener);
        this._slideTransitionListener = null;
      }
      if (this._slideFallbackTimer) {
        clearTimeout(this._slideFallbackTimer);
        this._slideFallbackTimer = null;
      }
    }

    _waitForSlideEnd(elem, fallbackDelay, onEnd) {
      this._clearSlideWait(elem);
      const finish = () => {
        this._clearSlideWait(elem);
        onEnd();
      };
      this._slideTransitionListener = (e) => {
        if (e.target === elem && e.propertyName === 'height') {
          finish();
        }
      };
      elem.addEventListener('transitionend', this._slideTransitionListener);
      // Safety net in case the height never actually transitions (e.g. no visual change).
      this._slideFallbackTimer = setTimeout(finish, fallbackDelay);
    }

    _onSlideAnimationEnd() {
      this._slideAnimating = false;
      this._currentSlideAction = null;
      if (this._pendingSlideAction) {
        const { action, elem, targetHeight } = this._pendingSlideAction;
        this._pendingSlideAction = null;
        if (action === 'show') {
          this.slideShow(elem, targetHeight);
        } else {
          this.slideHide(elem, targetHeight);
        }
      }
    }

    slideShow(elem, targetHeight = "0px") {
      if (!elem) return;
      if (this._slideAnimating) {
        if (this._currentSlideAction !== 'show') {
          this._pendingSlideAction = { action: 'show', elem, targetHeight };
        }
        return;
      }
      this._slideAnimating = true;
      this._currentSlideAction = 'show';
      let height = this._getElementHeight(elem, targetHeight);
      setTimeout(() => {
        elem.style.height = height + "px";
      }, 50);
      this._waitForSlideEnd(elem, 650, () => {
        elem.style.height = "auto";
        elem.style.overflow = "visible";
        this._onSlideAnimationEnd();
      });
    }

    slideHide(elem, targetHeight = "0px") {
      if (!elem) return;
      if (this._slideAnimating) {
        if (this._currentSlideAction !== 'hide') {
          this._pendingSlideAction = { action: 'hide', elem, targetHeight };
        }
        return;
      }
      this._slideAnimating = true;
      this._currentSlideAction = 'hide';
      let height = elem.offsetHeight;
      elem.style.overflow = "hidden";
      if (height) {
        elem.style.height = height + "px";
      }
      setTimeout(() => {
        elem.style.height = targetHeight;
      }, 50);
      this._waitForSlideEnd(elem, 650, () => {
        this._onSlideAnimationEnd();
      });
    }
  };
};
