class Todos {
  constructor(constructor, container, progressBar, processContainer, doneContainer) {
    this.constructor = constructor;
    this.container = container;
    this.progressBar = progressBar;
    this.processContainer = processContainer;
    this.doneContainer = doneContainer;
    this.xTransform = 0;
    this.sizeToRemove = this.container.offsetWidth * 0.33;
    this.touched = false;
  }


  _create(text) {
    const todo = this.constructor._create('div', 'todo__wrap');
    const item = this.constructor._create('div', 'todo__item');
    const name = this.constructor._create('p', 'todo__item-name', text);
    const checkButton = this.constructor._create('button', 'todo__check-button');
    const deleteWrap = this.constructor._create('div', 'todo__delete-button-wrap');
    const deleteButton = this.constructor._create('button', 'todo__delete-button');

    todo.appendChild(item);
    item.appendChild(name);
    item.appendChild(checkButton);
    todo.appendChild(deleteWrap);
    deleteWrap.appendChild(deleteButton);

    this.todo = todo;
    this.checkButton = checkButton;
    this.name = name;
    this.item = item;
    this.deleteButton = deleteButton;
    this.deleteWrap = deleteWrap;
    this._setEventListeners(this.todo, this.item, this.name, this.checkButton, this.deleteWrap, this.deleteButton);
    // this._setEventListeners();

    return todo;
  }

  _close(element) {
    element.style.transform = '';
    element.style.transitionDuration = '.2s';
    element.classList.remove('todo__item_active');
    element.removeAttribute('aria-label');
  }

  _delete(item, button, wrap, checkButton) {
    const name = item.querySelector('.todo__item-name');

    wrap.style.height = `${item.offsetHeight - 2}px`;
    item.style.height = `${item.offsetHeight}px`;
    item.style.transitionDuration = '.175s';

    item.style.transform = 'translateX(-100vw)';

    let animationInt = setInterval(() => {
      item.style.height = '0px';
      item.classList.add('todo__item_hide');
      checkButton.remove();
      name.textContent = '';
      wrap.style.height = '0px';
      wrap.style.transitionDuration = '.175s';
      button.remove();
      wrap.classList.add('todo__delete-button-wrap_hide');
      clearInterval(animationInt);
    }, 175);

    let removeInt = setInterval(() => {
      const todo = item.closest('.todo__wrap');
      todo.remove();
      this.progressBar._updateTotal(this._getAllTodos());
      this.progressBar._updateActive(this._getCheckedTodos());
      this.progressBar._update();

      if (this._getCheckedTodos() == 0) {
        this.doneContainer.classList.remove('todo__done_visible');
      }

      clearInterval(removeInt);
    }, 300);

  }

  _getAllTodos() {
    return this.container.querySelectorAll('.todo__wrap').length;
  }

  _getCheckedTodos() {
    return this.doneContainer.querySelectorAll('.todo__check-button_checked').length;
  }

  _getXTranslate(element) {
    return element.style.transform.replace(/[^-*\d.]/g, '');
  }

  _switchCheckButton(checkButton, todoTitle) {
    if (checkButton.closest('.todo__check-button_checked')) {
      todoTitle.classList.remove('todo__item-name_checked');
      checkButton.classList.remove('todo__check-button_checked');
      // был чекнут? ДА
      return true;
    }
    else {
      todoTitle.classList.add('todo__item-name_checked');
      checkButton.classList.add('todo__check-button_checked');
      // был чекнут? ДА
      return false;
    }
  }

  _closeOpenedForDelete() {
    const forDeleteItems = this.container.querySelectorAll('[aria-label="for-delete"]');
    forDeleteItems.forEach((item) => {
      this._close(item);
    })
  }

  _move(item, xDiff) {
    item.style.transitionDuration = '0s';
    if (xDiff <= 0) {
      // двтижение left
      item.classList.add('todo__item_active');
      item.style.transform = `translateX(${xDiff}px)`;
    }
    
    // двтижение right
    else {
      if (xDiff > 0) {
        xDiff = 0;
      }
      item.classList.remove('todo__item_active');
      item.style.transform = `translateX(${xDiff}px)`;
    };
  }

  _setEventListeners(todo, item, name, checkButton, deleteWrap, deleteButton) {

    // координата в момент начала тач события
    let x1 = null;
    let y1 = null;

    checkButton.addEventListener('click', () => {
      this._closeOpenedForDelete(deleteButton);
      this._switchCheckButton(checkButton, name) ? this.processContainer.appendChild(todo) : this.doneContainer.appendChild(todo);
      this._getCheckedTodos() > 0 ? this.doneContainer.classList.add('todo__done_visible') : this.doneContainer.classList.remove('todo__done_visible');
      this.progressBar._updateActive(this._getCheckedTodos());
      this.progressBar._update();
    });

    deleteButton.addEventListener('click', () => {
      deleteButton.removeAttribute('disabled');
      this._delete(item, deleteButton, deleteWrap, checkButton);
    })

    item.addEventListener('touchstart', (event) => {
      x1 = event.touches[0].clientX;
      y1 = event.touches[0].clientY;
    });

    item.addEventListener('touchmove', (event) => {
      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;

      let buttonWidth = deleteButton.offsetWidth;

      let xDiff = null;
      let yDiff = y2 - y1;

      !event.currentTarget.closest('[aria-label="for-delete"]') ? xDiff = x2 - x1 : xDiff = x2 - x1 - buttonWidth;
      this.xTransform = -xDiff;
      this.xTransform >= this.sizeToRemove ? deleteButton.classList.add('todo__delete-button_active') : deleteButton.classList.remove('todo__delete-button_active');

      if (Math.abs(xDiff) * 0.3 <= + Math.abs(yDiff) && this.touched === false) {
        return;
      }

      else {
        this.touched = true;
        event.preventDefault();
        this._move(item, xDiff);
      }
      
    }, false);


    //действия с Todo 
    item.addEventListener('touchend', (event) => {
      if (this.touched) {

        // от 68px до 40% - возврат к кнопке удалить
        if (this.xTransform >= 68 && this.xTransform < this.sizeToRemove) {
          this._closeOpenedForDelete();
          item.style.transitionDuration = '.15s';
          item.setAttribute('aria-label', 'for-delete');
          deleteButton.classList.add('todo__delete-button_active');
          item.style.transform = `translateX(-68px)`;
        }

        // от 40% и выше - удаление с анимированием
        else if (this.xTransform >= this.sizeToRemove) {
          this._closeOpenedForDelete();
          deleteButton.classList.add('todo__delete-button_active');
          this._delete(item, deleteButton, deleteWrap, checkButton);
        }

        // до 68px - возврат в исходное состояние 
        else {
          item.classList.remove('todo__item_active');
          deleteButton.classList.remove('todo__delete-button_active');
          this._close(item);
        }

        this.xTransform = 0;
        this.touched = false;
      }

      else {
        return;
      };
    })

    item.addEventListener('click', (event) => {
      // проверка на клик по Todo 
      if (event.target !== checkButton) {
        this._closeOpenedForDelete();
      }
      else return;
    })


  }
}