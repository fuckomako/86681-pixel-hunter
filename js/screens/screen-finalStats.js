import {renderScreen} from '../util/util';
import FinalStatsView from '../view/view-finalStats';
import getGreetingScreen from './screen-greeting';
import {fixGameState} from './screen-game';

const SCORING_RULES = {
  correctAnswer: 100,
  fastResponse: 50,
  slowResponse: -50,
  remainingLife: 50
};

const getScore = (answers, lives) => {
  let gameResult = {
    correctAnswers: {
      count: 0,
      points: 0
    },
    fastResponse: {
      count: 0,
      points: 0
    },
    slowResponse: {
      count: 0,
      points: 0
    },
    lives: {
      count: 0,
      points: 0
    },
    totalPonts: 0
  };

  answers.forEach((answer) => {

    if (answer.isCorrect) {
      gameResult.correctAnswers.count += 1;
      gameResult.correctAnswers.points += SCORING_RULES.correctAnswer;
    }
    if (answer.isFast) {
      gameResult.fastResponse.count += 1;
      gameResult.fastResponse.points += SCORING_RULES.fastResponse;
    }
    if (answer.isSlow) {
      gameResult.slowResponse.count += 1;
      gameResult.slowResponse.points += SCORING_RULES.slowResponse;
    }
  });

  gameResult.lives.count = lives;
  gameResult.lives.points = lives * SCORING_RULES.remainingLife;

  gameResult.totalPoints =
    gameResult.correctAnswers.points +
    gameResult.fastResponse.points +
    gameResult.slowResponse.count +
    gameResult.lives.points;

  return gameResult;
};

const getFinalStatsScreen = () => {
  const finalStats = new FinalStatsView(
      fixGameState(),
      getScore(fixGameState().answers, fixGameState().lives)
  );

  const finalStatsScreen = finalStats.element;

  finalStats.onLogoClick = () => renderScreen(getGreetingScreen());

  return finalStatsScreen;
};

export default getFinalStatsScreen;
