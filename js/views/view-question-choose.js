import AbstractView from './abstract-view';
import statsBarTemplate from '../templates/template-stats-bar';
import {resize} from '../data/resize';

export default class QuestionViewChoose extends AbstractView {
  constructor(question, gameState) {
    super();
    this.question = question;
    this.gameState = gameState;
  }

  get template() {
    return `
    <div class="game">
    <p class="game__task">${this.question.description}</p>
    <form class="game__content game__content--triple">
    ${[...this.question.params].map((param) => `
      <div class="game__option" data-type="${param.class}">
      <img src="${param.src}" alt="Option 1" width="304" height="455">
      </div>`).join(``)}
    </form>
    ${statsBarTemplate(this.gameState)}
    </div>
    `;
  }

  onAnswer() { }
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
        this.onGameImageLoad(image);
      });
    });

    const options = this.element.querySelectorAll(`.game__option`);

    options.forEach((option) => {
      option.addEventListener(`click`, (evt) => {
        const target = evt.target;
        const result = target.dataset.type === this.question.answerCorrect;

        this.onAnswer(result);
      });
    });
  }
}
