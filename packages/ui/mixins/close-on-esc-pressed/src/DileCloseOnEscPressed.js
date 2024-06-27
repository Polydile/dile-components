/*
Mixin for close something when the user press the esc key.

Needs a close() method implemented on the component you are extend from this mixin.
*/
export const DileCloseOnEscPressed = (SuperClass) =>
  class extends SuperClass {
    constructor() {
      super();
      this.closeOnEscHandler = this.escClose.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      window.addEventListener("keydown", this.closeOnEscHandler);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener("keydown", this.closeOnEscHandler);
    }

    escClose(e) {
      if (e.key === "Escape" && this.opened) {
        this.close();
      }
    }

    close() {
      console.log('You need to implement a close method!');
    }
  };
