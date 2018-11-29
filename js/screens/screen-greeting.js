import {renderScreen} from '../util/util';
import GreetingView from '../view/view-greeting';
import getRulesScreen from './screen-rules';

const getGreetingScreen = () => {
  const greeting = new GreetingView();

  greeting.onContinueBtnClick = () => renderScreen(getRulesScreen());

  const greetingScreen = greeting.element;
  return greetingScreen;
};

export default getGreetingScreen;
