import {renderScreen} from '../util/util';
import RulesView from '../view/view-rules';
import getGreetingScreen from './screen-greeting';
import {resetGame, playGame} from './screen-game';

const getRulesScreen = () => {
  const rules = new RulesView();

  rules.onFormSubmit = (form) => {
    resetGame();
    renderScreen(playGame());
    form.reset();
  };

  rules.onLogoClick = () => renderScreen(getGreetingScreen());

  const rulesScreen = rules.element;
  return rulesScreen;
};

export default getRulesScreen;

