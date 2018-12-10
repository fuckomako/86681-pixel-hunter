import {GameConcept} from '../utils/constants';

const renewAnswerIndicator = (answer) => {
  let answerType;
  switch (answer) {
    case `fast`: answerType = `stats__result--fast`; break;
    case `slow`: answerType = `stats__result--slow`; break;
    case `correct`: answerType = `stats__result--correct`; break;
    case `wrong`: answerType = `stats__result--wrong`; break;
    case undefined: answerType = `stats__result--unknown`; break;
    default: return null;
  }
  return answerType;
};

const statsBarTemplate = (answers) =>
  `
    <ul class="stats">
    ${new Array(GameConcept.NUMBER_OF_GAMES).fill().map((answer, index) =>`
    <li class="stats__result ${renewAnswerIndicator(answers[index])}"></li>
    `).join(``)}
    </ul>
  `;

export default statsBarTemplate;

