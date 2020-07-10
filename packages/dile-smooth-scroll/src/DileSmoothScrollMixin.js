export const DileSmoothScrollMixin = (Superclass) =>
  class extends Superclass {
    smoothScrollToTop() {
      this.smoothScroll(0, 0);
    }

    smoothScrollToBottom() {
      this.smoothScroll(document.body.clientHeight, 0);
    }

    smoothScroll(top, left) {
      window.scroll({ top, left, behavior: "smooth" });
    }

    smoothScrollBy(top, left) {
      window.scrollBy({ top, left, behavior: "smooth" });
    }

    smoothScrollElementIntoView(element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
