import {
	SET_CURRENT_INGREDIENT,
	DELETE_CURRENT_INGREDIENT
  } from '../constants'
import { TCurrentIngredientActions, TCurrentIngredientState } from './types';


const initialState = {
	currentIngredient: null
};

export const reducer = (state: TCurrentIngredientState = initialState, action: TCurrentIngredientActions) => {
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