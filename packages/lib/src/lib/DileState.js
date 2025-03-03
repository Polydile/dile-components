export const DileState = (store) => (superclass) => class extends superclass {

  connectedCallback() {
    super.connectedCallback();
    this._unsuscribe = store.subscribe(() => {
      const state = this.getState();
      this.stateChanged(state);
    });
    this.stateChanged(this.getState());
  }

  disconnectedCallback() {
    this._unsuscribe();
    super.disconnectedCallback();
  }

  stateChanged(state) {
    // Override this method to get the state needed by the component
  }

  getState() {
    return store.getState();
  }
}