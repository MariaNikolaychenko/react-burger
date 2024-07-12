import { getIngredientsApi } from "../../utils/api";
import { AppDispatch } from "../store";

export const INGREDIENTS_LOADING = 'INGREDIENTS_LOADING';
export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';


export const loadIngredients = () => (dispatch: AppDispatch) => {
    dispatch({ type: INGREDIENTS_LOADING });

    return getIngredientsApi()
        .then(res => {
            dispatch({
                type: INGREDIENTS_LOAD_SUCCESS,
                // @ts-ignore
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: err.message,
            })
        })
}