class FormValidator {
  constructor(container, form, button, input, todo, progress) {
    this.container = container;
    this.form = form;
    this.button = button;
    this.input = input;
    this.todo = todo;
    this.progress = progress;
  }

  setSubmitButtonState(button, state) {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add('todo__add-button_active');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('todo__add-button_active');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      if (this.input.value.length > 0) {
        this.setSubmitButtonState(this.button, true);
      } else {
        this.setSubmitButtonState(this.button, false);
      }
    });

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
        if (!this.input.value) {
        return;
      }
  
      this.container.appendChild(this.todo._create(this.input.value));
      this.input.value = '';
      this.setSubmitButtonState(this.button, false);
      this.progress._updateTotal(this.todo._getAllTodos());
      this.progress._update();
    })

  }

}