import {renderScreen} from '../util/util';
import WellcomeView from '../view/view-wellcome';
import getGreetingScreen from './screen-greeting';

const getWellcomeScreen = () => {
  const intro = new WellcomeView();

  intro.onStartButtonClick = () => renderScreen(getGreetingScreen());

  const introScreen = intro.element;
  return introScreen;
};

export default getWellcomeScreen;
