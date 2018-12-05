import ModalConfirmView from '../views/view-modal-confirm';

export default class ModalConfirmScreen {
  constructor() {
    this.content = new ModalConfirmView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }

  showGreetScreen() { }

  init() {
    this.content.onConfirm = this.showGreetScreen;

    this.content.onCancel = (modalWrapper) => {
      modalWrapper.classList.add(`modal--hidden`);
    };
  }
}
