import ErrorView from '../views/view-error';

export default class ErrorScreen {
  constructor() {
    this.content = new ErrorView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.content.element);
  }
}
