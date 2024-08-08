import { reducer } from "../services/burger-constructor/reducer";
import { ADD_INGREDIENT, ADD_INGREDIENT_BUN, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, SORT_INGREDIENTS } from "../services/constants";

const initialState = {
	bun: null,
	fillings: []
};

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

describe('burger-constructor reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			initialState
		)
	});

	it('should handle ADD_INGREDIENT', () => {
		expect(
			reducer(initialState, {
				type: ADD_INGREDIENT,
				data: ingredientTest
			})
		).toEqual(
			{
				...initialState,
				fillings: [
					...initialState.fillings,
					{
						...ingredientTest
					}
				]
			}
		);
	});

	it('should handle ADD_INGREDIENT_BUN', () => {
		expect(
			reducer(initialState, {
				type: ADD_INGREDIENT_BUN,
				data: ingredientTest
			})
		).toEqual(
			{
				...initialState,
				bun: ingredientTest
			}
		);
	});

	it('should handle DELETE_INGREDIENT', () => {
		expect(
			reducer({...initialState, fillings: [ingredientTest]}, {
				type: DELETE_INGREDIENT,
				id: '12345'
			})
		).toEqual(
			{
				...initialState,
				fillings: [
					...initialState.fillings.filter(
						(i) => i.uuid !== '12345'
				)]
			}
		);
	});

	it('should handle SORT_INGREDIENT', () => {
		const ingredientTest2 = { ...ingredientTest, _id: "60666c42cc7b410027a1a000" };
		expect(
			reducer({...initialState, fillings: [ingredientTest, ingredientTest2]}, {
				type: SORT_INGREDIENTS,
				dragIndex: 0,
				hoverIndex: 1
			})
		).toEqual(
			{
				...initialState,
				fillings: [
					ingredientTest2,
					ingredientTest
				]
			}
		);
	});

	it('should handle CLEAR_CONSTRUCTOR', () => {
		expect(
			reducer(initialState, { 
				type: CLEAR_CONSTRUCTOR
			})
		).toEqual(
			initialState
		)
	})
});