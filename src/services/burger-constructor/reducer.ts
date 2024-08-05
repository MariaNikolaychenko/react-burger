import { 
	ADD_INGREDIENT, 
	ADD_INGREDIENT_BUN,
	DELETE_INGREDIENT,
	SORT_INGREDIENTS,
	CLEAR_CONSTRUCTOR
} from '../constants';

import { TBurgerConstructorActions, TBurgerConstructorState } from './types';

const initialState: TBurgerConstructorState = {
	bun: null,
	fillings: []
};

export const reducer = ( state: TBurgerConstructorState = initialState, action: TBurgerConstructorActions) => {
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
				fillings: [...state.fillings.filter((i: { uuid: string; }) => i.uuid !== action.id)]
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