import Loader from './utils/data-loader';
import {showScreen, showModal, showScreenWithAnimation, mainPage} from './utils/render-element.js';
import GameModel from './models/game-model';
import IntroScreen from './screens/screen-intro';
import GreetingScreen from './screens/screen-greeting';
import RulesScreen from './screens/screen-rules';
import GameScreen from './screens/screen-game';
import StatsScreen from './screens/screen-stats';
import ModalConfirmScreen from './screens/screen-modal-confirm';
import ErrorScreen from './screens/screen-error';

// дебаггер - включить через url => example.com/something?debug=true
let debug;
try {
  debug = [...new URLSearchParams(window.location.search).entries()].find((pair) => pair[0] === `debug`)[1];
} catch (error) {
  debug = false;
}

export default class Application {
  static async load() {
    try {
      const intro = new IntroScreen();
      showScreen(intro.root);
      this.gameData = await Loader.loadData();
      this.gamePreloadedImages = await Loader.preloadImages(this.gameData);

      Application.showGreeting(true);
    } catch (error) {
      Application.showError(error);
    }
  }

  static start() {
    Application.load().catch(Application.showError);
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
    const rules = new RulesScreen(this.gameImages);
    showScreen(rules.root);
    rules.showGreetScreen = () => this.showGreeting();
    rules.showNextScreen = (playerName) => this.showGame(playerName);
    rules.init();
  }

  static showGame(playerName) {
    const model = new GameModel(this.gameData, this.gamePreloadedImages, playerName);
    const game = new GameScreen(model, debug);
    showScreen(game.root);
    game.showNextScreen = () => this.showStats(model);
    game.showModal = () => this.showModalConfirm();
    game.startTimer();
  }

  static async showStats(model) {
    try {
      await Loader.saveResults(model.gameState, model.playerName);
      this.gameResults = await Loader.loadResults(model.playerName);
      const stats = new StatsScreen(this.gameResults);
      showScreen(stats.root);
      stats.showGreetScreen = () => this.showGreeting();
      stats.init();
    } catch (error) {
      Application.showError(error);
    }
  }

  static showModalConfirm() {
    const modalConfirm = new ModalConfirmScreen();
    showModal(modalConfirm.root);
    modalConfirm.showGreetScreen = () => {
      this.showGreeting();
      modalConfirm.root.remove();
    };
    modalConfirm.init();
  }

  static showError(error) {
    mainPage.appendChild(new ErrorScreen(error).content.element);

  }
}


