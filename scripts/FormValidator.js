export class FormValidator {
  constructor (formElements, formName) {
    this._formName = formName;
    this._formSelector = formElements.formSelector;
    this._inputSelector = formElements.inputSelector;
    this._submitButtonSelector = formElements.submitButtonSelector;
    this._inactiveButtonClass = formElements.inactiveButtonClass;
    this._inputErrorClass = formElements.inputErrorClass;
    this._errorClass = formElements.errorClass;
  }

  _showInputError(inputElement, errorMessage,) {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass );
  }

  _hideInputError(inputElement) {
    const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    const buttonElement = this._formName.querySelector(this._submitButtonSelector);
    if (this._formName.checkValidity()) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  resetValidation(...inputElements) {
    inputElements.forEach(inputElement => this._hideInputError(inputElement));
    this._toggleButtonState();
  }

  enableValidation() {
    const inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    this._formName.addEventListener('sumbit', (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {

        this._isValid(inputElement);
        this._toggleButtonState();

      });
    });
  }
}

