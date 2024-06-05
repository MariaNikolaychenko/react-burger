import {
	INGREDIENTS_LOADING, 
	INGREDIENTS_LOAD_SUCCESS, 
	INGREDIENTS_ERROR 
} from "./actions"

const initialState = {
	ingredients: [],
	loading: false,
    error: null
}

export const reducer = ( state = initialState, action) => {
	switch (action.type) {
		case INGREDIENTS_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			}
		case INGREDIENTS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case INGREDIENTS_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				ingredients: action.payload,
			}
		default:
			return state;
	}
}