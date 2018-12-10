import HeaderView from '../views/view-header';
import StatsView from '../views/view-stats';
import FooterView from '../views/view-footer';

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
