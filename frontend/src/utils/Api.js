import { apiOptions } from "./options.js";

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers

  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._getResponseData)
  }
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._getResponseData)
  }
  editProfile(name, hobby) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: hobby
      })
    })
      .then(this._getResponseData)
  }
  createCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link
      }),
    })
      .then(this._getResponseData)
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers
    })
      .then(this._getResponseData)
  }


  changeAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.avatar
      }),
    })
      .then(this._getResponseData)
  }
}

export const api = new Api(apiOptions);