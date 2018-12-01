import AbstractView from './abstract-view';

export default class ModalConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn"  data-select="ok">Ок</button>
        <button class="modal__btn"  data-select="cancel">Отмена</button>
      </div>
    </form>
  </section>
    `;
  }

  onConfirm() { }
  onCancel() { }

  bind() {
    const confirmBtns = this.element.querySelectorAll(`.modal__btn`);
    let btnOk;
    let btnCancel;
    const btnClose = this.element.querySelector(`.modal__close`);

    confirmBtns.forEach((btn) => {
      switch (btn.dataset.select) {
        case `ok`: btnOk = btn; break;
        case `cancel`: btnCancel = btn; break;
      }
    });

    const modalWrapper = this.element.querySelector(`.modal`);
    const cancelHandler = (evt) => {
      evt.preventDefault();
      this.onCancel(modalWrapper);
    };

    btnCancel.addEventListener(`click`, cancelHandler);
    btnClose.addEventListener(`click`, cancelHandler);

    btnOk.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onConfirm();
    });
  }
}
