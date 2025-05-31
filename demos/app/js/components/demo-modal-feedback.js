import {store} from '../redux/store';
import { DileAppModalFeedback } from '@dile/lib';
const ModalFeedbackClass = DileAppModalFeedback(store);
customElements.define('demo-modal-feedback', ModalFeedbackClass);