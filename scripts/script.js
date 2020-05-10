const close_btn = document.querySelector('.edit-profile__button-close');
const form = document.querySelector('.edit-profile__form');
const save_btn = document.querySelector('.edit-profile__button-submit');
const edit_window = document.querySelector('.edit-profile');
const profile_name = this.document.querySelector('.profile__name');
const profile_occupation = this.document.querySelector('.profile__occupation');
const input_name = this.document.querySelector('.edit-profile__input-name');
const input_occupation = this.document.querySelector('.edit-profile__input-occupation');
const edit_btn = this.document.querySelector('.profile__edit-button');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profile_name.textContent = input_name.value;
  profile_occupation.textContent = input_occupation.value;
  toggleForm();
}
form.addEventListener('submit', formSubmitHandler);

function toggleForm() {
  edit_window.classList.toggle('edit-profile_open');
}

edit_btn.addEventListener('click', toggleForm);
close_btn.addEventListener('click', function () {
  form.reset();
  toggleForm();
});
