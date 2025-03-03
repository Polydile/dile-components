import { positiveFeedback, negativeFeedback, neutralFeedback, startLoading, stopLoading } from '../redux/feedback-slice';

export const DileFeedback = (store) => (Superclass) => class extends Superclass {
  positiveFeedback(msg) { 
    store.dispatch(positiveFeedback(msg));
  }
  negativeFeedback(msg) {
    store.dispatch(negativeFeedback(msg));
  }
  neutralFeedback(msg) {
    store.dispatch(neutralFeedback(msg));
  }
  startLoading() {
    store.dispatch(startLoading());
  }
  stopLoading() {
    store.dispatch(stopLoading());
  }
}