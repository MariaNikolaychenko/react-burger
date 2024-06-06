import {
	SET_CURRENT_INGREDIENT,
	DELETE_CURRENT_INGREDIENT
  } from '../ingredient/actions'


const initialState = {
	currentIngredient: null
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT: {
			return {
				...state,
				currentIngredient: action.data,
			};
		}
		case DELETE_CURRENT_INGREDIENT: {	
			return {
				...state,
				currentIngredient: null
			};
		}
		default: {
			return state;
		}
	}
};