import {GameConcept} from '../utils/constants.js';

const renewAnswerIndicator = (answer) => {
  if (answer === undefined) {
    return `stats__result--unknown`;
  }
  if (!answer.isCorrect) {
    return `stats__result--wrong`;
  }
  if (answer.isFast) {
    return `stats__result--fast`;
  }
  if (answer.isSlow) {
    return `stats__result--slow`;
  }
  if (answer.isCorrect) {
    return `stats__result--correct`;
  } else {
    return null; // Вместо null что сделать? Обработать ошибку через throw Error
  }
};

const statsBarTemplate = (gameStatus) =>
  `
    <ul class="stats">
    ${new Array(GameConcept.NUMBER_OF_GAMES).fill().map((it, i) =>`
    <li class="stats__result ${renewAnswerIndicator(gameStatus.answers[i])}"></li>
    `).join(``)}
    </ul>
  `;

export default statsBarTemplate;

