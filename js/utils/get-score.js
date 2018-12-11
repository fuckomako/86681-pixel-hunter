import {ScoringRules} from './constants';

export default (answers, lives) => {

  let gameResult = {
    correctAnswers: {
      count: answers.filter((answer) => {
        return answer === `correct` || answer === `fast` || answer === `slow`;
      }).length,
      get points() {
        return this.count * ScoringRules.CORRECT_ANSWER;
      }
    },
    fastResponse: {
      count: answers.filter((answer) => answer === `fast`).length,
      get points() {
        return this.count * ScoringRules.FAST_RESPONSE;
      }
    },
    slowResponse: {
      count: answers.filter((answer) => answer === `slow`).length,
      get points() {
        return this.count * ScoringRules.SLOW_RESPONSE;
      }
    },
    lives: {
      count: lives,
      get points() {
        return this.count * ScoringRules.REMAINING_LIFE;
      }
    },
    getTotalScore: () =>
      gameResult.correctAnswers.points +
      gameResult.fastResponse.points +
      gameResult.slowResponse.points +
      gameResult.lives.points
  };

  return gameResult;
};

