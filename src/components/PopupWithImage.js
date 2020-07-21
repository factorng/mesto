import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._image = imageSelector;
    this._title = titleSelector;
  }
  open(item) {
    this._image.src = item.link;
    this._image.alt = item.name;
    this._title.textContent = item.name;
    super.open();
  }
  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleOverlayClose.bind(this));
    this._popupSelector.querySelector('.show-photo__button-close').addEventListener('click', this.close.bind(this), {once : true});
  }
}

