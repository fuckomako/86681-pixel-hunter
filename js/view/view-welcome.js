import AbstractView from './abstract-view';
import footerTemplate from '../template/template-footer';

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
    ${footerTemplate}
    `;
  }

  onStartButtonClick() { }

  bind() {
    const startButton = this.element.querySelector(`.intro__asterisk`);
    startButton.addEventListener(`click`, this.onStartButtonClick);
  }
}
