class NewTodo {
  constructor(form) {
    this.form = form;
    this.input = this.form.querySelector('.new__input');
    this.button = this.form.querySelector('.new__button');
    this.formActive = false;
  }

  _openForm() {
    this.input.classList.add('new__input_active');
    this.button.classList.add('new__button_active');
    this.input.focus();
    this.button.textContent = "";
  }

  _closeForm() {
    this.input.classList.remove('new__input_active');
    this.button.classList.remove('new__button_active');
    this.input.blur();
    this.input.value = "";
    this.formActive = false;
    // const test = ['C', 'о', 'з', 'д', 'а', 'т', 'ь'];
    // test.forEach((item) => {
    //   let setButtonText = setInterval(() => {
    //     // this.button.textContent = this.button.textContent + item;
    //     console.log(item);
    //     clearInterval(setButtonText);
    //     return;
    //   }, 1000);

    // })


    let setButtonText = setInterval(() => {
      this.button.textContent = 'Создать';
      clearInterval(setButtonText);
    }, 200);
  }

  setEventListeners() {

    this.form.addEventListener('input', () => {
      if (this.input.value.length > 0) {
        this.formActive = true;
      } else {
        this.formActive = false;
      }
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      // если форма скрыта (состояние по умолчанию) - открыть
      if (!this.button.closest('.new__button_active')) {
        this._openForm();
      }

      //обработка события sybmit
      else {
        if (this.input.value.length > 0) {
          console.log('отправка формы');
        }
        // возврат к состоянию по умолчанию
        this._closeForm();
      }
    });

    // this.button.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   if (!this.button.closest('.new__button_active')) {
    //     this._openForm();
    //   }
    //   else {
    //     this._closeForm();
    //     return
    //   }
    // });

    this.input.addEventListener('click', (event) => {
      event.preventDefault();
      //добавить валидацию
      console.log('input');
    })

    document.addEventListener('click', (event) => {
      //если клик не по форме но форма открыта
      if (!this.form.contains(event.target) && !this.formActive) {
        this._closeForm();
      }
      else return;
    })

    document.addEventListener('touchstart', (event) => {
      //если тач не по форме но форма открыта
      if (!this.form.contains(event.target) && !this.formActive) {
        this._closeForm();
      }
      else return;
    })
  }
}