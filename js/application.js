import IntroScreen from './screens/screen-intro';
import GreetingScreen from './screens/screen-greeting';
import RulesScreen from './screens/screen-rules';
import GameScreen from './screens/screen-game';
import ModalConfirmScreen from './screens/screen-modal-confirm';
import StatsScreen from './screens/screen-stats';
import GameModel from './models/game-model';

const mainPage = document.querySelector(`main`);

const showScreen = (screen) => {
  mainPage.innerHTML = ``;
  mainPage.appendChild(screen);
};

const coverScreen = (screen) => {
  mainPage.appendChild(screen);
};

export default class Application {
  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    intro.showNextScreen = () => this.showGreeting();
    intro.init();

  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    showScreen(greeting.root);
    greeting.showNextScreen = () => this.showRules();
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.showGreetScreen = () => this.showGreeting();
    rules.showNextScreen = () => this.showGame();
    rules.init();
  }

  static showStats(gameState) {
    const stats = new StatsScreen(gameState);
    showScreen(stats.root);
    stats.showGreetScreen = () => this.showGreeting();
    stats.init();
  }

  static showGame() {
    const model = new GameModel();
    const game = new GameScreen(model);
    showScreen(game.root);
    game.showNextScreen = () => this.showStats(model.gameState);
    game.showModal = () => this.showModalConfirm();
    game.startTimer();
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmScreen();
    coverScreen(modalConfirm.root);
    modalConfirm.showGreetScreen = () => this.showGreeting();
    modalConfirm.init();
  }
}
