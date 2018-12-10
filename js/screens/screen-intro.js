import IntroView from '../views/view-intro';
import FooterView from '../views/view-footer';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }
}
