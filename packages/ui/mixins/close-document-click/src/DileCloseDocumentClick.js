/**
 *
 * # DileCloseDocumentClick
 *
 * Custom Element Mixin offers a way to close elements when the user clicks in any area of the document.
 *
 * To use it you olny need to extend your custom element class with it.
 *
 * Only depends on a close() method in the extended custom element.
 *
 */
export const DileCloseDocumentClick = (SuperClass) =>
  class extends SuperClass {
    constructor() {
      super();
      this.closeDocumentHandler = this.closeAll.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      if (!DileCloseDocumentClick.elements) {
        DileCloseDocumentClick.elements = [];
        document.addEventListener("click", this.closeDocumentHandler);
      }
      DileCloseDocumentClick.elements.push(this);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      DileCloseDocumentClick.elements = DileCloseDocumentClick.elements.filter(
        (item) => item != this
      );
      if (DileCloseDocumentClick.elements.length == 0) {
        DileCloseDocumentClick.elements = null;
        document.removeEventListener("click", this.closeDocumentHandler);
      }
    }

    /**
     * Close all the elements of this type
     */
    closeAll() {
      for (let ele of DileCloseDocumentClick.elements) {
        ele.close();
      }
    }

    /**
     * Close the other items of this type (distinct to this)
     */
    closeOthers() {
      DileCloseDocumentClick.elements.forEach((item) => {
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
        "DileCloseDocumentClick needs a close() method in the component"
      );
    }
  };
