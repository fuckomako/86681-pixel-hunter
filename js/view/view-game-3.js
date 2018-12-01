import AbstractView from './abstract-view';
import {questions} from '../data/game-data';
import headerLogoTemplate from '../template/template-header-logo';
import headerTimerTemplate from '../template/template-header-timer';
import headerLivesTemplate from '../template/template-header-lives';
import flowStatsTemplate from '../template/template-stats';
import footerTemplate from '../template/template-footer';

const questionCategory = questions.find((question) => question.category === `threeImages`);

export default class Question3View extends AbstractView {
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
        <form class="game__content game__content--triple">
        ${[...questionCategory.params].map((param) => `
        <div class="game__option" data-type="${param.type}">
          <img src="${param.src}" alt="Option 1" width="304" height="455">
        </div>`).join(``)}
        </form>
        ${flowStatsTemplate(this.gameStatus)}
      </div>
    ${footerTemplate}
    `;
  }

  onLogoClick() { }
  onAnswer() { }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);

    options.forEach((option) => {
      option.querySelector(`img`).style.pointerEvents = `none`; // для firefox
      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        this.onAnswer(target);
      });
    });

    const logoBtn = this.element.querySelector(`.back`);
    logoBtn.addEventListener(`click`, () => {
      this.onLogoClick();
    });
  }
}

