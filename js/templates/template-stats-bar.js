import {GameConcept} from '../utils/constants';

const renewAnswerIndicator = (answer) => {
  switch (answer) {
    case `fast`:
      return `stats__result--fast`;
    case `slow`:
      return `stats__result--slow`;
    case `correct`:
      return `stats__result--correct`;
    case `wrong`:
      return `stats__result--wrong`;
    case undefined:
      return `stats__result--unknown`;
    default:
      return null;
  }
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
