import AbstractView from './abstract-view';
import renderDebug from '../utils/render-debug';

export default class AbstractViewQuestion extends AbstractView {
  constructor() {
    super();
  }

  insertPreloadedImage(option, optionIndex) {
    this.question.answers.forEach((answer) => this.preloadedImagesUrls.push(answer.src));
    const preloadImage = this.gamePreloadedImages.find((image) => image.src === this.preloadedImagesUrls[optionIndex]);
    if (option.firstChild) {
      option.insertBefore(preloadImage, option.firstChild);
    } else {
      option.appendChild(preloadImage);
    }
  }
  onAnswer() { }
  onDebug(debug) {
    return debug ? renderDebug(this.element) : null;
  }
}
