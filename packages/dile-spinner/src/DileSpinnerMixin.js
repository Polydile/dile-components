export const DileSpinnerMixin = (SuperClass) =>
  class extends SuperClass {
    static get properties() {
      return {
        active: { type: Boolean },
      };
    }

    constructor() {
      super();
      this.active = false;
    }
  };
