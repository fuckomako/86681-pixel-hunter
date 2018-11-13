'use strict';

(() => {
  // Инициализация счетчика и шаблона
  const INITIAL_SCREEN_ID = 0;
  const SLIDE_NAVIGATION_CONTROLS =
  `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
      z-index: 2;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;
  // Кнопки влево и вправо
  const KEY_LEFT = 37;
  const KEY_RIGHT = 39;
  // Очищаем DOM
  const clearElement = (elem) => {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };
  // Находим все шаблоны
  const gameField = document.querySelector(`#main`);
  const screens = [
    `intro`,
    `greeting`,
    `rules`,
    `game-1`,
    `game-2`,
    `game-3`,
    `stats`
  ].map((id) => document.querySelector(`#${id}`));
  let currentScreen = INITIAL_SCREEN_ID;
  // Показываем экран
  const showScreen = (number) => {
    currentScreen = Math.min(screens.length - 1, Math.max(0, number));
    if (currentScreen === number) {
      clearElement(gameField);
      const currentFragment = screens[currentScreen].content.cloneNode(true);
      gameField.appendChild(currentFragment);
    }
  };
  // Создаем контролы
  const createNavigationControls = () => {
    const fragment = document.createRange().createContextualFragment(SLIDE_NAVIGATION_CONTROLS);
    document.body.appendChild(fragment);
  };
  // Создаем обработчики для кнопок
  const createNavigationHandlers = () => {
    const arrowButtons = document.querySelectorAll(`.arrows__btn`);
    arrowButtons[0].addEventListener(`click`, previousSlideHandler);
    arrowButtons[1].addEventListener(`click`, nextSlideHandler);
    document.addEventListener(`keydown`, arrowKeyDownHandler);
  };
  // Обработчики назад и вперед
  const previousSlideHandler = () => {
    showScreen(currentScreen - 1);
  };

  const nextSlideHandler = () => {
    showScreen(currentScreen + 1);
  };
  // Действия по клику на кнопки влево и вправо
  const arrowKeyDownHandler = (evt) => {
    if (evt.keyCode === KEY_LEFT) {
      showScreen(currentScreen - 1);
    } else if (evt.keyCode === KEY_RIGHT) {
      showScreen(currentScreen + 1);
    }
  };
  // Запуск приложения
  createNavigationControls();
  createNavigationHandlers();
  showScreen(currentScreen);
})();
