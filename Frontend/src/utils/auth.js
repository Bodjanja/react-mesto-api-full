export const BASE_URL = 'https://backend.bodjanja.nomoredomains.monster'

function checkResponse(response){
    if (response.ok) {
      return response.json()
    }
    else{return Promise.reject(`Ошибка: ${response.status}`)}
  }

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            password,
            email
        })
    })
    .then((response) => checkResponse(response))
}

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        })
        .then((response) => checkResponse(response))
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
        .then((response) => checkResponse(response))
}