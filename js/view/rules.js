import {renderElement, wrapHeaderBlocks, containScreenBlocks, changeScreen} from '../util/util';
import backHeader from '../util/back';
import footer from './footer';
import {startGame, game} from '../game/game';

const rulesTemplate = `
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>
`;

const rules = () => {
  const rulesElement = renderElement(rulesTemplate);

  const rulesScreen = containScreenBlocks(wrapHeaderBlocks(backHeader()), rulesElement, footer()
  );

  const form = rulesScreen.querySelector(`.rules__form`);
  const formInput = rulesScreen.querySelector(`.rules__input`);
  const formSubmitBtn = rulesScreen.querySelector(`.rules__button`);

  const formInputChangeHandler = () => {
    formSubmitBtn.disabled = !formInput.value.length;
  };

  const formSubmitHandler = () => {
    startGame();
    changeScreen(game());
    form.reset();
  };

  formInput.addEventListener(`input`, formInputChangeHandler);
  form.addEventListener(`submit`, formSubmitHandler);

  return rulesScreen;
};

export default rules;
