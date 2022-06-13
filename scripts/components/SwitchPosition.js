class SwitchPosition {
  constructor(switcherButton) {
    this. switcherButton = switcherButton;
  }
  setEventListeners() {
    this.switcherButton.addEventListener('click', (event) => {
      this.switcherButton.classList.toggle('button__change_reverse');
      // console.log(event.currentTarget);
    });
  }
}