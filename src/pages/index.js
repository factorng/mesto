import './index.css';

import {addCardInitialCards} from '../scripts/initialCards.js';
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';
import {PopupWithImage} from '../scripts/PopupWithImage.js';
import {PopupWithForm} from '../scripts/PopupWithForm.js';
import {UserInfo} from '../scripts/UserInfo.js';
import {Section} from '../scripts/Section.js';
import {formValidationOptions} from '../scripts/constants.js';


//editProfile globals
const editProfileCloseBtn = document.querySelector('.popup__button-close');
const editProfileEditBtn = document.querySelector('.profile__edit-button');
const editProfileEditWindow = document.querySelector('.edit-profile');
const editProfileInputName = document.querySelector('.edit-profile__input-name');
const editProfileInputOccupation = document.querySelector('.edit-profile__input-occupation');
const editProfileForm = document.querySelector('.edit-profile__form');

//addCard globals
const addCardForm = document.querySelector('.add-card__form');
const addCardWindow = document.querySelector('.add-card');
const addCardAddBtn = document.querySelector('.profile__add-button');
const addCardCardImageWrapper = document.querySelector('.places');
const addCardInputName = document.querySelector('.add-card__input-name');
const addCardInputLink = document.querySelector('.add-card__input-link');

//show photo globals
const showPhotoWindow = document.querySelector('.show-photo');


const userInfo = new UserInfo({name: '.profile__name', occupation: '.profile__occupation'});
const editPrfl = new PopupWithForm(editProfileEditWindow, {
  submitForm: (item) => {
    userInfo.setUserInfo(item);
  }
});
editPrfl.setEventListeners();

editProfileEditBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  validationEditProfileForm.resetValidation(editProfileInputName, editProfileInputOccupation);
  editProfileInputName.value = userData.name;
  editProfileInputOccupation.value = userData.occupation;
  editPrfl.open();
});

const addCardFormClass = new PopupWithForm(addCardWindow, {
  submitForm:  (item) => {
    const card = new Card(item.name, item.link, '#cardPlace', {
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    });
    CardsList.addItem(card.getCardElement());
  }
});
addCardFormClass.setEventListeners();

addCardAddBtn.addEventListener('click', () => {
  validationAddCardForm.resetValidation(addCardInputName, addCardInputLink);
  addCardFormClass.open();
});

const popupWithImage = new PopupWithImage(showPhotoWindow, showPhotoWindow.querySelector('.show-photo__image'), showPhotoWindow.querySelector('.show-photo__title') );
const CardsList = new Section({
  items: addCardInitialCards, renderer: (item) => {
    const card = new Card(item.name, item.link, '#cardPlace', {
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    });
    CardsList.addItem(card.getCardElement());
  }
},
  addCardCardImageWrapper
);
CardsList.renderAllItems();
const validationEditProfileForm = new FormValidator(formValidationOptions, editProfileForm);
validationEditProfileForm.enableValidation();
const validationAddCardForm = new FormValidator(formValidationOptions, addCardForm);
validationAddCardForm.enableValidation();
