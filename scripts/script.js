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
    popupClose(editProfileEditWindow, editProfileFormDataHandler);
  }

  function editProfileFormDataHandler() {
    editProfileInputName.value = editProfileProfileName.textContent;
    editProfileInputOccupation.value = editProfileProfileOccupation.textContent;
  }


  function popupOpen(elem, form) {
    elem.classList.add('popup_open');
    document.addEventListener('keydown', escKeyDown);
    document.addEventListener('click', popupOverlayClick);
    if(form) form();
  }
  function popupClose(elem, form) {
    elem.classList.remove('popup_open');
    document.removeEventListener('keydown', escKeyDown);
    document.removeEventListener('click', popupOverlayClick);
    if(form) form();
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
    popupOpen(editProfileEditWindow, editProfileFormDataHandler);
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
    popupClose(addCardWindow, addCardFormDataHandler);
  }

  function addCardFormDataHandler() {
    addCardInputName.value = '';
    addCardInputLink.value = '';
  }

  function addCardShowCard(name, link, endBeginAdd = 'begin') {
    const cardImage = addCardCardImageTemplate.cloneNode(true);
    cardImage.querySelector('.place__title').innerText = name;
    cardImage.querySelector('.place__image').alt = name;
    cardImage.querySelector('.place__image').src = link;
    cardImage.querySelector('.place__button-delete').addEventListener('click', (evt) => {
      evt.target.parentElement.remove();
    });
    cardImage.querySelector('.place__button-like').addEventListener('click', (evt) => {
      toggleLike(evt);
    });
    cardImage.querySelector('.place__image').addEventListener('click', (evt) => {
      showPhoto(evt);
    });
    if (endBeginAdd === 'begin') {
      addCardCardImageWrapper.prepend(cardImage);
    } else if (endBeginAdd === 'end') {
      addCardCardImageWrapper.append(cardImage);
    }
  }
  //add event listeners for open/close addCard window and form addCard
  addCardForm.addEventListener('submit', addCardFormSubmitHandler);
  addCardAddBtn.addEventListener('click', ()=>{
    popupOpen(addCardWindow, addCardFormDataHandler);
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

  function toggleLike(evt) {
    evt.target.classList.toggle('place__button-like_active');
  }


  window.onload = function () {
    addCardInitialCards.forEach((elem) => {
      addCardShowCard(elem.name, elem.link, 'end');
    });

  };
