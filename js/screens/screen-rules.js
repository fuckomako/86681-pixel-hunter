import HeaderView from '../views/header-view';
import RulesView from '../views/rules-view';
import FooterView from '../views/footer-view';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.content = new RulesView();
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  showGreetScreen() { }
  showNextScreen() { }

  init() {
    this.header.onLogoClick = this.showGreetScreen;
    this.content.onFormSubmit = this.showNextScreen;
  }
}
