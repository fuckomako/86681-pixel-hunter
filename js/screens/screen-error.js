import ModalErrorView from '../views/modal-error-view';

export default class ErrorScreen {
  constructor(error) {
    this.error = error;
    this.content = new ModalErrorView(error);
  }
}
