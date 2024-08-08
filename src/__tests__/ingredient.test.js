import { reducer } from "../services/ingredient/reducer";
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../services/constants";

const initialState = {
	currentIngredient: null
}

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

describe('ingredient reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	});

	it('should handle SET_CURRENT_INGREDIENT', () => {
		expect(
			reducer(initialState, {
				type: SET_CURRENT_INGREDIENT,
				data: ingredientTest
			})
		).toEqual(
			{
				...initialState,
				currentIngredient: ingredientTest
			}
		);
	});

	it('should handle DELETE_CURRENT_INGREDIENT', () => {
		expect(
			reducer(initialState, {
				type: DELETE_CURRENT_INGREDIENT
			})
		).toEqual(
			{
				...initialState,
				currentIngredient: null
			}
		);
	});
});