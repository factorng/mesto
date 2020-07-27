import './index.css';
import {Popup} from '../components/Popup.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {formValidationOptions} from '../utils/constants.js';
import {Api} from '../components/Api.js';
import {progress} from '../utils/utils.js';


const api = new Api({url: 'https://mesto.nomoreparties.co/v1/cohort-13', auth: 'bb89f9dd-ceae-40c2-90a7-950f4a7ba36d'});
//editProfile globals
const editProfileEditBtn = document.querySelector('.profile__edit-button');
const editProfileEditWindow = document.querySelector('.edit-profile');
const editProfileInputName = document.querySelector('.edit-profile__input-name');
const editProfileInputOccupation = document.querySelector('.edit-profile__input-occupation');
const editProfileForm = document.querySelector('.edit-profile__form');
const profileAvatar = document.querySelector('.profile__avatar-hover');
const changeAvatarForm = document.querySelector('.change-avatar__form');
const changeAvatarWindow = document.querySelector('.change-avatar');
const changeAvatarInput = document.querySelector('.change-avatar__input-link');

//addCard globals
const addCardForm = document.querySelector('.add-card__form');
const addCardWindow = document.querySelector('.add-card');
const addCardAddBtn = document.querySelector('.profile__add-button');
const addCardCardImageWrapper = document.querySelector('.places');
const addCardInputName = document.querySelector('.add-card__input-name');
const addCardInputLink = document.querySelector('.add-card__input-link');

//show photo globals
const showPhotoWindow = document.querySelector('.show-photo');

//confirmation globals
const confirmationForm = document.querySelector('.confirmation');

const confirmDelete = new Popup(confirmationForm);

function cardDeleteWithConfirmation(card) {
  confirmDelete.open();
  document.querySelector('.confirmation__form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    confirmDelete.close();
    api.deleteCard(card._cardId)
      .then(() => {
        card._cardElement.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  }, {once: true});
}

const userInfo = new UserInfo({name: '.profile__name', occupation: '.profile__occupation', avatar: '.profile__logo'});
api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .then(() => {
    api.getInitialCards().then(cards => {
      cardsList.renderAllItems(cards.reverse());
    });
  })
  .catch((error) => {
    console.log(error);
  });

const editPrfl = new PopupWithForm(editProfileEditWindow, {
  submitForm: (item) => {
    progress(editProfileEditWindow, true, 'Сохранить');
    api.updateUserProfile(item.name, item.occupation)
      .then((res) =>{
        userInfo.setUserInfo(res);
        editPrfl.close();
        progress(editProfileEditWindow, false, 'Сохранить');
      });
  }
});



const cardsList = new Section({
  renderer: (item) => {
    const card = new Card(item, userInfo.getUserId(), '#cardPlace', {
      handleCardClick: () => {
        popupWithImage.open(item);
      },
      handleCardDelete:(card) => {
        cardDeleteWithConfirmation(card);
      },
      handleLikeAdd: api.putLike.bind(api),
      handleLikeRemove: api.removeLike.bind(api)
    });
    cardsList.addItem(card.getCardElement());
  }
},
  addCardCardImageWrapper
);

editProfileEditBtn.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  validationEditProfileForm.resetValidation(editProfileInputName, editProfileInputOccupation);
  editProfileInputName.value = userData.name;
  editProfileInputOccupation.value = userData.occupation;
  editPrfl.open();
});

const changeAvatar = new PopupWithForm(changeAvatarWindow, {
  submitForm: (item) => {
      progress(changeAvatarWindow, true, 'Сохранить');
      api.setUserAvatar(item.link)
        .then((res) => {
          userInfo.setUserInfo(res);
          changeAvatar.close();
          progress(changeAvatarWindow, false, 'Сохранить');
        })
        .catch((error) => {
          console.log(error);
        });
  }
});


profileAvatar.addEventListener('click', () => {
  validationChangeAvatarForm.resetValidation(changeAvatarInput);
  changeAvatar.open();
});

const addCardFormClass = new PopupWithForm(addCardWindow, {
  submitForm:  (item) => {
    progress(addCardWindow, true, 'Создать');
    api.addNewCard(item.name, item.link)
      .then((res) => {
        const card = new Card(res, userInfo.getUserId(), '#cardPlace', {
          handleCardClick: () => {
            popupWithImage.open(item);
          },
          handleCardDelete:(card) => {
            cardDeleteWithConfirmation(card);
          },
          handleLikeAdd: api.putLike.bind(api),
          handleLikeRemove: api.removeLike.bind(api)
        });
        cardsList.addItem(card.getCardElement());
        addCardFormClass.close();
        progress(addCardWindow, false, 'Создать');
      })
      .catch((error) => {
          console.log(error);
      });
    }
});


addCardAddBtn.addEventListener('click', () => {
  validationAddCardForm.resetValidation(addCardInputName, addCardInputLink);
  addCardFormClass.open();
});

const popupWithImage = new PopupWithImage(showPhotoWindow,
  showPhotoWindow.querySelector('.show-photo__image'), showPhotoWindow.querySelector('.show-photo__title') );

const validationEditProfileForm = new FormValidator(formValidationOptions, editProfileForm);
validationEditProfileForm.enableValidation();
const validationAddCardForm = new FormValidator(formValidationOptions, addCardForm);
validationAddCardForm.enableValidation();
const validationChangeAvatarForm = new FormValidator(formValidationOptions, changeAvatarForm);
validationChangeAvatarForm.enableValidation();
