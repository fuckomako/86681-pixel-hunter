import {ScoringRules} from '../utils/constants';

const getScore = (answers, lives) => {

  let gameResult = {
    correctAnswers: {
      count: answers.filter((answer) => answer.isCorrect).length,
      get points() {
        return this.count * ScoringRules.CORRECT_ANSWER;
      }
    },
    fastResponse: {
      count: answers.filter((answer) => answer.isFast).length,
      get points() {
        return this.count * ScoringRules.FAST_RESPONSE;
      }
    },
    slowResponse: {
      count: answers.filter((answer) => answer.isSlow).length,
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

export default getScore;

