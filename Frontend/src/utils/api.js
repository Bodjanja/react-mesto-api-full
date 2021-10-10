class Api {
    constructor(data) {
      this._baseUrl = data.baseUrl
      this._token = data.token
    }
  
    _checkResponse(res){
      if (res.ok) {
        return res.json()
      }
      else{return Promise.reject(`Ошибка: ${res.status}`)}
    }
  
    getInitialCards() {//Получить все начальные карточки с сервера для вставки их в разметку
      return fetch(`${this._baseUrl}/cards`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(this._checkResponse)
    }
  
    getUserData() {//Получить информацию о профиле с сервера для вставки в разметку
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(this._checkResponse)
    }
  
    editProfileData(userName, userDescription) {//Отправить отредактированные данные профиля на сервер
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            name: userName,
            about: userDescription
          })
        })
        .then(this._checkResponse)
    }
  
    updateProfileAvatar(updateAvatar) {//Отправить отредактированный URL аватара на сервер
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            avatar: updateAvatar
          })
        })
        .then(this._checkResponse)
    }
  
    postNewCard(cardName, cardLink) {//Отправить на сервер новую карточку и добавить её в разметку
      return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
        })
        .then(this._checkResponse)
    }
  
    removeCard(_id){//Удаление карточки на сервере
      return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(this._checkResponse)
    }
  
    changeLikeCardStatus(_id, isLiked) {
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
              method: `${isLiked ? 'PUT' : 'DELETE'}`,
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
          })
      .then(this._checkResponse)
    }
  
  }
  
  const api = new Api({
    baseUrl: 'https://backend.bodjanja.nomoredomains.monster'
    }
  );

  export default api;