window.onload = function(e) {
  //я конечно могу убрать эту функцию и подключить скрипт внизу страницы,
  //но я не понимаю, почему мое решение не верно
  //эта функция вызывается после полной загрузки DOM и соответсвенно
  //мы защищены от обращения к еще не существующим элементам
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
      //а почему нужно классом управлять? чем мое решение хуже?
    } else {
      form.style.visibility = 'visible';
      overlay.style.visibility = 'visible';
    }
  }
  edit_btn.addEventListener('click', toggleForm);
  close_btn.addEventListener('click', function(){
    profile_name.textContent = 'Джим Моррисон';
    profile_occupation.textContent = 'певец';
    input_name.value = 'Джим Моррисон';
    input_occupation.value = 'певец';
    toggleForm();
    // такой ресет формы Вы имели ввиду?
    // или нужно, чтоб значения по-умолчанию подставлялись?
    // вместо имени - "введите имя"
    // вместо рода занятий - "род занятий"

  });
}



