'use strict';

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
// Находим все шаблоны
const gameField = document.querySelector(`#main`);
const screens = [
  `intro`,
  `greeting`,
  `rules`,
  `game-1`,
  `game-2`,
  `game-3`,
].map((id) => document.querySelector(`#${id}`));
let currentScreen = INITIAL_SCREEN_ID;
// Показываем экран
const showScreen = (number) => {
  currentScreen = Math.min(screens.length - 1, Math.max(0, number));
  if (currentScreen === number) {
    gameField.innerHTML = ``;
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
  const [leftButton, rightButton] = document.querySelectorAll(`.arrows__btn`);
  leftButton.addEventListener(`click`, previousSlideHandler);
  rightButton.addEventListener(`click`, nextSlideHandler);
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
  switch (evt.key) {
    case `ArrowLeft`:
      showScreen(currentScreen - 1);
      break;
    case `ArrowRight`:
      showScreen(currentScreen + 1);
      break;
  }
};
// Запуск приложения
createNavigationControls();
createNavigationHandlers();
showScreen(currentScreen);
