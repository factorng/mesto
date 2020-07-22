export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add('popup_open');
    this.setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove('popup_open');
    this.removeEventListeners();
  }
  _handleEscClose(evt) {
    const opened = this._popupSelector.classList.contains('popup_open');
    if ((evt.key === 'Escape') && opened) {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    const opened = this._popupSelector.classList.contains('popup_open');
    if (evt.target.classList.contains('popup_open') && opened) {
      this.close();
    }
  }
  _handleButtonClose()  {
    this.close();
  }
  setEventListeners() {
    this._escClose = this._handleEscClose.bind(this);
    this._overlayClose = this._handleOverlayClose.bind(this);
    this._buttonClose = this._handleButtonClose.bind(this);
    document.addEventListener('keydown', this._escClose);
    document.addEventListener('click', this._overlayClose);
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', this._buttonClose);
  }
  removeEventListeners() {
    document.removeEventListener('keydown', this._escClose);
    document.removeEventListener('click', this._overlayClose);
    this._popupSelector.querySelector('.popup__button-close').removeEventListener('click', this._buttonClose);
  }
}
