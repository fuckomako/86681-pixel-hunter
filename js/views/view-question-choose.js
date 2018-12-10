import AbstractView from './abstract-view';
import statsBarTemplate from '../templates/template-stats-bar';
import {resize} from '../utils/resize';

export default class QuestionViewChoose extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;

    this.answerCorrect = this.question.description === `Найдите рисунок среди изображений` ? `paint` : `photo`;
  }

  get template() {
    return `
    <section class="game">
    <p class="game__task">${this.question.description}</p>
    <form class="${this.question.inner}">
    ${[...this.question.answers].map((answer) => `
      <div class="game__option" data-type="${answer.class}">
      <img src="${answer.src}" alt="Option 1">
      </div>`).join(``)}
    </form>
    ${statsBarTemplate(this.gameState.answers)}
    </section>
    `;
  }

  onAnswer() {
  }

  onGameImageLoad(image) {

    image.parentNode.style.display = `block`;

    const frameSize = {
      width: image.parentNode.clientWidth,
      height: image.parentNode.clientHeight
    };

    const naturalSize = {
      width: image.naturalWidth,
      height: image.naturalHeight
    };

    const optimizedSize = resize(frameSize, naturalSize);

    image.width = optimizedSize.width;
    image.height = optimizedSize.height;
  }

  bind() {
    const images = this.element.querySelectorAll(`.game__option > img`);
    images.forEach((image) => {
      image.parentNode.style.display = `none`;
      image.style.pointerEvents = `none`; // для firefox click

      image.addEventListener(`load`, () => {
        return this.onGameImageLoad(image);
      });
    });


    const options = this.element.querySelectorAll(`.game__option`);
    options.forEach((option) => {
      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        const result = target.dataset.type === this.answerCorrect;

        this.onAnswer(result);
      });
    });
  }
}
