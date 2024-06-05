const apiConfig = {
	baseUrl: "https://norma.nomoreparties.space/api",
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
};

const handleResponse = (res) => {
	if (res.ok) {
		return res.json();
	}

	return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredientsApi = () => {
	return fetch(`${apiConfig.baseUrl}/ingredients`, {
		headers: apiConfig.headers,
	}).then((res) => handleResponse(res));
};

export const createOrderApi = (data) => {
	return fetch(`${apiConfig.baseUrl}/orders`, {
		method: 'POST',
		headers: apiConfig.headers,
		body: JSON.stringify({
		  "ingredients": data
		})
	  }).then((res) => handleResponse(res));
};