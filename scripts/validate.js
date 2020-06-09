function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}

function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function setEventListenersForm(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {

      isValid(formElement, inputElement, settings);
      toggleButtonState(formElement, settings);

    });
  });
}

function enableValidation(settings = {}) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListenersForm(formElement, settings);
  });
}

function toggleButtonState(formElement, settings) {
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}
