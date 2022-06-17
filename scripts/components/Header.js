class Header {
  constructor(container) {
    this.container = container;
    // this.progressBar = '';
  }

  _setProgressBar(element) {

    //постоянно дублирует!!!!! ДОБАВЛЯЕТ!
    const badElement = this.container.children[0];
    if (badElement != undefined) {

      badElement.remove();
      this.container.appendChild(element);
    }
    else {

      this.container.appendChild(element);
    }
    // this.progressBar = element;
  }

  _removeProgressBar() {
    // this.container.remove(this.progressBar);
  }
}