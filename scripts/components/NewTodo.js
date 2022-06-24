class NewTodo {
  constructor(form) {
    this.form = form;
    this.input = this.form.querySelector('.new__input');
    this.button = this.form.querySelector('.new__button');
  }

  _openForm() {
    this.input.classList.add('new__input_active');
    this.button.classList.add('new__button_active');
    this.input.value = "";
    this.button.textContent = "";
    this.input.focus();

    // let focus = setInterval(() => {
    //   this.input.focus();
    //   clearInterval(focus);
    // }, 300);

   }

  _closeForm() {
    this.input.classList.remove('new__input_active');
    this.button.classList.remove('new__button_active');
    this.button.textContent = "Создать";
  }

  setEventListeners() {
    // this.form.addEventListener('submit', (event) => {
    //   event.preventDefault();
    //   // console.log('submit form');
    // })

    this.button.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.button.closest('.new__button_active')) {
        this._openForm();
      }
      else {
        this._closeForm();
      }
    });

    this.input.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('input');
    })
  }
}