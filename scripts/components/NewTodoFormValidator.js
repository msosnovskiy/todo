class NewTodoFormValidator {
  constructor(body, container, form, todo, switchButton) {
    this.body = body;
    this.container = container;
    this.form = form;
    this.todo = todo;
    this.switchButton = switchButton;
    this.input = this.form.querySelector('.new__input');
    this.button = this.form.querySelector('.new__button');
    this.formActive = false;
  }

  _openForm() {
    this.input.classList.add('new__input_active');
    this.button.classList.add('new__button_opened');
    this.button.textContent = "";
    this.button.setAttribute('disabled', 'true');
    this.input.focus();
  }

  _closeForm() {
    this.input.classList.remove('new__input_active');
    this.button.removeAttribute('disabled');
    this.button.classList.remove('new__button_opened');
    this.button.classList.remove('new__button_active');
    this.input.blur();
    this.input.value = "";
    this.formActive = false;

    let setButtonText = setInterval(() => {
      this.button.textContent = 'Создать';
      clearInterval(setButtonText);
    }, 100);
  }

  _switchButton() {
    // анимация перемещения кнопки создать при добавлении todo
    const elements = this.container.querySelectorAll('.todo').length;

    if (elements > 0 ) {
      let setButtonAnimation = setInterval(() => {
        this.form.classList.add('new_not-empty')
        this.body.classList.add('root_not-empty');
        this.switchButton.style.visibility = 'visible';
        clearInterval(setButtonAnimation);
      }, 200);
    }
    else {
      this.form.classList.remove('new_not-empty');
      this.body.classList.remove('root_not-empty');
      this.switchButton.style.visibility = 'hidden';
    }
  }

  setEventListeners() {

    this.form.addEventListener('input', () => {
      if (this.input.value.length > 0) {
        this.button.removeAttribute('disabled');
        this.button.classList.add('new__button_active');
        this.formActive = true;
      } else {
        this.button.setAttribute('disabled', 'true');
        this.button.removeAttribute('disabled');
        this.button.classList.remove('new__button_active');
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
          this.container.prepend(this.todo._create(this.input.value));
          this._switchButton();
        }
        // возврат к состоянию по умолчанию

        this._closeForm();
      }
    });

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