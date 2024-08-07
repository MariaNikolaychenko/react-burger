import { getCookie } from "./cookie";
import { TLogin, TRegister, TResetPassword } from "./types";

export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const WS_URL = "wss://norma.nomoreparties.space/orders";
export const WS_URL_ALL = `${WS_URL}/all`;

// Функция проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

// Функция проверки на `success`
const checkSuccess = <T>(res: any): Promise<T> => {
	if (res && res.success) {
		return res;
	}
	return Promise.reject(`Ответ не success: ${res}`);
};

// Универсальная фукнция запроса с проверкой ответа и `success`
const request = (endpoint: string, options?: RequestInit) => {
	return fetch(`${BASE_URL}${endpoint}`, options)
		.then(checkResponse)
		.then(checkSuccess)
};

// Получить все ингредиенты
export const getIngredientsApi = () => request("ingredients");

// Создать ордер
export const createOrderApi = (data: Array<string>) => {
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
// Получить ордер по номеру заказа
export const getOrderByNumberApi = (number: string) => {
	return request(`orders/${number}`);
}

// Регистрация
export const registerApi = async (data: TRegister)  => {
	return await request("auth/register", {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data })
	});
};

// Логин
export const loginApi = async (data: TLogin) => {
	return await request("auth/login", {
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
export const forgotPasswordApi = (data: string) => {
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
export const resetPasswordApi = (data: TResetPassword) => {
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
export const updateUserDataApi = async (user: TRegister) => {
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