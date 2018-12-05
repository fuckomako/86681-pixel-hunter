import {GameConcept, TimeLimits} from '../utils/constants';
import {questions} from '../data/game-data';

export default class GameModel {
  constructor() {
    this.restartGame();
  }

  restartGame() {
    this._gameState = {
      level: 0,
      time: TimeLimits.INITIAL_TIMER,
      lives: GameConcept.NUMBER_OF_LIVES,
      answers: []
    };

    this._gameOrder = this.createGameOrder();
  }

  createGameOrder() {
    const gameTypes = questions.map((it) => it.category);

    const gameOrder = [];
    for (let i = 0; i < GameConcept.NUMBER_OF_GAMES; i++) {
      gameOrder[i] = gameTypes[Math.floor(Math.random() * (gameTypes.length))];
    }
    return gameOrder;
  }

  renewQuestionType() {
    this._question = questions.find((question) =>
      question.category === this._gameOrder[this._gameState.level]);
    return this._question;
  }

  die() {
    this._gameState.lives--;
  }

  isDead() {
    return this._gameState.lives === 0;
  }

  nextLevel() {
    return this._gameState.level++;
  }

  gameComplete() {
    return this._gameState.level === GameConcept.NUMBER_OF_GAMES;
  }

  tick() {
    this._gameState.time--;
  }

  restartTimer() {
    this._gameState.time = TimeLimits.INITIAL_TIMER;
  }

  get gameState() {
    return this._gameState;
  }
}

