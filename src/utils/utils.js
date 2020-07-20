export function progress(selector, isInProgress, initialState) {
  const formButton = selector.querySelector('.popup__button-submit');
  if(isInProgress) {
    formButton.textContent = 'Сохранение...';
  } else {
    formButton.textContent = initialState;
  }
}
