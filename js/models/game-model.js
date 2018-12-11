import {GameConcept, TimeLimits} from '../utils/constants';

export default class GameModel {
  constructor(gameData, playerName) {
    this.gameData = gameData;
    this.playerName = playerName;
    this.restartGame();
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
    return this._gameState.lives < 0;
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

  renewTimer() {
    this._gameState.time = TimeLimits.INITIAL_TIMER;
  }

  get gameState() {
    return this._gameState;
  }
}

