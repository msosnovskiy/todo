class Element {
  constructor() {
  }

  _create(tag, className, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (text !== undefined) {
      element.textContent = text;
      return element;
    }
    else return element;
  }
}