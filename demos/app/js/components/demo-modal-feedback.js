import {store} from '../redux/store';
import { DileAppModalFeedback } from '@dile/lib';
const ModalFeedbackClass = DileAppModalFeedback(store);
if (!customElements.get('demo-modal-feedback')) {
  customElements.define('demo-modal-feedback', ModalFeedbackClass);
}