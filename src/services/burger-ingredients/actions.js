import { getIngredientsApi } from "../../utils/api";

export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';


export const loadIngredients = () => (dispatch) => {
    dispatch({ type: INGREDIENTS_LOADING });

    return getIngredientsApi()
        .then(res => {
            dispatch({
                type: INGREDIENTS_LOAD_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: err.message,
            })
        })
}