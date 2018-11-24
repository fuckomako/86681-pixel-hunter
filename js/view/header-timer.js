import {renderElement} from '../util/util';

const timerHeaderTemplate = (gameState) =>
  `
  <h1 class="game__timer">${gameState.time}</h1>
  `;

const timerHeader = (gameState) => {

  const timerHeaderElement = renderElement(timerHeaderTemplate(gameState));

  return timerHeaderElement;
};

export default timerHeader;

