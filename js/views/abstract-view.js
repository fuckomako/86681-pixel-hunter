import {createDomElement} from '../utils/util';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.createDomElement();
    this.bind(this._element);
    return this._element;
  }

  createDomElement() {
    return createDomElement(this.template);
  }

  bind() {}
}

export default AbstractView;
