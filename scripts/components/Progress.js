class Progress {
  constructor(container) {
    this.container = container;
    this.total = 0;
    this.active = 0;
  }

  _createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  _updateTotal(number) {
    this.total = number;
  }

  _updateActive(number) {
    this.active = number;
  }

  _createItem() {
    const progressBar = this._createElement('div', 'progress_bar');
    this.container.appendChild(progressBar);
    this.progressBar = progressBar;
    return progressBar;
  }

  _update() {
    if (this.total != 0 && this.active != 0) {
      let allWidth = this.container.offsetWidth;
      let progressPersent = allWidth / this.total * this.active * 100 / allWidth;
      this.progressBar.style.width = `${progressPersent}%`;
    }
    else {
      this.progressBar.style.width = '0px';
    };
  }
}