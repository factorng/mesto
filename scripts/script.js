import {addCardInitialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


//editProfile globals
const editProfileCloseBtn = document.querySelector('.popup__button-close');
const editProfileEditBtn = document.querySelector('.profile__edit-button');
const editProfileEditWindow = document.querySelector('.edit-profile');
const editProfileProfileName = document.querySelector('.profile__name');
const editProfileProfileOccupation = document.querySelector('.profile__occupation');
const editProfileInputName = document.querySelector('.edit-profile__input-name');
const editProfileInputOccupation = document.querySelector('.edit-profile__input-occupation');
const editProfileForm = document.querySelector('.edit-profile__form');

//addCard globals
const addCardForm = document.querySelector('.add-card__form');
const addCardWindow = document.querySelector('.add-card');
const addCardAddBtn = document.querySelector('.profile__add-button');
const addCardCloseBtn = document.querySelector('.add-card__button-close');
const addCardCardImageWrapper = document.querySelector('.places');
const addCardInputName = document.querySelector('.add-card__input-name');
const addCardInputLink = document.querySelector('.add-card__input-link');


// Photo popup globals
const showPhotoCloseBtn = document.querySelector('.show-photo__button-close');
const showPhotoWindow = document.querySelector('.show-photo');

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  editProfileProfileName.textContent = editProfileInputName.value;
  editProfileProfileOccupation.textContent = editProfileInputOccupation.value;
  popupClose(editProfileEditWindow);
}

function editProfileFormDataHandler() {
  editProfileInputName.value = editProfileProfileName.textContent;
  editProfileInputOccupation.value = editProfileProfileOccupation.textContent;
  validationEditProfileForm.resetValidation(editProfileInputName, editProfileInputOccupation);
}

function popupOpen(elem) {
  elem.classList.add('popup_open');
  document.addEventListener('keydown', escKeyDown);
  document.addEventListener('click', popupOverlayClick);
}

function popupClose(elem) {
  elem.classList.remove('popup_open');
  document.removeEventListener('keydown', escKeyDown);
  document.removeEventListener('click', popupOverlayClick);
}

function escKeyDown(evt) {
  const opened = document.querySelector('.popup_open');
  if ((evt.key === 'Escape') && opened) {
    popupClose(opened);
  }
}

function popupOverlayClick(evt) {
  const opened = document.querySelector('.popup_open');
  if (evt.target.classList.contains('popup_open') && opened) {
    popupClose(opened);
  }
}

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
editProfileEditBtn.addEventListener('click', () => {
  editProfileFormDataHandler();
  popupOpen(editProfileEditWindow);
});

editProfileCloseBtn.addEventListener('click', () => {
  popupClose(editProfileEditWindow);
});

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card(addCardInputName.value, addCardInputLink.value, '#cardPlace');
  const cardElement = card.getCardElement();
  addCardCardImageWrapper.prepend(cardElement);
  popupClose(addCardWindow);
}

function addCardFormDataHandler() {
  addCardInputName.value = '';
  addCardInputLink.value = '';
  validationAddCardForm.resetValidation(addCardInputName, addCardInputLink)
}

//add event listeners for open/close addCard window and form addCard
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
addCardAddBtn.addEventListener('click', () => {
  addCardFormDataHandler();
  popupOpen(addCardWindow);
});

addCardCloseBtn.addEventListener('click', () => {
  popupClose(addCardWindow);
});

const validationEditProfileForm = new FormValidator(formValidationOptions, editProfileForm);
validationEditProfileForm.enableValidation();
const validationAddCardForm = new FormValidator(formValidationOptions, addCardForm);
validationAddCardForm.enableValidation();

addCardInitialCards.forEach((elem) => {
  const card = new Card(elem.name, elem.link, '#cardPlace');
  const cardElement = card.getCardElement();
  addCardCardImageWrapper.prepend(cardElement);
});


