import Loader from './utils/data-loader';
import {showScreenWithAnimation, showScreen, showModal} from './utils/render-element';
import GameModel from './models/game-model';
import IntroScreen from './screens/screen-intro';
import GreetingScreen from './screens/screen-greeting';
import RulesScreen from './screens/screen-rules';
import GameScreen from './screens/screen-game';
import StatsScreen from './screens/screen-stats';
import ModalConfirmScreen from './screens/screen-modal-confirm';
import ErrorScreen from './screens/screen-error';

export default class Application {
  static start() {
    Loader.loadData()
    .then((data) => {
      this.gameData = data;
      Application.showGreeting(true);
    })
    .catch(Application.showError);
  }

  static showIntro() {
    const intro = new IntroScreen();
    showScreen(intro.root);
    this.start();
  }

  static showGreeting(withAnimation) {
    const greeting = new GreetingScreen();
    if (withAnimation) {
      showScreenWithAnimation(greeting.root);
    } else {
      showScreen(greeting.root);
    }
    greeting.showNextScreen = () => this.showRules();
    greeting.init();
  }

  static showRules() {
    const rules = new RulesScreen();
    showScreen(rules.root);
    rules.showGreetScreen = () => this.showGreeting();
    rules.showNextScreen = (playerName) => this.showGame(playerName);
    rules.init();
  }

  static showGame(playerName) {
    const model = new GameModel(this.gameData, playerName);
    const game = new GameScreen(model);
    showScreen(game.root);
    game.showNextScreen = () => this.showStats(model);
    game.showModal = () => this.showModalConfirm();
    game.startTimer();
  }

  static showStats(model) {
    Loader.saveResults(model.gameState, model.playerName)
    .then(() => Loader.loadResults(model.playerName))
    .then((data) => {
      const stats = new StatsScreen(data);
      showScreen(stats.root);
      stats.showGreetScreen = () => this.showGreeting();
      stats.init();
    })
    .catch(Application.showError);
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmScreen();
    showModal(modalConfirm.root);
    modalConfirm.showGreetScreen = () => this.showGreeting();
    modalConfirm.init();
  }

  static showError() {
    const error = new ErrorScreen();
    showScreen(error.root);
  }
}
