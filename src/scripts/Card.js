export class Card {
  constructor(name, link, templateCardSelector, {handleCardClick}) {
    this._name = name;
    this._link = link;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    return document
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
       this._cardDelete();
    });
    this._cardElement.querySelector('.place__button-like').addEventListener('click', () => {
      this._pressLike();
    });
    this._cardElement.querySelector('.place__image').addEventListener('click', () =>{
      this._handleCardClick();
    });
  }

  _cardDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardElement() {
    this._cardElement = this._getCardTemplate();
    const image = this._cardElement.querySelector('.place__image');
    const title = this._cardElement.querySelector('.place__title');
    title.innerText = this._name;
    image.alt = this._name;
    image.src = this._link;
    this._setEventListeners();
    return this._cardElement;
  }
}
