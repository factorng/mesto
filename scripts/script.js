const editProfile = {
  close_btn: document.querySelector('.popup__button-close'),
  edit_btn: document.querySelector('.profile__edit-button'),
  save_btn: document.querySelector('.edit-profile__button-submit'),
  edit_window: document.querySelector('.edit-profile'),
  profile_name: document.querySelector('.profile__name'),
  profile_occupation: document.querySelector('.profile__occupation'),
  input_name: document.querySelector('.edit-profile__input-name'),
  input_occupation: document.querySelector('.edit-profile__input-occupation'),
  form: document.querySelector('.edit-profile__form'),
  formSubmitHandler: function(evt) {
    evt.preventDefault();
    editProfile.profile_name.textContent = editProfile.input_name.value;
    editProfile.profile_occupation.textContent = editProfile.input_occupation.value;
    editProfile.formToggle();
  },
  formToggle: function() {
    if(!editProfile.edit_window.classList.contains('popup_open')) {
      editProfile.input_name.value = editProfile.profile_name.textContent;
      editProfile.input_occupation.value = editProfile.profile_occupation.textContent;
    }
    editProfile.edit_window.classList.toggle('popup_open');
  },
};
editProfile.form.addEventListener('submit', editProfile.formSubmitHandler);
editProfile.edit_btn.addEventListener('click', editProfile.formToggle);
editProfile.close_btn.addEventListener('click', editProfile.formToggle);

const addCard = {
  form: document.querySelector('.add-card__form'),
  window: document.querySelector('.add-card'),
  add_btn: document.querySelector('.profile__add-button'),
  close_btn: document.querySelector('.add-card__button-close'),
  cardImageWrapper: document.querySelector('.places'),
  cardImageTemplate: document.querySelector('#cardPlace').content,
  inputName: document.querySelector('.add-card__input-name'),
  inputLink: document.querySelector('.add-card__input-link'),
  initialCards: [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        like: 0
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        like: 0
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        like: 0
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        like: 0
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        like: 0
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        like: 0
    }
  ],
  formSubmitHandler: function(evt) {
    evt.preventDefault();
    let addObj = {};
    addObj.name = addCard.inputName.value;
    addObj.link = addCard.inputLink.value;
    addObj.like = 0;
    addCard.initialCards.unshift(addObj);
    addCard.toggleForm();
    addCard.showCards();
    addCard.inputName.value = '';
    addCard.inputLink.value = '';
  },
  toggleForm: function() {
    addCard.window.classList.toggle('popup_open');
  },
  showCards: function() {
    addCard.cardImageWrapper.querySelectorAll('*').forEach(elem => elem.remove());
    addCard.initialCards.forEach((elem) => {
      let cardImage = addCard.cardImageTemplate.cloneNode(true);
      cardImage.querySelector('.place__title').innerText = elem.name;
      cardImage.querySelector('.place__image').alt = elem.name;
      cardImage.querySelector('.place__image').src = elem.link;
      if(elem.like == 1){
        cardImage.querySelector('.place__button-like').className += ' place__button-like_active';
      }
      addCard.cardImageWrapper.append(cardImage);
    });
  },
};
addCard.form.addEventListener('submit', addCard.formSubmitHandler);
addCard.add_btn.addEventListener('click', addCard.toggleForm);
addCard.close_btn.addEventListener('click', addCard.toggleForm);


const showPhoto = {
  close_btn: document.querySelector('.show-photo__button-close'),
  window: document.querySelector('.show-photo'),
  showPhoto: function(evt) {
    showPhoto.window.classList.toggle('show-photo_active');
    showPhoto.window.querySelector('.show-photo__image').src = evt.target.src;
    showPhoto.window.querySelector('.show-photo__title').innerText = evt.target.parentElement.querySelector('.place__title').innerText;
  }
};
 showPhoto.close_btn.addEventListener('click', (evt) => {
  showPhoto.window.classList.toggle('show-photo_active');
 });

 function toggleLike(evt) {
   evt.target.classList.toggle('place__button-like_active');
   addCard.initialCards.forEach((elem, i, arr) => {
    if(elem.name == evt.target.parentElement.querySelector('.place__title').innerText) {
      elem.like = 1;
    }
   });
 }
 addCard.cardImageWrapper.addEventListener('click', (evt) => {
  if(evt.target.className == 'place__button-delete') {
    evt.target.parentElement.remove();
    let cardToDelete = addCard.initialCards.find((el) => el.name == evt.target.parentElement.querySelector('.place__title').innerText);
    addCard.initialCards.splice(addCard.initialCards.indexOf(cardToDelete), 1);
  }
  if(evt.target.classList.contains('place__button-like')) {
    toggleLike(evt);
    console.log(evt.target.parentElement.querySelector('.place__title').innerText);
  }
  if(evt.target.className == 'place__image') {
    showPhoto.showPhoto(evt);
  }
});

window.onload = function() {
  addCard.showCards();
};
