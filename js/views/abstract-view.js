import createDomElement from '../utils/create-element';

export default class AbstractView {
  constructor() {
    if (this.constructor === AbstractView) {
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

  bind() {
  }
}
