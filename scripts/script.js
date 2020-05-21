const close_btn = document.querySelector('.popup__button-close');
const form = document.querySelector('.edit-profile__form');
const save_btn = document.querySelector('.edit-profile__button-submit');
const edit_window = document.querySelector('.edit-profile');
const profile_name = document.querySelector('.profile__name');
const profile_occupation = document.querySelector('.profile__occupation');
const input_name = document.querySelector('.edit-profile__input-name');
const input_occupation = document.querySelector('.edit-profile__input-occupation');
const edit_btn = document.querySelector('.profile__edit-button');

const addCardForm = document.querySelector('.add-card__form');
const addCardForm_window = document.querySelector('.add-card');
const addCardForm_add_btn = document.querySelector('.profile__add-button');
const addCardForm_close_btn = document.querySelector('.add-card__button-close');
const cardImageWrapper = document.querySelector('.places');
const cardImageTemplate = document.querySelector('#cardPlace').content;
const addCardInputName = document.querySelector('.add-card__input-name');
const addCardInputLink = document.querySelector('.add-card__input-link');
const showPhotoWindow = document.querySelector('.show-photo');
const showPhotoWindow_close_btn = document.querySelector('.show-photo__button-close');
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function formSubmitHandler(evt) {
  evt.preventDefault();
  profile_name.textContent = input_name.value;
  profile_occupation.textContent = input_occupation.value;
  toggleForm();
}
form.addEventListener('submit', formSubmitHandler);

function toggleForm() {
  if(!edit_window.classList.contains('popup_open')) {
    input_name.value = profile_name.textContent;
    input_occupation.value = profile_occupation.textContent;
  }
  edit_window.classList.toggle('popup_open');
}
edit_btn.addEventListener('click', toggleForm);
close_btn.addEventListener('click', toggleForm);

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  let addObj = {};
  addObj.name = addCardInputName.value;
  addObj.link = addCardInputLink.value;
  initialCards.unshift(addObj);
  toggleAddCardForm();
  showCards();
  addCardInputName.value = '';
  addCardInputLink.value = '';
}
addCardForm.addEventListener('submit', addCardFormSubmitHandler);

function toggleAddCardForm() {
   addCardForm_window.classList.toggle('popup_open');
}

function showCards() {
  cardImageWrapper.querySelectorAll('*').forEach(elem => elem.remove());
  initialCards.forEach((elem) => {
    let cardImage = cardImageTemplate.cloneNode(true);
    cardImage.querySelector('.place__title').innerText = elem.name;
    cardImage.querySelector('.place__image').alt = elem.name;
    cardImage.querySelector('.place__image').src = elem.link;
    cardImageWrapper.append(cardImage);
  });
}
addCardForm_add_btn.addEventListener('click', toggleAddCardForm);
addCardForm_close_btn.addEventListener('click', toggleAddCardForm);
cardImageWrapper.addEventListener('click', (evt) => {
  if(evt.target.className == 'place__button-delete') {
    evt.target.parentElement.remove();
    let cardToDelete = initialCards.find((el) => el.name == evt.target.parentElement.querySelector('.place__title').innerText);
    initialCards.splice(initialCards.indexOf(cardToDelete), 1);
  }
  if(evt.target.classList.contains('place__button-like')) {
    toggleLike(evt);
  }
  if(evt.target.className == 'place__image') {
    showPhoto(evt);
  }
});
showPhotoWindow_close_btn.addEventListener('click', (evt) => {
  showPhotoWindow.classList.toggle('show-photo_active');
});
function toggleLike(evt) {
  evt.target.classList.toggle('place__button-like_active');
}
function showPhoto(evt) {
  showPhotoWindow.classList.toggle('show-photo_active');
  showPhotoWindow.querySelector('.show-photo__image').src = evt.target.src;
  showPhotoWindow.querySelector('.show-photo__title').innerText = evt.target.parentElement.querySelector('.place__title').innerText;
}
window.onload = function() {
  showCards();
};
