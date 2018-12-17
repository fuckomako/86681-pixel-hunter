import {ScoringRules} from './constants';

export default (answers, lives) => {

  const correctAnswersCount = answers.filter((answer) =>
    answer === `correct` || answer === `fast` || answer === `slow`).length;
  const correctAnswersPoints = correctAnswersCount * ScoringRules.CORRECT_ANSWER;

  const fastResponseCount = answers.filter((answer) => answer === `fast`).length;
  const fastResponsePoints = fastResponseCount * ScoringRules.FAST_RESPONSE;

  const slowResponseCount = answers.filter((answer) => answer === `slow`).length;
  const slowResponsePoints = slowResponseCount * ScoringRules.SLOW_RESPONSE;

  const livesPoints = lives * ScoringRules.REMAINING_LIFE;

  const totalScore =
    correctAnswersPoints + fastResponsePoints +
    slowResponsePoints + livesPoints;

  const gameResult = {
    correctAnswers: {
      count: correctAnswersCount,
      points: correctAnswersPoints
    },
    fastResponse: {
      count: fastResponseCount,
      points: fastResponsePoints
    },
    slowResponse: {
      count: slowResponseCount,
      points: slowResponsePoints
    },
    lives: {
      count: lives,
      points: livesPoints
    },
    totalScore
  };

  return gameResult;
};
