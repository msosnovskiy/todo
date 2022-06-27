class NewTodo {
  constructor(constructor, progress, todos) {
    this.constructor = constructor;
    this.progress = progress;
    this.todos = todos;
  }

  _create(text) {
    const todo = this.constructor._create('div', 'todo');
    const todoHeader = this.constructor._create('div', 'todo__header');
    const todoUser = this.constructor._create('p', 'todo__user', 'You');
    const todoName = this.constructor._create('p', 'todo__name', text);
    const btnMore = this.constructor._create('button', 'todo__more');
    const dates = this.constructor._create('div', 'todo__dates');
    const date = this.constructor._create('p', 'todo__date');
    const hour = this.constructor._create('p', 'todo__hour');
    const progress = this.constructor._create('div', 'progress');
    this.progress(progress);
    const todoForm = this.constructor._create('form', 'todo__form');
    const todoFormInput = this.constructor._create('input', 'todo__new-item');
    todoFormInput.placeholder = 'Что-то еще?';
    const btnAdd = this.constructor._create('button', 'todo__add-button');
    btnAdd.setAttribute('disabled', 'true');
    btnAdd.setAttribute('type', 'submit');
    const todoLists = this.constructor._create('div', 'todo__lists');
    const todoProgress = this.constructor._create('div', 'todo__process');
    const todoDone = this.constructor._create('div', 'todo__done');
    const todoDoneTitle = this.constructor._create('p', 'todo__done-title', 'Выполнено');
    this.todos()

    todo.appendChild(todoHeader);
    todoHeader.appendChild(todoUser);
    todoHeader.appendChild(todoName);
    todoHeader.appendChild(btnMore);
    
    todo.appendChild(dates);
    dates.appendChild(date);
    dates.appendChild(hour);

    todo.appendChild(progress);

    todo.appendChild(todoForm);
    todoForm.appendChild(todoFormInput);
    todoForm.appendChild(btnAdd);

    todo.appendChild(todoLists);
    todoLists.appendChild(todoProgress);
    todoLists.appendChild(todoDone);
    todoDone.appendChild(todoDoneTitle);

    return todo
  }
}