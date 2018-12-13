import IntroView from '../views/intro-view';
import FooterView from '../views/footer-view';

export default class IntroScreen {
  constructor() {
    this.content = new IntroView();
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.footer.element);
  }
}
