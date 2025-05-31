import { infoIcon, warningIcon,  doneIcon, errorIcon} from '@dile/icons';

import { 
  positiveFeedback, 
  negativeFeedback, 
  neutralFeedback, 
  startLoading, 
  stopLoading,
  modalMessage,
  modalClose,
} from '../redux/feedback-slice';

const AVAILABLE_ICONS = [
  {
    name: 'info',
    icon: infoIcon,
    iconClass: 'neutral',
  },
  {
    name: 'warning',
    icon: warningIcon,
    iconClass: 'warning',
  },
  {
    name: 'success',
    icon: doneIcon,
    iconClass: 'success',
  },
  {
    name: 'error',
    icon: errorIcon,
    iconClass: 'error',
  },
];

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
  modalFeedback(msg, label = "Close", icon = null) {
    let selectedIcon = AVAILABLE_ICONS.find(item => item.name == icon);
    store.dispatch(modalMessage({
      message: msg,
      label,
      icon: selectedIcon?.icon,
      iconClass: selectedIcon?.iconClass
    }));
  }

  closeModalFeedback() {
    store.dispatch(modalClose())
  }
}