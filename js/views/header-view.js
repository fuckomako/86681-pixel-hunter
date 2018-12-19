import AbstractView from './abstract-view';
import {GameConcept} from '../utils/constants';

const generateLivesTemplate = (lives, maxLives) => {
  return `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`.repeat(maxLives - Math.max(0, lives)) + `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`.repeat(Math.max(0, lives));
};

export default class HeaderView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  _logo() {
    return `
      <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>`;
  }

  get template() {
    if (this.gameState) {
      return `
      <header class="header">
        ${this._logo()}
        <div class="game__timer">${this.gameState.time}</div>
        <div class="game__lives">
           ${generateLivesTemplate(this.gameState.lives, GameConcept.NUMBER_OF_LIVES)}
        </div>
      </header>`;
    }
    return `
     <header class="header">
       ${this._logo()}
     g</header>`;
  }

  update(time, lives) {
    if (time !== this._time) {
      this._timeElement.textContent = time;
      this._time = time;
    }
    if (lives !== this.lives) {
      this._livesElement.innerHTML = generateLivesTemplate(lives, GameConcept.NUMBER_OF_LIVES);
      this._lives = lives;
    }
  }

  blink(start) {
    if (start) {
      this._timeElement.classList.add(`game__timer--blink`);
    } else {
      this._timeElement.classList.remove(`game__timer--blink`);
    }
  }

  onLogoClick() { }

  bind() {
    this._timeElement = this.element.querySelector(`.game__timer`);
    this._livesElement = this.element.querySelector(`.game__lives`);

    const logo = this.element.querySelector(`.back`);
    logo.addEventListener(`click`, () => this.onLogoClick());
  }
}
