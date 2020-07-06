export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add('popup_open');
  }
  close() {
    this._popupSelector.classList.remove('popup_open');
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
  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleOverlayClose.bind(this));
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', this.close.bind(this)); //do ones
  }
}
