import AbstractView from './abstract-view';
import statsBarTemplate from '../templates/template-stats-bar';
import {resize} from '../data/resize';

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
    ${[...this.question.params].map((param) => `
      <div class="game__option" data-type="${param.class}" data-number="${param.index}">
      <img src="${param.src}" alt="Option ${param.index}" width="705" height="455">
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

      image.addEventListener(`load`, () => {
        this.onGameImageLoad(image);
      });
    });

    const form = this.element.querySelector(`.game__content`);
    const options = this.element.querySelectorAll(`.game__option`);

    form.addEventListener(`change`, () => {

      let answers = [];

      options.forEach((option) => {
        let optionValue = option.dataset.type;
        let versions = option.querySelectorAll(`input`);

        versions.forEach((version) => {
          if (version.checked) {
            let answerValue = version.value;
            answers.push(optionValue === answerValue);
          }
        });
      });

      if (options.length === answers.length) {
        const result = !answers.includes(false);
        this.onAnswer(result);
      }
    });
  }
}
