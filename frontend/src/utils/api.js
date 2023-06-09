export default class Api {
	constructor(data) {
		this._baseUrl = data.baseUrl
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	setUserInfo(data) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: data.name,
				about: data.description,
			}),
		}).then(this._checkResponse)
	}

	addCard(card) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: card.title,
				link: card.link,
			}),
		}).then(this._checkResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	setLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	deleteLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	setAvatar(link) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				avatar: link.avatar,
			}),
		}).then(this._checkResponse)
	}

	getInitialsCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		}).then(this._checkResponse)
	}

	changeLikeCardStatus(cardId, isLiked) {
		return isLiked ? this.deleteLike(cardId) : this.setLike(cardId)
	}
}

export const api = new Api({
	baseUrl: 'https://api.mesto-suhachov.nomoredomains.rocks',
})
