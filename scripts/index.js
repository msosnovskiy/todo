document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.todo__form');
  const input = document.querySelector('.todo__new-item');
  const todoLists = document.querySelector('.todo__lists');
  const addItemButton = document.querySelector('.todo__add-button');
  const SwitchPositionButton = document.querySelector('.button_change');
  const progressBar = document.querySelector('.progress');
  const process = document.querySelector('.todo__process');
  const done = document.querySelector('.todo__done');

  const element = new Element();
  const progress = new Progress(progressBar);
  const todos = new Todos(element, todoLists, progress, process, done);
  const formValidator = new FormValidator(process, form, addItemButton, input, todos, progress);
  const switchPosition = new SwitchPosition(SwitchPositionButton);

  progress._createItem();
  formValidator.setEventListeners();
  switchPosition.setEventListeners();


  // var tx = document.getElementsByTagName('textarea');//РАСТЯГИВАЕМ_textarea

  // console.log(tx[0]);

  // tx[0].style.height = tx[0].scrollHeight;
  // tx[0].addEventListener("input", () => {

  //   tx[0].style.height = (tx[0].scrollHeight) + 'px';
  // });

});

