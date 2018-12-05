import GreetingView from '../views/view-greeting';
import FooterView from '../views/view-footer';

export default class GreetingScreen {
  constructor() {
    this.content = new GreetingView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  showNextScreen() { }

  init() {
    this.content.onContinueBtnClick = this.showNextScreen;
  }
}
