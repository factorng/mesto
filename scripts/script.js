const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
enableValidation(formValidationOptions);

  const editProfileCloseBtn = document.querySelector('.popup__button-close');
  const editProfileEditBtn = document.querySelector('.profile__edit-button');
  const editProfileSaveBtn = document.querySelector('.edit-profile__button-submit');
  const editProfileEditWindow = document.querySelector('.edit-profile');
  const editProfileProfileName = document.querySelector('.profile__name');
  const editProfileProfileOccupation = document.querySelector('.profile__occupation');
  const editProfileInputName = document.querySelector('.edit-profile__input-name');
  const editProfileInputOccupation = document.querySelector('.edit-profile__input-occupation');
  const editProfileForm = document.querySelector('.edit-profile__form');

  function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    editProfileProfileName.textContent = editProfileInputName.value;
    editProfileProfileOccupation.textContent = editProfileInputOccupation.value;
    popupClose(editProfileEditWindow);
  }

  function editProfileFormDataHandler() {
    editProfileInputName.value = editProfileProfileName.textContent;
    editProfileInputOccupation.value = editProfileProfileOccupation.textContent;
    isValid(editProfileForm, editProfileInputName, formValidationOptions);
    isValid(editProfileForm, editProfileInputOccupation, formValidationOptions);
    toggleButtonState(editProfileForm, formValidationOptions);
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

  function escKeyDown(evt){
    const opened = document.querySelector('.popup_open');
    if(evt.key === 'Escape') {
      if(opened)
        popupClose(opened);
    }
  }
  function popupOverlayClick(evt) {
    const opened = document.querySelector('.popup_open');
    if(evt.target.classList.contains('popup_open')) {
      if(opened)
        popupClose(opened);
    }
  }

  editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
  editProfileEditBtn.addEventListener('click', ()=>{
    editProfileFormDataHandler();
    popupOpen(editProfileEditWindow);
  });
  editProfileCloseBtn.addEventListener('click', ()=>{
    popupClose(editProfileEditWindow);
  });


  const addCardForm = document.querySelector('.add-card__form');
  const addCardWindow = document.querySelector('.add-card');
  const addCardAddBtn = document.querySelector('.profile__add-button');
  const addCardCloseBtn = document.querySelector('.add-card__button-close');
  const addCardCardImageWrapper = document.querySelector('.places');
  const addCardCardImageTemplate = document.querySelector('#cardPlace').content;
  const addCardInputName = document.querySelector('.add-card__input-name');
  const addCardInputLink = document.querySelector('.add-card__input-link');
  const addCardInitialCards = [{
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

  function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    addCardShowCard(addCardInputName.value, addCardInputLink.value, 'begin');
    popupClose(addCardWindow);
  }

  function addCardFormDataHandler() {
    addCardInputName.value = '';
    addCardInputLink.value = '';
    hideInputError(addCardForm, addCardInputName, formValidationOptions);
    hideInputError(addCardForm, addCardInputLink, formValidationOptions);
    toggleButtonState(addCardForm, formValidationOptions);
  }

  function addCardShowCard(name, link, endBeginAdd = 'begin') {
    const cardImage = addCardCardImageTemplate.cloneNode(true);
    cardImage.querySelector('.place__title').innerText = name;
    cardImage.querySelector('.place__image').alt = name;
    cardImage.querySelector('.place__image').src = link;
    cardImage.querySelector('.place__button-delete').addEventListener('click', addCardDeleteCard);
    cardImage.querySelector('.place__button-like').addEventListener('click', toggleLike);
    cardImage.querySelector('.place__image').addEventListener('click', showPhoto);
    if (endBeginAdd === 'begin') {
      addCardCardImageWrapper.prepend(cardImage);
    } else if (endBeginAdd === 'end') {
      addCardCardImageWrapper.append(cardImage);
    }
  }

  function addCardDeleteCard(evt) {
    evt.target.parentElement.querySelector('.place__button-delete').removeEventListener('click', addCardDeleteCard);
    evt.target.parentElement.querySelector('.place__button-like').removeEventListener('click', toggleLike);
    evt.target.parentElement.querySelector('.place__image').removeEventListener('click', showPhoto);
    evt.target.parentElement.remove();
  }

  function toggleLike(evt) {
    evt.target.classList.toggle('place__button-like_active');
  }

  //add event listeners for open/close addCard window and form addCard
  addCardForm.addEventListener('submit', addCardFormSubmitHandler);
  addCardAddBtn.addEventListener('click', ()=>{
    addCardFormDataHandler();
    popupOpen(addCardWindow);
  });
  addCardCloseBtn.addEventListener('click', ()=>{
    popupClose(addCardWindow);
  });
// Photo popup
  const showPhotoCloseBtn = document.querySelector('.show-photo__button-close');
  const showPhotoWindow = document.querySelector('.show-photo');

  function showPhoto(evt) {
    popupOpen(showPhotoWindow);
    showPhotoWindow.querySelector('.show-photo__image').src = evt.target.src;
    showPhotoWindow.querySelector('.show-photo__title').innerText = evt.target.parentElement.querySelector('.place__title').innerText;
  }
  showPhotoCloseBtn.addEventListener('click', (evt) => {
    popupClose(showPhotoWindow);;
  });


  window.onload = function () {
    addCardInitialCards.forEach((elem) => {
      addCardShowCard(elem.name, elem.link, 'end');
    });

  };
