import AbstractViewQuestion from './abstract-view-question';
import statsBarTemplate from '../templates/template-stats-bar';

export default class QuestionViewChoose extends AbstractViewQuestion {
  constructor(question, gamePreloadedImages, gameState) {
    super();
    this.question = question;
    this.gamePreloadedImages = gamePreloadedImages;
    this.gameState = gameState;
    this.preloadedImagesUrls = [];
    this.answerCorrect = this.question.description === `Найдите рисунок среди изображений` ? `paint` : `photo`;
  }

  get template() {
    return `
    <section class="game">
      <p class="game__task">${this.question.description}</p>
      <form class="${this.question.inner}">
      ${[...this.question.answers].map((answer) => `
        <div class="game__option" data-type="${answer.class}">
        </div>`).join(``)}
      </form>
      ${statsBarTemplate(this.gameState.answers)}
    </section>
    `;
  }

  bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    options.forEach((option, optionIndex) => {

      this.insertPreloadedImage(option, optionIndex);

      const image = option.querySelector(`.game__option > img`);
      image.style.pointerEvents = `none`;

      const correctVersion = [...options].find((version) => version.dataset.type === this.answerCorrect);
      correctVersion.classList.add(`correct-answer`);

      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        const result = (target === correctVersion);

        this.onAnswer(result);
      });
    });
  }
}
