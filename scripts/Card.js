export class Card {
  constructor(name, link, templateCardSelector) {
    this._name = name;
    this._link = link;
    this._templateCardSelector = templateCardSelector;
    this._cardElement = document
    .querySelector(this._templateCardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
  }
  _pressLike() {
    this._cardElement.querySelector('.place__button-like').classList.toggle('place__button-like_active');
  }
  _setEventListeners() {
    this._cardElement.querySelector('.place__button-delete').addEventListener('click', () =>{
       this._cardElement.remove();
    }, {once : true} );
    this._cardElement.querySelector('.place__button-like').addEventListener('click', () => {
      this._pressLike();
    });
    this._cardElement.querySelector('.place__image').addEventListener('click', () =>{
      this._showFullImage();
    });
  }
  _showFullImage() {
    const showPhotoWindow = document.querySelector('.show-photo');
    showPhotoWindow.querySelector('.show-photo__image').src = this._cardElement.querySelector('.place__image').src;
    showPhotoWindow.querySelector('.show-photo__title').innerText = this._cardElement.querySelector('.place__title').innerText;
    showPhotoWindow.classList.add('popup_open');
    const opened = document.querySelector('.popup_open');
    document.addEventListener('keydown', (evt) => {
      if((evt.key === 'Escape') && opened) {
         this._closeFullImage();
       }
      }, {once: true});

    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_open') && opened)  {
        this._closeFullImage();
      }
    });
    showPhotoWindow.querySelector('.show-photo__button-close').addEventListener('click', (evt) => {
      this._closeFullImage();
    }, {once: true});
  }
  _closeFullImage() {
    const showPhotoWindow = document.querySelector('.show-photo');
    showPhotoWindow.classList.remove('popup_open');
  }
  getCardElement() {
    const image = this._cardElement.querySelector('.place__image');
    const title = this._cardElement.querySelector('.place__title');
    title.innerText = this._name;
    image.alt = this._name;
    image.src = this._link;
    this._setEventListeners();
    return this._cardElement;
  }
}
