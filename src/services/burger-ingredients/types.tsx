import { TIngredient } from "../../utils/types";
import { INGREDIENTS_ERROR, INGREDIENTS_LOAD_SUCCESS, INGREDIENTS_LOADING } from "./actions";


export type TIngredientState = {
	ingredients: TIngredient[],
	loading: boolean,
    error: string | null
}

export interface IIngredientsLoadingAction {
	type: typeof INGREDIENTS_LOADING;
};

export interface IIngredientsLoadSuccessAction {
	type: typeof INGREDIENTS_LOAD_SUCCESS;
	payload: TIngredient[];
};

export interface IIngredientsErrorAction {
	type: typeof INGREDIENTS_ERROR;
	payload: string;
};

export type TIngredientsAction = 
	IIngredientsLoadingAction |
	IIngredientsLoadSuccessAction |
	IIngredientsErrorAction
