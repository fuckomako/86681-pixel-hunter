import {renderScreen} from '../util/util';
import WelcomeView from '../view/view-welcome';
import getGreetingScreen from './screen-greeting';

const getWelcomeScreen = () => {
  const intro = new WelcomeView();

  intro.onStartButtonClick = () => renderScreen(getGreetingScreen());

  const introScreen = intro.element;
  return introScreen;
};

export default getWelcomeScreen;
