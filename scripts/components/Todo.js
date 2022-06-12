class Todo {
  constructor(container, progress, process, done) {
    this.container = container;
    this.progress = progress;
    this.process = process;
    this.done = done;
    this.xTransform = 0;
    this.sizeToRemove = this.container.offsetWidth * 0.35;
  }

  _createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (text !== undefined) {
      element.textContent = text;
      return element;
    }
    else return element;
  }

  _getAllTodos() {
    const allTodos = this.container.querySelectorAll('.todo__wrap').length;
    return allTodos;
  }

  _getCheckedTodos() {
    const checkedTodos = this.done.querySelectorAll('.todo__check-button_checked').length;
    return checkedTodos;
  }

  _createItem(task) {
    const todo = this._createElement('div', 'todo__wrap');
    const item = this._createElement('div', 'todo__item');
    const name = this._createElement('p', 'todo__item-name', task);
    const checkButton = this._createElement('button', 'todo__check-button');
    const wrap = this._createElement('div', 'todo__delete-button-wrap');
    const deleteButton = this._createElement('button', 'todo__delete-button');

    todo.appendChild(item);
    item.appendChild(name);
    item.appendChild(checkButton);
    todo.appendChild(wrap);
    wrap.appendChild(deleteButton);


    this.todo = todo;
    this.checkButton = checkButton;
    this.name = name;
    this.item = item;
    this.deleteButton = deleteButton;
    this.wrap = wrap;
    this.setEventListeners(this.todo, this.item, this.name, this.checkButton, this.wrap, this.deleteButton);

    return todo;
  }


  switchButtonState(button, element) {
    if (button.closest('.todo__check-button_checked')) {
      element.classList.remove('todo__item-name_checked');
      button.classList.remove('todo__check-button_checked');
      // был чекнут? ДА
      return true;
    }
    else {
      element.classList.add('todo__item-name_checked');
      button.classList.add('todo__check-button_checked');
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

  _close(element) {
    element.style.transform = '';
    element.style.transitionDuration = '.2s';
    element.removeAttribute('aria-label');
  }

  _delete(item, button, wrap, checkButton) {
    const name = item.querySelector('.todo__item-name');

    wrap.style.height = `${item.offsetHeight - 2}px`;
    item.style.height = `${item.offsetHeight}px`;
    item.style.transitionDuration = '0.175s';

    item.style.transform = 'translateX(-100vw)';

    let animationInt = setInterval(() => {
      item.style.height = '0px';
      item.classList.add('todo__item_hide');
      checkButton.remove();
      name.textContent = '';

      wrap.style.height = '0px';
      wrap.style.transitionDuration = '0.175s';
      button.remove();
      wrap.classList.add('todo__delete-button-wrap_hide');
      clearInterval(animationInt);
    }, 175);


    let removeInt = setInterval(() => {
      const todo = item.closest('.todo__wrap');
      todo.remove();
      this.progress._updateTotal(this._getAllTodos());
      this.progress._updateActive(this._getCheckedTodos());
      this.progress._update();

      if (this._getCheckedTodos() == 0) {
        this.done.classList.remove('todo__done_visible');
      }

      clearInterval(removeInt);
    }, 300);

  }

  setEventListeners(todo, item, name, checkButton, deleteWrap, deleteButton) {

    // координаты в момент начала тач события
    let x1 = null;
    let y1 = null;

    //действия при нажатии на кнопку check
    checkButton.addEventListener('click', () => {
      this._closeOpenedForDelete(deleteButton);
      this.switchButtonState(checkButton, name) ? this.process.appendChild(todo) : this.done.appendChild(todo);
      this._getCheckedTodos() > 0 ? this.done.classList.add('todo__done_visible') : this.done.classList.remove('todo__done_visible');
      this.progress._updateActive(this._getCheckedTodos());
      this.progress._update();
    })

    item.addEventListener('touchstart', (event) => {
      x1 = event.touches[0].clientX;
      y1 = event.touches[0].clientY;
    })


    item.addEventListener('touchmove', (event) => {
      if (!x1 || !y1) {
        return false;
      }

      let x2 = event.touches[0].clientX;
      let y2 = event.touches[0].clientY;

      let xDiff = x2 - x1;
      let yDiff = y2 - y1;
      this.xTransform = -xDiff;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // движение right или left
        if (xDiff > 0) {
          // console.log('rigth');

          if (item.closest('[aria-label="for-delete"]')) {
            item.style.transitionDuration = '0s';

            
            if (xDiff <= 68) {
              item.style.transform = `translateX(${xDiff - 68}px)`;
            }
            else {
              this._closeOpenedForDelete();
            }
          }
          else {
            x1 = null;
            y1 = null;
          }

          // x1 = null;
          // y1 = null;
        }
        else {

          // console.log('left');

          //получение текущего значения трансформации
          let translateX = item.style.transform.replace(/[^\d.]/g, '');


          item.style.transitionDuration = '0s';

          if (item.closest('[aria-label="for-delete"]')) {
            item.style.transform = `translateX(${xDiff - 68}px)`;
            // this.xTransform = this.xTransform + 68;
          }
          else {
            item.style.transform = `translateX(${xDiff}px)`;
          }

          // item.style.transform = `translateX(${xDiff}px)`;

          this.xTransform >= this.sizeToRemove ? deleteButton.classList.add('todo__delete-button_active') : deleteButton.classList.remove('todo__delete-button_active');

          // x1 = null;
          // y1 = null;
        }
      }

      else {
        // движение top или bottom
        if (xDiff > 0) {

          // console.log('bottom');
          x1 = null;
          y1 = null;
        }
        else {
          // console.log('top');

          // console.log(`xDiff ${xDiff}`);
          // console.log(`yDiff ${yDiff}`);

          x1 = null;
          y1 = null;
        }
      }


    })


    //действия с Todo 
    item.addEventListener('touchend', (event) => {

      // от 68px до 40% - возврат к кнопке удалить
      if (this.xTransform >= 68 && this.xTransform < this.sizeToRemove) {
        this._closeOpenedForDelete();
        item.style.transitionDuration = '.2s';
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
        deleteButton.classList.remove('todo__delete-button_active');
        this._close(item);
      }

      this.xTransform = 0;
    })

    item.addEventListener('click', (event) => {
      // проверка на клик по Todo 
      if (event.target !== checkButton) {
        this._closeOpenedForDelete();
      }
      else return;
    })

    deleteButton.addEventListener('click', (event) => {
      deleteButton.removeAttribute('disabled');
      this._delete(item, deleteButton, deleteWrap, checkButton);
    })


  }
}
