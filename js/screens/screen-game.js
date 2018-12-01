import {renderScreen} from '../util/util';
import {NUMBER_OF_GAMES, getGameOrder} from '../data/game-data';
import Question1View from '../view/view-game-1';
import Question2View from '../view/view-game-2';
import Question3View from '../view/view-game-3';
import getModalConfirmScreen from './screen-modal-confirm';
import getFinalStatsScreen from './screen-final-stats';

const NUMBER_OF_LIVES = 3;

let gameState;
let gameOrder;

export const resetGame = () => {

  gameOrder = getGameOrder();

  gameState = {
    level: 0,
    time: 0,
    lives: NUMBER_OF_LIVES,
    points: 0,
    answers: []
  };
};

const changeGameLevel = () => {

  gameState.level += 1;

  if (gameState.lives === 0 || (gameState.level >= NUMBER_OF_GAMES)) {
    renderScreen(getFinalStatsScreen());
  } else {
    renderScreen(playGame(gameState));
  }
};

export const fixGameState = () => {
  return gameState;
};

const SLOW_RESPONSE_TIMELIMIT = 20;
const QUICK_RESPONSE_TIMELIMIT = 10;

const timeDefault = 15;

const getAnswer = (result, time) => {
  let answer = {
    isCorrect: result,
    time,
    isFast: time < QUICK_RESPONSE_TIMELIMIT,
    isSlow: time > SLOW_RESPONSE_TIMELIMIT
  };

  if (!answer.isCorrect) {
    gameState.lives -= 1;
  }

  gameState.answers.push(answer);
};

const getOneImageQuestionScreen = () => {
  const oneImageQuestion = new Question1View(gameState);
  const oneImageQuestionScreen = oneImageQuestion.element;

  oneImageQuestion.onAnswer = (answer) => {
    getAnswer(answer, timeDefault);
    changeGameLevel();
  };

  oneImageQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return oneImageQuestionScreen;
};


const getTwoImagesQuestionScreen = () => {
  const twoImagesQuestion = new Question2View(gameState);
  const twoImagesQuestionScreen = twoImagesQuestion.element;

  twoImagesQuestion.onAnswer = (answer) => {
    getAnswer(answer, timeDefault);
    changeGameLevel();
  };

  twoImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return twoImagesQuestionScreen;
};

const getThreeImagesQuestionScreen = () => {
  const threeImagesQuestion = new Question3View(gameState);
  const threeImagesQuestionScreen = threeImagesQuestion.element;

  threeImagesQuestion.onAnswer = (answer) => {
    getAnswer(answer.dataset.type === `paint`, timeDefault);
    changeGameLevel();
  };

  threeImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return threeImagesQuestionScreen;
};

export const playGame = (gameStatus = gameState) => {

  switch (gameOrder[gameStatus.level]) {
    case `oneImage`:
      return getOneImageQuestionScreen();
    case `twoImages`:
      return getTwoImagesQuestionScreen();
    case `threeImages`:
      return getThreeImagesQuestionScreen();
    default:
      return ``;
  }
};
