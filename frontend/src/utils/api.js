class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._authorization = headers.authorization;
  }

  #onResponce(res) {
    return res.ok
      ? res.json()
      : res.json().then((errData) => Promise.reject(errData));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  setUserInfo(newUserData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newUserData),
    }).then(this.#onResponce);
  }


  getCards() {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers,
      method: "GET",
    }).then(this.#onResponce);
  }

  getCardById(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      headers: this._headers,
      method: "GET",
    }).then(this.#onResponce);
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: `${id}`,
      }),
    }).then(this.#onResponce);
  }

  deleteCardID(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this.#onResponce);
  }

  addCard(data) {
    return fetch(`${this._url}/cards/`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }
  addLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then(this.#onResponce);
  }

  deleteLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this.#onResponce);
  }

  setInfoAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this.#onResponce);
  }
}

const api = new Api({
  url: "https://api.decaid.nomoredomainsmonster.ru",
  headers: {
    authorization: "5ffe31aa-ca2a-431b-894e-0704b9f5eaf4",
    "content-Type": "application/json",
  },
});
export default api;