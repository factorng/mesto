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
    super.setEventListeners();
  }
}

