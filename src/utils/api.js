import { getCookie } from "./cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api/";

// Функция проверки ответа на `ok`
const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

// Функция проверки на `success`
const checkSuccess = (res) => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

// Универсальная фукнция запроса с проверкой ответа и `success`
const request = (endpoint, options) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess)
};

// Получить все ингредиенты
export const getIngredientsApi = () => request("ingredients");

// Создать ордер
export const createOrderApi = (data) => {
	return request("orders",  {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + getCookie('token')
		},
		body: JSON.stringify({
			"ingredients": data
		})
	});
}

// Регистрация
export const registerApi = async data  => {
	return await request("auth/register", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data })
	});
};

// Логин
export const loginApi = data => {
	return request("auth/login", {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
};

// Выход
export const logoutApi = () => {
	return request("auth/logout", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"token": localStorage.getItem('refreshToken')
		})
	});
};

// Обновление токена
export const refreshTokenApi = () => {
	return request("auth/token", {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"token": localStorage.getItem('refreshToken')
		})
	})
}

// Восстановить пароль
export const forgotPasswordApi = (data) => {
	return request("password-reset",  {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"email": data
		})
	});
};

// Восстановить пароль: отправка кода
export const resetPasswordApi = (data) => {
	return request("password-reset/reset",  {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"password": data.password,
			"token": data.token,
		})
	});
};

// Получить данные о пользователе
export const getUserDataApi = () => {
	return request("auth/user", {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			Authorization: "Bearer " + getCookie('token')
		}
	});
};

// Обновить данные о пользователе
export const updateUserDataApi = async user => {
	return await request("auth/user", {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json',
			Authorization: "Bearer " + getCookie('token')
		},
		body: JSON.stringify({
			"name": user.name,
			"email": user.email,
			"password": user.password,
		})
	})
};