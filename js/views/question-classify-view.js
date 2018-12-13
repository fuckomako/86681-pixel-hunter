import AbstractView from './abstract-view';
import statsBarTemplate from '../templates/template-stats-bar';
import renderImages from '../utils/resize';
import renderDebug from '../utils/render-debug';

export default class QuestionViewClassify extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;
  }

  get template() {
    return `
    <div class="game">
    <p class="game__task">${this.question.description}</p>
    <form class="${this.question.inner}">
    ${[...this.question.answers].map((answer, index) => `
      <div class="game__option" data-type="${answer.class}">
      <img src="${answer.src}" alt="Option ${index + 1}">
      <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--wide  game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
      </label>
      </div>
      `).join(``)}
    </form>
    ${statsBarTemplate(this.gameState.answers)}
    </div>
    `;
  }

  onAnswer() { }
  onDebug(debug) {
    return debug ? renderDebug(this.element) : null;
  }

  bind() {

    renderImages(this.element);

    const answers = [];

    const options = this.element.querySelectorAll(`.game__option`);
    options.forEach((option) => {
      const optionValue = option.dataset.type;
      const versions = option.querySelectorAll(`input`);

      const correctVersion = [...versions].find((version) => version.value === optionValue);
      const correctVersionBtn = correctVersion.parentNode.querySelector(`span`);
      correctVersionBtn.classList.add(`correct-answer`);

      option.addEventListener(`click`, () => {
        versions.forEach((version) => {
          if (version.checked) {
            const answerValue = version.value;
            answers.push(optionValue === answerValue);
          }
        });
        if (options.length === answers.length) {
          const result = !answers.includes(false);
          this.onAnswer(result);
        }
      });
    });
  }
}
