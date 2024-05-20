class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.firstname,
                about: data.job,
            }),
        }).then(this._checkResponse);
    }

    setAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link,
            }),
        }).then(this._checkResponse);
    }

    putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }
}

const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
    baseUrl: 'http://92.51.44.25:3001',

    headers: {
        // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
});

export default api;
