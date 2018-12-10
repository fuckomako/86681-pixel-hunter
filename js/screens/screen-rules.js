import HeaderView from '../views/view-header';
import RulesView from '../views/view-rules';
import FooterView from '../views/view-footer';

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
