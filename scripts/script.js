window.onload = function(e) {
  const close_btn = document.querySelector('.edit-profile__button-close');
  const form = document.querySelector('.edit-profile__form');
  const save_btn = document.querySelector('.edit-profile__button-submit');
  const overlay = document.querySelector('.edit-profile');
  const profile_name = this.document.querySelector('.profile__name');
  const profile_occupation = this.document.querySelector('.profile__occupation');
  const input_name = this.document.querySelector('.edit-profile__input-name');
  const input_occupation = this.document.querySelector('.edit-profile__input-occupation');
  const edit_btn = this.document.querySelector('.profile__edit-button');

  function formSubmitHandler (evt) {
      evt.preventDefault();
      profile_name.textContent = input_name.value;
      profile_occupation.textContent = input_occupation.value;
      toggleForm();
  }
  form.addEventListener('submit', formSubmitHandler);

  function toggleForm() {
    if(form.style.visibility == 'visible' && overlay.style.visibility == 'visible') {
      form.style.visibility = 'hidden';
      overlay.style.visibility = 'hidden';
    } else {
      form.classList.add('animate_show');
      form.style.visibility = 'visible';
      overlay.style.visibility = 'visible';
    }
  }
  edit_btn.addEventListener('click', toggleForm);
  close_btn.addEventListener('click', toggleForm);
}



