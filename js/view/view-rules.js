import AbstractView from './abstract-view';
import headerLogoTemplate from '../template/template-header-logo';
import footerTemplate from '../template/template-footer';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <header class="header">
    ${headerLogoTemplate}
    </header>
    <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
    ${footerTemplate}
    `;
  }

  onFormSubmit() { }
  onLogoClick() { }

  bind() {
    const submitBtn = this.element.querySelector(`.rules__button`);
    const input = this.element.querySelector(`.rules__input`);
    const form = this.element.querySelector(`.rules__form`);

    const onNameInput = () => {
      submitBtn.disabled = !input.value.length;
    };

    input.addEventListener(`input`, onNameInput);


    form.addEventListener(`change`, () => {
      this.onFormSubmit(form, submitBtn);
    });

    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });
  }
}

