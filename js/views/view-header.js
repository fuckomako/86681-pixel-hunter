import AbstractView from './abstract-view';

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
          ${new Array(3 - this.gameState.lives)
        .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Missed Life" width="31" height="27">`)
        .join(``)}
          ${new Array(this.gameState.lives)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
        </div>
      </header>`;
    } else {
      return `
      <header class="header">
        ${this._logo()}
      </header>`;
    }
  }

  update(time) {
    if (time !== this._time) {
      this._timeElement.textContent = time;
      this._time = time;
    }
  }

  onLogoClick() { }

  bind() {
    this._timeElement = this.element.querySelector(`.game__timer`);

    const logo = this.element.querySelector(`.back`);
    logo.addEventListener(`click`, () => this.onLogoClick());

    if (this.gameState) {
      const timer = this.element.querySelector(`.game__timer`);
      if (this.gameState.time < 6) {
        timer.classList.add(`game__timer--blink`);
      }
    }
  }
}
