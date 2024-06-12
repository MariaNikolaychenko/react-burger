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
		.catch(console.error)
};

// Получить все ингредиенты
export const getIngredientsApi = () => request("ingredients");

// Создать ордер
export const createOrderApi = (data) => {
	return request("orders",  {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"ingredients": data
		})
	});
}