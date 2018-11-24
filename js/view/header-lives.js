import {renderElement} from '../util/util';

const livesHeaderTemplate = (gameState) =>
  `
  <div class="game__lives">
      ${new Array(3 - gameState.lives)
    .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
    .join(``)}
      ${new Array(gameState.lives)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
  </div>
  `;

const livesHeader = (gameState) => {

  const livesHeaderElement = renderElement(livesHeaderTemplate(gameState));

  return livesHeaderElement;
};

export default livesHeader;
