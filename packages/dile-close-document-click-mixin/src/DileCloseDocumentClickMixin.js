/**
 *
 * # DileCloseDocumentClickMixin
 *
 * Custom Element Mixin offers a way to close elements when the user clicks in any area of the document.
 *
 * To use it you olny need to extend your custom element class with it.
 *
 * Only depends on a close() method in the extended custom element.
 *
 */
export const DileCloseDocumentClickMixin = (SuperClass) =>
  class extends SuperClass {
    constructor() {
      super();
      this.closeDocumentHandler = this.closeAll.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      if (!DileCloseDocumentClickMixin.elements) {
        DileCloseDocumentClickMixin.elements = [];
        document.addEventListener("click", this.closeDocumentHandler);
      }
      DileCloseDocumentClickMixin.elements.push(this);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      DileCloseDocumentClickMixin.elements = DileCloseDocumentClickMixin.elements.filter(
        (item) => item != this
      );
      if (DileCloseDocumentClickMixin.elements.length == 0) {
        DileCloseDocumentClickMixin.elements = null;
        document.removeEventListener("click", this.closeDocumentHandler);
      }
    }

    /**
     * Close all the elements of this type
     */
    closeAll() {
      for (let ele of DileCloseDocumentClickMixin.elements) {
        ele.close();
      }
    }

    /**
     * Close the other items of this type (distinct to this)
     */
    closeOthers() {
      DileCloseDocumentClickMixin.elements.forEach((item) => {
        if (item != this) {
          item.close();
        }
      });
    }

    /**
     * This method only alerts the developer to create the close() method in his component
     */
    close() {
      console.log(
        "DileCloseDocumentClickMixin needs a close() method in the component"
      );
    }
  };
