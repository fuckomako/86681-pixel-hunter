import HeaderView from '../views/header-view';
import StatsView from '../views/stats-view';
import FooterView from '../views/footer-view';

export default class StatsScreen {
  constructor(data) {
    this.header = new HeaderView();
    this.content = new StatsView(data);
    this.footer = new FooterView();
    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }

  showGreetScreen() { }

  init() {
    this.header.onLogoClick = this.showGreetScreen;
  }
}
