export const BASE_URL = 'http://localhost:5000';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(checkResponse);
};
   
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload();
                return data;
            }
        });
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            // authorization: '52fa0298-6d41-4d85-b650-c0ec7f2f1b2d',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    }).then(checkResponse);
};
