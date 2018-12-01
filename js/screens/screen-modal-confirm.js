import {renderScreen} from '../util/util';
import ModalConfirmView from '../view/view-modal-confirm';
import getGreetingScreen from './screen-greeting';

const getModalConfirmScreen = () => {
  const modalConfirm = new ModalConfirmView();
  const modalConfirmScreen = modalConfirm.element;

  modalConfirm.onConfirm = () => renderScreen(getGreetingScreen());

  return modalConfirmScreen;
};

export default getModalConfirmScreen;

