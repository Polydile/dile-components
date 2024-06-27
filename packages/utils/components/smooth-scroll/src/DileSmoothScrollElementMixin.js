export const DileSmoothScrollElementMixin = (Superclass) =>
  class extends Superclass {
    smoothElementScrollTop(element) {
      this.smoothElementScroll(element, 0, 0);
    }

    smoothElementScrollBottom(element) {
      this.smoothElementScroll(element, element.scrollHeight, 0);
    }

    smoothElementScroll(element, top, left) {
      if (element) {
        element.scroll({ top, left, behavior: "smooth" });
      }
    }

    smoothElementScrollBy(element, top, left) {
      if (element) {
        element.scrollBy({ top, left, behavior: "smooth" });
      }
    }
  };
