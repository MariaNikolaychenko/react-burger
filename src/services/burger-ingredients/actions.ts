import { getIngredientsApi } from "../../utils/api";
import { INGREDIENTS_ERROR, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOADING } from "../constants";
import { AppDispatch } from "../types";


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