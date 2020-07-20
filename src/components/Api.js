export class Api {
  constructor(settings) {
    this.baseUrl = settings.url;
    this.auth = settings.auth;
  }
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this.auth
        }
      })
      .then(result => {
        if(result.ok) {
          return result.json();
        }
        return Promise.reject(`error${result.status}`);
      });
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.auth
      }
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`error${result.status}`);
    });
  }
  updateUserProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`error${result.status}`);
    });
  }
  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`error${result.status}`);
    });
  }
  setUserAvatar(newAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`error${result.status}`);
    });
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.auth
      }
    })
    .then(result => {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(`error${result.status}`);
    });
  }
  putLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this.auth
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    })
    .then((data) => data);
  }
  removeLike(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.auth
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    })
    .then((data) => data);
  }
}
