import {renderScreen} from '../util/util';
import {NUMBER_OF_GAMES, getGameOrder} from '../data/game-data';
import Question1View from '../view/view-game-1';
import Question2View from '../view/view-game-2';
import Question3View from '../view/view-game-3';
import getModalConfirmScreen from './screen-modalConfirm';
import getFinalStatsScreen from './screen-finalStats';

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

  oneImageQuestion.onRadioChange = (form, option) => {
    const option1Value = option.dataset.type;
    const answer1Value = form.question1.value;

    if (answer1Value) {
      getAnswer((option1Value === answer1Value), timeDefault);
      form.reset();
      changeGameLevel(oneImageQuestionScreen);
    }
  };
  oneImageQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return oneImageQuestionScreen;
};


const getTwoImagesQuestionScreen = () => {
  const twoImagesQuestion = new Question2View(gameState);
  const twoImagesQuestionScreen = twoImagesQuestion.element;

  twoImagesQuestion.onRadioChange = (form, ...options) => {
    let option1Value;
    let option2Value;

    options.forEach((option) => {
      if (option.dataset.number === `1`) {
        option1Value = option.dataset.type;
      }
      if (option.dataset.number === `2`) {
        option2Value = option.dataset.type;
      }
    });

    const answer1Value = form.question1.value;
    const answer2Value = form.question2.value;

    if (answer1Value && answer2Value) {
      getAnswer(
          (option1Value === answer1Value) && (option2Value === answer2Value),
          timeDefault
      );
      form.reset();
      changeGameLevel(twoImagesQuestionScreen);
    }
  };

  twoImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return twoImagesQuestionScreen;
};

const getThreeImagesQuestionScreen = () => {
  const threeImagesQuestion = new Question3View(gameState);
  const threeImagesQuestionScreen = threeImagesQuestion.element;

  threeImagesQuestion.onImageClick = (target) => {
    getAnswer(target.dataset.type === `paint`, timeDefault);
    changeGameLevel(threeImagesQuestionScreen);
  };

  threeImagesQuestion.onLogoClick = () => renderScreen(getModalConfirmScreen());

  return threeImagesQuestionScreen;
};

export const playGame = (gameStatus = gameState) => {
  const gameTypeMap = {
    "oneImage": getOneImageQuestionScreen(),
    "twoImages": getTwoImagesQuestionScreen(),
    "threeImages": getThreeImagesQuestionScreen()
  };

  const currentGameScreen = gameTypeMap[gameOrder[gameStatus.level]];

  // console.log(gameOrder);
  // console.log(gameState);
  // console.log(currentGameScreen);

  return currentGameScreen;
};
