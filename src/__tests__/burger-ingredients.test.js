import { initialState, reducer } from "../services/burger-ingredients/reducer";
import { INGREDIENTS_ERROR, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOADING } from "../services/constants";

const ingredientTest = {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0,
	"uuid": "12345"
};

describe('burger-ingredients reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	});

	it('should handle INGREDIENTS_LOADING', () => {
		expect(
			reducer(initialState, {
				type: INGREDIENTS_LOADING
			})
		).toEqual(
			{
				...initialState,
				loading: true,
				error: null
			}
		);
	});

	it('should handle INGREDIENTS_ERROR', () => {
		expect(
			reducer(initialState, {
				type: INGREDIENTS_ERROR,
				payload: 'error'
			})
		).toEqual(
			{
				...initialState,
				loading: false,
				error: 'error'
			}
		);
	});

	it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
		expect(
			reducer(initialState, {
				type: INGREDIENTS_LOAD_SUCCESS,
				payload: ingredientTest
			})
		).toEqual(
			{
				...initialState,
				loading: false,
				ingredients: ingredientTest
			}
		);
	});
});