import AbstractView from './abstract-view';
import {questions} from '../data/game-data';
import headerLogoTemplate from '../template/template-header-logo';
import headerTimerTemplate from '../template/template-header-timer';
import headerLivesTemplate from '../template/template-header-lives';
import flowStatsTemplate from '../template/template-flowStats';
import footerTemplate from '../template/template-footer';

const questionCategory = questions.find((question) => question.category === `twoImages`);

export default class Question2View extends AbstractView {
  constructor(gameStatus) {
    super();
    this.gameStatus = gameStatus;
  }

  get template() {
    return `
    <header class="header">
    ${headerLogoTemplate}
    ${headerTimerTemplate(this.gameStatus)}
    ${headerLivesTemplate(this.gameStatus)}
    </header>
      <div class="game">
        <p class="game__task">${questionCategory.description}</p>
        <form class="game__content">
          ${[...questionCategory.params].map((param) => `
          <div class="game__option" data-type="${param.type}" data-number="${param.index}">
            <img src="${param.src}" alt="Option ${param.index}" width="468" height="458">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question${param.index}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input class="visually-hidden" name="question${param.index}" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
            `).join(``)}
        </form>
        ${flowStatsTemplate(this.gameStatus)}
      </div>
    ${footerTemplate}
    `;
  }

  onRadioChange() { }
  onLogoClick() { }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const options = this.element.querySelectorAll(`.game__option`);

    form.addEventListener(`click`, () => {
      this.onRadioChange(form, ...options);
    });

    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });
  }
}

