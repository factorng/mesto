const editProfile = {
  closeBtn: document.querySelector('.popup__button-close'),
  editBtn: document.querySelector('.profile__edit-button'),
  saveBtn: document.querySelector('.edit-profile__button-submit'),
  editWindow: document.querySelector('.edit-profile'),
  profileName: document.querySelector('.profile__name'),
  profileOccupation: document.querySelector('.profile__occupation'),
  inputName: document.querySelector('.edit-profile__input-name'),
  inputOccupation: document.querySelector('.edit-profile__input-occupation'),
  form: document.querySelector('.edit-profile__form'),
  formSubmitHandler: function(evt) {
    evt.preventDefault();
    editProfile.profileName.textContent = editProfile.inputName.value;
    editProfile.profileOccupation.textContent = editProfile.inputOccupation.value;
    editProfile.formToggle();
  },
  formToggle: function() {
    if(!editProfile.editWindow.classList.contains('popup_open')) {
      editProfile.inputName.value = editProfile.profileName.textContent;
      editProfile.inputOccupation.value = editProfile.profileOccupation.textContent;
    }
    editProfile.popupToggle(editProfile.editWindow);
  },
  popupToggle: function(elem) {
    elem.classList.toggle('popup_open');
  }
};
editProfile.form.addEventListener('submit', editProfile.formSubmitHandler);
editProfile.editBtn.addEventListener('click', editProfile.formToggle);
editProfile.closeBtn.addEventListener('click', editProfile.formToggle);

const addCard = {
  form: document.querySelector('.add-card__form'),
  window: document.querySelector('.add-card'),
  addBtn: document.querySelector('.profile__add-button'),
  closeBtn: document.querySelector('.add-card__button-close'),
  cardImageWrapper: document.querySelector('.places'),
  cardImageTemplate: document.querySelector('#cardPlace').content,
  inputName: document.querySelector('.add-card__input-name'),
  inputLink: document.querySelector('.add-card__input-link'),
  initialCards: [
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
  ],
  formSubmitHandler: function(evt) {
    evt.preventDefault();
    addCard.showCard(addCard.inputName.value, addCard.inputLink.value, 'begin');
    addCard.toggleForm();
  },
  toggleForm: function() {
    editProfile.popupToggle(addCard.window);
    addCard.inputName.value = '';
    addCard.inputLink.value = '';
  },
  showCard: function(name, link, endBeginAdd = 'begin') {
    const cardImage = addCard.cardImageTemplate.cloneNode(true);
    cardImage.querySelector('.place__title').innerText = name;
    cardImage.querySelector('.place__image').alt = name;
    cardImage.querySelector('.place__image').src = link;
    if(endBeginAdd === 'begin'){
      addCard.cardImageWrapper.prepend(cardImage);
    }else if(endBeginAdd === 'end') {
      addCard.cardImageWrapper.append(cardImage);
    }
  }
};
addCard.form.addEventListener('submit', addCard.formSubmitHandler);
addCard.addBtn.addEventListener('click', addCard.toggleForm);
addCard.closeBtn.addEventListener('click', addCard.toggleForm);


const showPhoto = {
  closeBtn: document.querySelector('.show-photo__button-close'),
  window: document.querySelector('.show-photo'),
  showPhoto: function(evt) {
    showPhoto.window.classList.toggle('show-photo_active');
    showPhoto.window.querySelector('.show-photo__image').src = evt.target.src;
    showPhoto.window.querySelector('.show-photo__title').innerText = evt.target.parentElement.querySelector('.place__title').innerText;
  }
};
 showPhoto.closeBtn.addEventListener('click', (evt) => {
  showPhoto.window.classList.toggle('show-photo_active');
 });

 function toggleLike(evt) {
   evt.target.classList.toggle('place__button-like_active');
 }
 addCard.cardImageWrapper.addEventListener('click', (evt) => {
  if(evt.target.className == 'place__button-delete') {
    evt.target.parentElement.remove();
  }
  if(evt.target.classList.contains('place__button-like')) {
    toggleLike(evt);
  }
  if(evt.target.className == 'place__image') {
    showPhoto.showPhoto(evt);
  }
});

window.onload = function() {
  addCard.initialCards.forEach((elem) => {
    addCard.showCard(elem.name, elem.link, 'end');
  });

};
