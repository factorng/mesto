import {Popup} from './Popup.js';
import {formSelectors} from '../utils/constants.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {submitForm}) {
    super(popupSelector);
    this._submitForm = submitForm.bind(this);
    this._inputList = this._popupSelector.querySelectorAll(formSelectors.inputSelector);
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    }, {once: true});
  }
  close() {
    super.close();
    this._inputList.forEach(input => {
      input.value = '';
    });
  }

}
