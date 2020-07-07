export const DileSlideDownMixin = (SuperClass) => {
  return class extends SuperClass {
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

    slideShow(elem, targetHeight = "0px") {
      if (elem) {
        let height = this._getElementHeight(elem, targetHeight);
        setTimeout(() => {
          elem.style.height = height + "px";
        }, 50);
        setTimeout(() => {
          elem.style.height = "auto";
          elem.style.overflow = "visible";
        }, 600);
      }
    }
    slideHide(elem, targetHeight = "0px") {
      if (elem) {
        let height = elem.offsetHeight;
        elem.style.overflow = "hidden";
        if (height) {
          elem.style.height = height + "px";
        }
        setTimeout(() => {
          elem.style.height = targetHeight;
        }, 50);
      }
    }
  };
};
