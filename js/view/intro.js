import {renderElement, containScreenBlocks, changeScreen} from '../util/util';
import footer from './footer';
import greeting from './greeting';

const introTemplate = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

const intro = () => {
  const introElement = renderElement(introTemplate);
  const introScreen = containScreenBlocks(introElement, footer()
  );

  const startButton = introScreen.querySelector(`.intro__asterisk`);
  const startButtonClickHandler = () =>
    changeScreen(greeting());

  startButton.addEventListener(`click`, startButtonClickHandler);

  return introScreen;

};

export default intro;

