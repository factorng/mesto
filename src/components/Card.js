export class Card {
  constructor(data, userId, templateCardSelector,
    {handleCardClick, handleCardDelete, handleLikeAdd, handleLikeRemove}) {
    this._name = data.name;
    this._link = data.link;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeRemove = handleLikeRemove;
    this._like = data.likes.length;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
  }

  _getCardTemplate() {
    return document
    .querySelector(this._templateCardSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);
  }

  _pressLike() {
    const buttonLike = this._cardElement.querySelector('.place__button-like');
    const like = this._cardElement.querySelector('.place__like-count');
    if(buttonLike.classList.contains('place__button-like_active')) {
      this._handleLikeRemove(this._cardId)
        .then((data) => {
          this._like = data.likes.length;
          buttonLike.classList.remove('place__button-like_active');
          like.innerText = this._like;
        });
    }
    else {
      this._handleLikeAdd(this._cardId)
        .then((data) => {
          this._like = data.likes.length;
          buttonLike.classList.add('place__button-like_active');
          like.innerText = this._like;
        });
      }
  }

  _setEventListeners() {
    this._cardElement.querySelector('.place__button-delete').addEventListener('click', () =>{
      this._handleCardDelete(this._cardId);
    });
    this._cardElement.querySelector('.place__button-like').addEventListener('click', () => {
      this._pressLike();
    });
    this._cardElement.querySelector('.place__image').addEventListener('click', () =>{
      this._handleCardClick();
    });
  }

  getCardElement() {
    this._cardElement = this._getCardTemplate();
    const image = this._cardElement.querySelector('.place__image');
    const title = this._cardElement.querySelector('.place__title');
    const like = this._cardElement.querySelector('.place__like-count');
    const deleteButton = this._cardElement.querySelector('.place__button-delete');
    if(this._ownerId !== this._userId) {
      deleteButton.style.visibility = "hidden";
    }
    title.innerText = this._name;
    image.alt = this._name;
    image.src = this._link;
    like.innerText = this._like;
    this._cardElement.id = this._cardId;
    this._setEventListeners();
    return this._cardElement;
  }
}
