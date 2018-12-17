import {GameConcept, TimeLimits} from '../utils/constants';

const MIN_LIVES_NUMBER = 0;

export default class GameModel {
  constructor(gameData, gamePreloadedImages, playerName) {
    this.gameData = gameData;
    this.gamePreloadedImages = gamePreloadedImages;
    this.playerName = playerName;
    this.restartGame();
  }

  get gameState() {
    return this._gameState;
  }

  get gameOrder() {
    return this._gameOrder;
  }

  restartGame() {
    this._gameState = {
      level: 0,
      time: TimeLimits.INITIAL_TIMER,
      lives: GameConcept.NUMBER_OF_LIVES,
      answers: []
    };
  }

  renewQuestionType() {
    this._question = this.gameData[this._gameState.level];
    return this._question;
  }

  die() {
    this._gameState.lives--;
  }

  isDead() {
    return this._gameState.lives < MIN_LIVES_NUMBER;
  }

  goToNextLevel() {
    return this._gameState.level++;
  }

  isGameComplete() {
    return this._gameState.level === GameConcept.NUMBER_OF_GAMES;
  }

  tick() {
    this._gameState.time--;
  }

  renewTimer() {
    this._gameState.time = TimeLimits.INITIAL_TIMER;
  }
}

