import { 
	ADD_INGREDIENT, 
	ADD_INGREDIENT_BUN,
	DELETE_INGREDIENT,
	SORT_INGREDIENTS
} from './actions';

import {
	CLEAR_CONSTRUCTOR
} from '../order/actions'

const initialState = {
	bun: null,
	fillings: []
};

export const reducer = ( state = initialState, action) => {
	switch (action.type) {
		case ADD_INGREDIENT:
			return {
				...state,
				fillings: [
					...state.fillings,
					{
						...action.data
					}
				]
			}
		case ADD_INGREDIENT_BUN: {
			return {
				...state,
				bun: action.data,
			}
		}

		case DELETE_INGREDIENT: {
			return {
				...state,
				fillings: [...state.fillings.filter((i) => i.uuid !== action.id)]
			}
		}
		
		case SORT_INGREDIENTS: {
			const fillings = [...state.fillings];
			fillings.splice(action.dragIndex, 0, fillings.splice(action.hoverIndex, 1)[0]);
			
			return {
			  ...state,
			  fillings: fillings
			}
		}
		case CLEAR_CONSTRUCTOR: {
			return {
				bun: null,
				fillings: []
			}
		}

		default:
			return state;
	}
}