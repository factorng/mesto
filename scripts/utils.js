function escKeyDown(evt) {
  const opened = document.querySelector('.popup_open');
  if ((evt.key === 'Escape') && opened) {
    popupClose(opened);
  }
}

function popupOverlayClick(evt) {
  const opened = document.querySelector('.popup_open');
  if (evt.target.classList.contains('popup_open') && opened) {
    popupClose(opened);
  }
}

export function popupOpen(elem) {
  elem.classList.add('popup_open');
  document.addEventListener('keydown', escKeyDown);
  document.addEventListener('click', popupOverlayClick);
}

export function popupClose(elem) {
  elem.classList.remove('popup_open');
  document.removeEventListener('keydown', escKeyDown);
  document.removeEventListener('click', popupOverlayClick);
}

